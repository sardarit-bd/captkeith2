<?php

namespace App\Http\Controllers;


use App\Models\CharterEvent;
use App\Models\ChartererProfile;

use App\Models\OwnerProfile;
use App\Models\OwnerCaptainInvitation;
use App\Models\Vessel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\CharterCrewResponse;
use App\Services\AgreementPdfService;
use App\Notifications\AgreementSignedNotification;
use App\Models\CaptainProfile;
use Illuminate\Support\Facades\Storage;
use App\Notifications\CrewRequestNotification;
use Symfony\Component\HttpFoundation\StreamedResponse;
// use App\Notifications\PaymentCompleteNotification;
class CharterController extends Controller
{
    public function index(): Response
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->first();

        if (! $owner) {
            return Inertia::render('charterers', [
                'vessels'  => [],
                'drafts'   => [],
                'bookings' => [],
            ]);
        }

        $vessels = Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->where('is_active', true)
            ->with(['charterEvents.hireAgreements'])
            ->orderBy('name')
            ->get()
            ->map(function (Vessel $v) {
                $agreements = $v->charterEvents->flatMap(function ($event) {
                    return $event->hireAgreements
                        ->where('agreement_type', 'bareboat')
                        ->map(function ($agreement) {
                            return [
                                'id' => $agreement->id,
                                'type' => 'Owner-Charterer Agreement',
                                'signedAt' => $agreement->fully_signed_at?->format('M d, Y') ?? 'Pending',
                            ];
                        });
                })->values();

                return [
                    'value' => $v->id,
                    'label' => $v->name,
                    'id' => $v->id,
                    'name' => $v->name,
                    'registrationNo' => $v->official_number ?? '—',
                    'image' => $v->photos->first() ? Storage::url($v->photos->first()->image_path) : null,
                    'agreements' => $agreements,

                ];
            });
        $vesselIds = Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->pluck('id');

        // Dynamically update past charters to 'completed'
        CharterEvent::updatePastEventsToCompleted($vesselIds);

        $drafts = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->whereNull('deleted_at')
            ->where('status', 'draft')
            ->with('vessel.photos')
            ->latest('charter_date')
            ->get()
            ->map(fn(CharterEvent $event) => [
                'id'            => $event->id,
                'yachtName'     => $event->vessel->name,
                'vesselId'      => $event->vessel_id,
                'yachtType'     => ucfirst($event->vessel->vessel_type ?? ''),
                'yachtLength'   => $event->vessel->length_ft ? $event->vessel->length_ft . ' ft' : '—',
                'date'          => $event->charter_date?->format('M d, Y') ?? '—',
                'startTime'     => $event->start_time ?? '—',
                'duration'      => $event->duration_minutes ? round($event->duration_minutes / 60, 1) . ' hrs' : '—',
                'yachtImage'    => $event->vessel->photos->first()
                    ? Storage::url($event->vessel->photos->first()->image_path)
                    : null,
                'inviteLink'    => $event->invite_token
                    ? url('/charterer/join/' . $event->invite_token)
                    : null,
                'inviteExpires' => $event->invite_token_expires_at?->format('M d, Y') ?? null,
                'specialNotes'  => $event->special_notes,
            ]);

        $bookings = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['draft', 'cancelled'])
            ->with(['vessel.photos', 'charterer.user', 'hireAgreements', 'crewResponses.captainProfile', 'crewResponses.deckhandProfile'])
            ->latest('charter_date')
            ->get()
            ->map(fn(CharterEvent $event) => [
                'id'              => $event->id,
                'yachtName'       => $event->vessel->name,
                'yachtType'       => ucfirst($event->vessel->vessel_type ?? ''),
                'yachtLength'     => $event->vessel->length_ft ? $event->vessel->length_ft . ' ft' : '—',
                'date'            => $event->charter_date?->format('M d, Y') ?? '—',
                'startTime'       => $event->start_time ?? '—',
                'duration'        => $event->duration_minutes ? round($event->duration_minutes / 60, 1) . ' hrs' : '—',
                'yachtImage'      => $event->vessel->photos->first()
                    ? Storage::url($event->vessel->photos->first()->image_path)
                    : null,
                'chartererName'   => $event->charterer?->user?->name ?? 'Pending',
                'chartererAvatar' => null,
                'status'          => ucfirst($event->status ?? 'Booked'),
                'bareboatAgreementId' => $event->hireAgreements->where('agreement_type', 'bareboat')->first()?->id,
                'inviteLink'      => $event->invite_token ? url('/charterer/join/' . $event->invite_token) : null,
                'completionRequestedAt' => $event->completion_requested_at?->toIso8601String(),
                'captains'        => $event->crewResponses->where('crew_role', 'captain')->where('response', 'available')->map(fn($r) => [
                    'name' => $r->captainProfile?->full_name ?? 'Pending',
                    'avatar' => $r->captainProfile?->photo_path ? Storage::url($r->captainProfile?->photo_path) : null,
                ])->values(),
                'deckhand'        => $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first() ? [
                    'name' => $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first()->deckhandProfile?->full_name ?? 'Pending',
                    'avatar' => $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first()->deckhandProfile?->photo_path ? Storage::url($event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first()->deckhandProfile?->photo_path) : null,
                ] : null,
            ]);

        return Inertia::render('charterers', [
            'vessels'  => $vessels,
            'drafts'   => $drafts,
            'bookings' => $bookings,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $validated = $request->validate([
            'vessel_id'      => ['required', 'uuid', 'exists:vessels,id'],
            'charter_date'   => ['required', 'date', 'after_or_equal:today'],
            'start_time'     => ['required', 'string'],
            'duration_hours' => ['required', 'integer', 'min:1'],
            'special_notes'  => ['nullable', 'string', 'max:2000'],
            'rental_cost'    => ['nullable', 'numeric', 'min:0'],
        ]);

        $vessel = Vessel::where('id', $validated['vessel_id'])
            ->where('owner_id', $owner->id)
            ->firstOrFail();

        CharterEvent::create([
            'vessel_id'               => $vessel->id,
            'charter_date'            => $validated['charter_date'],
            'start_time'              => $validated['start_time'],
            'duration_minutes'        => (int) $validated['duration_hours'] * 60,
            'special_notes'           => $validated['special_notes'] ?? null,
            'rental_cost'             => $validated['rental_cost'] ?? null,
            'status'                  => 'draft',
            'invite_token'            => Str::random(32),
            'invite_token_expires_at' => now()->addDays(7),
        ]);

        return redirect()
            ->route('charterers')
            ->with('success', 'Charter created successfully.');
    }
    public function join(string $token): RedirectResponse
    {
        $event = CharterEvent::where('invite_token', $token)
            ->whereNull('deleted_at')
            ->where('invite_token_expires_at', '>', now())
            ->first();

        if (! $event) {
            abort(404, 'This invite link is invalid, expired, or has been deleted.');
        }

        $charterer = ChartererProfile::where('user_id', auth()->id())->first();

        if (! $charterer) {
            return redirect()->route('dashboard')
                ->with('error', 'Please complete your charterer profile first.');
        }

        if (is_null($event->charterer_id)) {
            $event->update(['charterer_id' => $charterer->id]);
        } elseif ($event->charterer_id !== $charterer->id) {
            return redirect()->route('dashboard')
                ->with('error', 'This invite link has already been used.');
        }

        return redirect()->route('charterer.request', ['id' => $event->id]);
    }


    public function request($id): Response
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->first();

        if (! $charterer) {
            abort(404, 'Charter request not found.');
        }

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled', 'deleted'])
            ->with(['vessel.photos'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            abort(404, 'This charter link has been deleted or is no longer available.');
        }

        $vessel = $event->vessel;

        if (! $vessel) {
            abort(404, 'The yacht associated with this booking is no longer available.');
        }

        $photo  = $vessel->photos->first();
        $marina = implode(', ', array_filter([
            $vessel->marina_name,
            $vessel->marina_city,
            $vessel->marina_state,
        ]));

        return Inertia::render('charterer/request', [
            'charterEvent' => [
                'id'    => $event->id,
                'yacht' => [
                    'name'               => $vessel->name,
                    'registrationNumber' => $vessel->official_number,
                    'type'               => ucfirst($vessel->vessel_type ?? ''),
                    'length'             => $vessel->length_ft ? $vessel->length_ft . ' ft' : '—',
                    'marina'             => $marina ?: '—',
                    'operatingArea'      => $vessel->operating_area ?? '—',
                    'image'              => $photo ? Storage::url($photo->image_path) : null,
                ],
                'date'                  => $event->charter_date?->format('M d, Y') ?? '—',
                'time'                  => $event->start_time ?? '—',
                'duration'              => $event->duration_minutes
                    ? round($event->duration_minutes / 60, 1) . ' hrs'
                    : '—',
                'specialNotes'          => $event->special_notes ?? '',
                'availableCaptainCount' => OwnerCaptainInvitation::where('vessel_id', $vessel->id)
                    ->where('status', 'accepted')
                    ->count(),
            ],
        ]);
    }

    public function captainSelect(): Response|RedirectResponse
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->first();

        if (! $charterer) {
            return redirect()->route('dashboard')
                ->with('error', 'Please complete your charterer profile first.');
        }

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->with(['vessel'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')
                ->with('error', 'No active charter booking found. Please use your invite link.');
        }


        $interests = OwnerCaptainInvitation::where('vessel_id', $event->vessel_id)
            ->where('status', 'accepted')
            ->with(['captain.user'])
            ->get();

        $captains = $interests->map(function (OwnerCaptainInvitation $interest) use ($event) {
            $profile = $interest->captain;
            $user    = $profile?->user;
            $response = CharterCrewResponse::where('charter_event_id', $event->id)
                ->where('profile_id', $profile?->id)
                ->where('crew_role', 'captain')
                ->first();

            $licenseLabel = match ($profile?->license_type) {
                'oupv'    => 'OUPV (Six-Pack)',
                'masters' => 'Master License',
                default   => $profile?->license_type ?? '—',
            };

            $location = implode(', ', array_filter([
                $profile?->city,
                $profile?->state,
            ]));

            $endorsements = is_array($profile?->endorsement)
                ? $profile->endorsement
                : (json_decode($profile?->endorsement ?? '[]', true) ?? []);

            return [
                'id'                 => $profile?->id ?? $interest->id,
                'name'               => $profile?->full_name ?? $user?->email ?? '—',
                'photo'              => $profile?->photo_path
                    ? Storage::url($profile->photo_path)
                    : null,
                'location'           => $location ?: '—',
                'license'            => $licenseLabel,
                'tonnage'            => $profile?->tonnage_rating
                    ? $profile->tonnage_rating . 'T'
                    : '—',
                'experience'         => $profile?->years_experience
                    ? $profile->years_experience . ' years experience'
                    : '—',
                'rate'               => $profile?->hourly_rate
                    ? '$' . number_format($profile->hourly_rate, 0) . '/hr'
                    : '—',
                'bio'                => $profile?->bio ?? '',
                'endorsements'       => $endorsements,
                'geographicArea'     => $profile?->geographic_area ?? null,
                'bodiesOfWater'      => $profile?->bodies_of_water ?? null,
                'canProvidedeckhand' => (bool) ($profile?->can_provide_deckhand ?? false),
                'isVerified'         => (bool) ($profile?->is_verified ?? false),
                'requestStatus' => $response?->response ?? null,
                'responseId'    => $response?->id ?? null,
            ];
        })->values();

        $acceptedCount = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'captain')
            ->where('response', 'available')
            ->count();
        return Inertia::render('charterer/captain-select', [
            'charterEventId' => $event->id,
            'captains'       => $captains,
            'acceptedCount'  => $acceptedCount,
            'slotsNeeded'    => max(0, 2 - $acceptedCount),
        ]);
    }


    public function destroy(CharterEvent $charterEvent): RedirectResponse
    {
        $owner = OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $vessel = Vessel::where('id', $charterEvent->vessel_id)
            ->where('owner_id', $owner->id)
            ->firstOrFail();

        abort_if($charterEvent->status !== 'draft', 403, 'Only draft charters can be deleted.');

        // Set status to 'deleted' as requested, then soft delete the record
        $charterEvent->update(['status' => 'deleted']);
        $charterEvent->delete();

        return redirect()
            ->route('charterers')
            ->with('success', 'Draft charter deleted.');
    }

    public function sendCaptainRequests(Request $request): RedirectResponse
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->latest('created_at')
            ->firstOrFail();

        $validated = $request->validate([
            'captain_ids'   => ['required', 'array', 'min:1'],
            'captain_ids.*' => ['required', 'uuid', 'exists:captain_profiles,id'],
        ]);

        $acceptedCount = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'captain')
            ->where('response', 'available')
            ->count();

        $slotsNeeded = max(0, 2 - $acceptedCount);

        if ($slotsNeeded === 0) {
            return back()->with('error', 'You already have 2 captains accepted. You can proceed.');
        }

        $captainIds = array_slice($validated['captain_ids'], 0, $slotsNeeded);

        // Fetch requester and vessel once to avoid N+1 queries inside the loop
        $requesterUser = auth()->user();
        $vessel = $event->vessel;

        foreach ($captainIds as $captainId) {
            // Fetch the captain profile and their associated user
            $captainProfile = CaptainProfile::find($captainId);
            if (!$captainProfile || !$captainProfile->user) {
                continue;
            }

            $existing = CharterCrewResponse::where('charter_event_id', $event->id)
                ->where('profile_id', $captainId)
                ->where('crew_role', 'captain')
                ->first();

            $shouldNotify = false;

            if ($existing) {
                if (
                    $existing->response === 'unavailable' ||
                    ($existing->expires_at && $existing->expires_at->isPast())
                ) {
                    $existing->update([
                        'response'     => 'pending',
                        'responded_at' => null,
                        'expires_at'   => now()->addHours(24),
                    ]);
                    $shouldNotify = true; // Notify if re-sending an expired/declined request
                }
            } else {
                CharterCrewResponse::create([
                    'charter_event_id' => $event->id,
                    'profile_id'       => $captainId,
                    'crew_role'        => 'captain',
                    'response'         => 'pending',
                    'expires_at'       => now()->addHours(24),
                ]);
                $shouldNotify = true; // Notify on a brand new request
            }

            // Dispatch the notification to the captain's user model
            if ($shouldNotify) {
                $captainProfile->user->notify(new CrewRequestNotification($requesterUser, $vessel, 'captain'));
            }
        }

        if ($event->status === 'draft') {
            $event->update(['status' => 'awaiting_responses']);
        }

        return redirect()->route('charterer.captain-request-status')
            ->with('success', 'Captain requests sent successfully.');
    }

    public function captainRequestStatus(): Response
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->with(['vessel'])
            ->latest('created_at')
            ->firstOrFail();


        CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'captain')
            ->where('response', 'pending')
            ->whereNotNull('expires_at')
            ->where('expires_at', '<', now())
            ->update(['response' => 'unavailable']);


        $captainResponses = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'captain')
            ->with(['captainProfile.user'])
            ->latest()
            ->get();

        $acceptedCaptainCount = $captainResponses->where('response', 'available')->count();

        $captainStatuses = $captainResponses->map(function (CharterCrewResponse $r) {
            $profile = $r->captainProfile;
            return [
                'responseId'  => $r->id,
                'captainId'   => $profile?->id,
                'name'        => $profile?->full_name ?? '—',
                'photo'       => $profile?->photo_path ? Storage::url($profile->photo_path) : null,
                'status'      => $r->response,
                'expiresAt'   => $r->expires_at?->toIso8601String(),
                'respondedAt' => $r->responded_at?->format('M d, Y H:i'),
            ];
        })->values();


        $deckhandResponse = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'deckhand')
            ->with(['deckhandProfile', 'selectingCaptain'])
            ->first();

        $deckhandStatus = null;

        if ($deckhandResponse) {
            $dProfile = $deckhandResponse->deckhandProfile;
            $deckhandStatus = [
                'responseId'        => $deckhandResponse->id,
                'deckhandId'        => $dProfile?->id,
                'name'              => $dProfile?->full_name ?? '—',
                'photo'             => $dProfile?->photo_path
                    ? Storage::url($dProfile->photo_path)
                    : null,
                'status'            => $deckhandResponse->response,
                'selectedByCaptain' => $deckhandResponse->selectingCaptain?->full_name ?? '—',
                'respondedAt'       => $deckhandResponse->responded_at?->format('M d, Y H:i'),
            ];
        }


        $deckhandAccepted = $deckhandResponse?->response === 'available';
        $canProceed       = $acceptedCaptainCount >= 2 && $deckhandAccepted;

        return Inertia::render('charterer/captain-request-status', [
            'captainStatuses' => $captainStatuses,
            'acceptedCount'   => $acceptedCaptainCount,
            'canProceed'      => $canProceed,
            'slotsNeeded'     => max(0, 2 - $acceptedCaptainCount),
            'charterEventId'  => $event->id,
            'deckhandStatus'  => $deckhandStatus,
        ]);
    }


    public function cancelCaptainRequest(string $responseId): RedirectResponse
    {
        $charterer = ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->latest('created_at')
            ->firstOrFail();

        $response = CharterCrewResponse::where('id', $responseId)
            ->where('charter_event_id', $event->id)
            ->where('crew_role', 'captain')
            ->firstOrFail();


        abort_if($response->response === 'available', 403, 'Cannot cancel an accepted captain.');

        $response->update([
            'response'   => 'unavailable',
            'expires_at' => null,
        ]);

        return back()->with('success', 'Captain request cancelled.');
    }


    public function information(): Response
    {
        $profile = ChartererProfile::where('user_id', auth()->id())->first();

        return Inertia::render('charterer/information', [
            'profile' => [
                'full_name'     => $profile?->full_name ?? '',
                'phone'         => $profile?->phone ?? '',
                'date_of_birth' => $profile?->date_of_birth
                    ? \Carbon\Carbon::parse($profile->date_of_birth)->format('Y-m-d')
                    : '',
                'country'       => $profile?->country ?? '',
                'address'       => $profile?->address ?? '',
                'city'          => $profile?->city ?? '',
                'state'         => $profile?->state ?? '',
                'zip_code'      => $profile?->zip_code ?? '',
                'photo_path'    => $profile?->photo_path
                    ? Storage::url($profile->photo_path)
                    : null,
            ],
        ]);
    }

    public function saveInformation(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name'      => ['required', 'string', 'max:75'],
            'phone'          => ['required', 'string', 'max:20'],
            'date_of_birth'  => ['nullable', 'date'],
            'country'        => ['nullable', 'string', 'max:100'],
            'address'        => ['required', 'string', 'max:255'],
            'city'           => ['required', 'string', 'max:100'],
            'state'          => ['required', 'string', 'max:50'],
            'zip_code'       => ['required', 'string', 'max:10'],
            'photo'          => ['nullable', 'image', 'max:2048'],
        ]);

        $profile = ChartererProfile::where('user_id', auth()->id())->first();

        $photoPath = $profile?->photo_path;

        if ($request->hasFile('photo')) {
            if ($photoPath) {
                Storage::disk('public')->delete($photoPath);
            }
            $photoPath = $request->file('photo')->store('charterer-photos', 'public');
        }

        // Create or update the charterer profile
        if ($profile) {
            $profile->update([
                'full_name'     => $validated['full_name'],
                'phone'         => $validated['phone'],
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'country'       => $validated['country'] ?? null,
                'address'       => $validated['address'],
                'city'          => $validated['city'],
                'state'         => $validated['state'],
                'zip_code'      => $validated['zip_code'],
                'photo_path'    => $photoPath,
            ]);
        } else {
            $profile = ChartererProfile::create([
                'user_id'       => auth()->id(),
                'full_name'     => $validated['full_name'],
                'phone'         => $validated['phone'],
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'country'       => $validated['country'] ?? null,
                'address'       => $validated['address'],
                'city'          => $validated['city'],
                'state'         => $validated['state'],
                'zip_code'      => $validated['zip_code'],
                'photo_path'    => $photoPath,
            ]);
        }

        $charterer = $profile;

        $event = CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')->with('error', 'No active charter event found.');
        }

        \App\Models\CharterHireAgreement::updateOrCreate(
            [
                'charter_event_id'   => $event->id,
                'charterer_id'       => $charterer->id,
                'captain_profile_id' => null,
                'agreement_type'     => 'bareboat',
                'crew_role'          => 'owner',
            ]
        );

        return redirect()->route('charterer.agreement');
    }

    public function insurance(): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->first();
        if (! $charterer) {
            return redirect()->route('dashboard')->with('error', 'Please complete your charterer profile first.');
        }

        $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')->with('error', 'No active charter event found.');
        }

        $agreements = \App\Models\CharterHireAgreement::where('charter_event_id', $event->id)
            // REMOVED: ->where('charterer_id', $charterer->id) 
            // (Scoping by event ID is enough and prevents filtering out records where this column might be null)
            ->whereNotNull('charterer_signed_at')
            ->with(['captainProfile', 'deckhandProfile', 'ownerProfile'])
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                // FIXED: Use 'crew_role' instead of 'agreement_type'
                'name' => match ($a->crew_role) {
                    'owner' => 'Bareboat Charter Agreement',
                    'captain' => 'Captain ' . ($a->captainProfile?->full_name ?? 'Hire') . ' Agreement',
                    'deckhand' => 'Deckhand ' . ($a->deckhandProfile?->full_name ?? 'Hire') . ' Agreement',
                    default => 'Agreement',
                },
                'downloadUrl' => url("/charterer/agreement/{$a->id}/download"),
            ]);

        return \Inertia\Inertia::render('charterer/insurance', [
            'charterEventId' => $event->id,
            'agreements' => $agreements,
        ]);
    }
    public function checkout(): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->first();

        if (! $charterer) {
            return redirect()->route('dashboard')->with('error', 'Please complete your charterer profile first.');
        }

        $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled', 'confirmed'])
            ->with(['vessel.photos', 'crewResponses.captainProfile', 'crewResponses.deckhandProfile'])
            ->latest('created_at')
            ->first();

        if (! $event) {
            return redirect()->route('dashboard')->with('error', 'No active charter event found.');
        }

        $vessel = $event->vessel;
        $hours  = $event->duration_minutes ? round($event->duration_minutes / 60, 1) : 0;
        $rentalCostPending = is_null($event->rental_cost);
        $rentalCost        = $rentalCostPending ? 0.0 : (float) $event->rental_cost;

        $acceptedCaptains = $event->crewResponses->where('crew_role', 'captain')->where('response', 'available')->take(2)->values();
        $captains = $acceptedCaptains->map(function ($response) use ($hours) {
            $profile = $response->captainProfile;
            $rate    = $profile?->hourly_rate !== null ? (float) $profile->hourly_rate : null;
            $fee     = $rate !== null ? round($rate * $hours, 2) : 0.0;
            return ['id' => $profile?->id, 'name' => $profile?->full_name ?? '—', 'hourlyRate' => $rate, 'hours' => $hours, 'fee' => $fee, 'ratePending' => $rate === null];
        })->values();

        $deckhandResponse = $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first();
        $deckhand = null;
        if ($deckhandResponse) {
            $profile = $deckhandResponse->deckhandProfile;
            $rate    = $profile?->hourly_rate !== null ? (float) $profile->hourly_rate : null;
            $fee     = $rate !== null ? round($rate * $hours, 2) : 0.0;
            $deckhand = ['id' => $profile?->id, 'name' => $profile?->full_name ?? '—', 'hourlyRate' => $rate, 'hours' => $hours, 'fee' => $fee, 'ratePending' => $rate === null];
        }

        $total = round($rentalCost + $captains->sum('fee') + ($deckhand['fee'] ?? 0.0), 2);

        return \Inertia\Inertia::render('charterer/checkout', [
            'charterEventId'    => $event->id,
            'vessel'            => ['name' => $vessel?->name ?? '—', 'image' => $vessel?->photos->first() ? Storage::url($vessel->photos->first()->image_path) : null],
            'hours'             => $hours,
            'rentalCost'        => $rentalCost,
            'rentalCostPending' => $rentalCostPending,
            'captains'          => $captains,
            'deckhand'          => $deckhand,
            'total'             => $total,
            'stripeKey'         => config('services.stripe.key'),
        ]);
    }

    public function processCheckout(Request $request)
    {
        $request->validate(['payment_method_id' => 'required|string']);

        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();
        $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled', 'confirmed'])
            ->with(['crewResponses.captainProfile', 'crewResponses.deckhandProfile'])
            ->latest('created_at')
            ->firstOrFail();

        // 1. Securely calculate total on backend
        $hours = $event->duration_minutes ? round($event->duration_minutes / 60, 1) : 0;
        $rentalCost = (float) ($event->rental_cost ?? 0);

        $acceptedCaptains = $event->crewResponses->where('crew_role', 'captain')->where('response', 'available')->take(2);
        $captainFee = $acceptedCaptains->sum(fn($r) => ($r->captainProfile->hourly_rate ?? 0) * $hours);

        $deckhandResponse = $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first();
        $deckhandFee = $deckhandResponse ? ($deckhandResponse->deckhandProfile->hourly_rate ?? 0) * $hours : 0;

        $total = $rentalCost + $captainFee + $deckhandFee;
        $totalCents = round($total * 100);

        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

        try {
            // 2. Create and confirm PaymentIntent
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $totalCents,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirm' => true,
                'automatic_payment_methods' => ['enabled' => true, 'allow_redirects' => 'never'],
                'metadata' => ['charter_event_id' => $event->id, 'charterer_id' => $charterer->id],
            ]);

            if ($paymentIntent->status === 'succeeded') {
                // 3. Create individual payment records for accurate withdrawal tracking


                if ($rentalCost > 0 && $event->vessel && $event->vessel->owner) {
                    \App\Models\CharterPayment::create([
                        'charter_event_id' => $event->id,
                        'charterer_id' => $charterer->id,
                        'payment_type' => 'crew_hire', // <--- ADDED: Required by Enum
                        'payee_role' => 'owner',       // <--- NOW VALID: Thanks to new migration
                        'amount' => $rentalCost,
                        'currency' => 'usd',
                        'status' => 'paid',            // <--- FIXED: Changed from 'completed' to 'paid'
                        'provider' => 'stripe',
                        'provider_payment_id' => $paymentIntent->id . '_owner',
                        'paid_at' => now(),
                    ]);
                }

                // --- CAPTAIN PAYMENTS ---
                foreach ($acceptedCaptains as $response) {
                    $fee = ($response->captainProfile->hourly_rate ?? 0) * $hours;
                    if ($fee > 0) {
                        \App\Models\CharterPayment::create([
                            'charter_event_id' => $event->id,
                            'charterer_id' => $charterer->id,
                            'payment_type' => 'crew_hire', // <--- ADDED
                            'payee_role' => 'captain',
                            'captain_profile_id' => $response->captainProfile->id,
                            'amount' => $fee,
                            'currency' => 'usd',
                            'status' => 'paid',            // <--- FIXED
                            'provider' => 'stripe',
                            'provider_payment_id' => $paymentIntent->id . '_captain_' . $response->captainProfile->id,
                            'paid_at' => now(),
                        ]);
                    }
                }

                // --- DECKHAND PAYMENT ---
                if ($deckhandResponse && $deckhandFee > 0) {
                    \App\Models\CharterPayment::create([
                        'charter_event_id' => $event->id,
                        'charterer_id' => $charterer->id,
                        'payment_type' => 'crew_hire', // <--- ADDED
                        'payee_role' => 'deckhand',
                        'deckhand_profile_id' => $deckhandResponse->deckhandProfile->id,
                        'amount' => $deckhandFee,
                        'currency' => 'usd',
                        'status' => 'paid',            // <--- FIXED
                        'provider' => 'stripe',
                        'provider_payment_id' => $paymentIntent->id . '_deckhand_' . $deckhandResponse->deckhandProfile->id,
                        'paid_at' => now(),
                    ]);
                }

                $event->update(['status' => 'confirmed']);

                $notification = new \App\Notifications\CharterConfirmedNotification($event);


                $admins = \App\Models\User::role('admin')->get();
                if ($admins->isNotEmpty()) {
                    \Illuminate\Support\Facades\Notification::send($admins, $notification);
                }


                if ($event->vessel && $event->vessel->owner && $event->vessel->owner->user) {
                    $event->vessel->owner->user->notify($notification);
                }


                $assignedCaptains = $event->crewResponses->where('crew_role', 'captain')->where('response', 'available');
                foreach ($assignedCaptains as $response) {
                    if ($response->captainProfile && $response->captainProfile->user) {
                        $response->captainProfile->user->notify($notification);
                    }
                }


                $assignedDeckhand = $event->crewResponses->where('crew_role', 'deckhand')->where('response', 'available')->first();
                if ($assignedDeckhand && $assignedDeckhand->deckhandProfile && $assignedDeckhand->deckhandProfile->user) {
                    $assignedDeckhand->deckhandProfile->user->notify($notification);
                }

                return redirect()->route('charterer.confirmed');
            }

            return back()->withErrors(['payment' => 'Payment requires additional authentication or failed.']);
        } catch (\Exception $e) {
            return back()->withErrors(['payment' => $e->getMessage()]);
        }
    }

    public function agreement(): \Inertia\Response|\Illuminate\Http\RedirectResponse
    {
        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->first();
        if (! $charterer) {
            return redirect()->route('dashboard')
                ->with('error', 'Please complete your charterer profile first.');
        }

        $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
            ->whereNull('deleted_at')
            ->whereNotIn('status', ['completed', 'cancelled'])
            // ->with(['vessel.owner', 'crewResponses.captainProfile.user'])
            ->latest('created_at')
            ->first();
        // dd($event);
        if (! $event) {
            return redirect()->route('dashboard')
                ->with('error', 'No active charter event found.');
        }

        $acceptedCaptains = $event->crewResponses
            ->where('crew_role', 'captain')
            ->where('response', 'available')
            ->take(2)
            ->map(function ($response) {
                $profile = $response->captainProfile;
                return [
                    'profileId'   => $profile?->id,
                    'name'        => $profile?->full_name ?? '—',
                    'licenseNo'   => $profile?->license_number ?? '—',
                    'phone'       => $profile?->phone ?? '—',
                    'rate'        => $profile?->hourly_rate
                        ? '$' . number_format($profile->hourly_rate, 0) . '/hr'
                        : '—',
                ];
            })
            ->values();

        $vessel = $event->vessel;
        $owner  = $vessel?->owner;

        // Fetch all agreements for this event
        // FIX: Removed ->where('charterer_id', $charterer->id) because the event already belongs to the charterer
        $existingAgreements = \App\Models\CharterHireAgreement::where('charter_event_id', $event->id)
            ->get();

        // Log for debugging
        \Illuminate\Support\Facades\Log::info('Agreements fetched for signing page', [
            'event_id' => $event->id,
            'agreements_count' => $existingAgreements->count(),
            'agreements' => $existingAgreements->map(fn($a) => [
                'type' => $a->agreement_type ?? $a->type, // Fallback to 'type' just in case
                'captain_id' => $a->captain_profile_id,
                'signed_at' => $a->charterer_signed_at
            ])->toArray()
        ]);

        // Map agreements to a keyed array for easy lookup
        $agreementMap = [];
        foreach ($existingAgreements as $agreement) {
            // FIX: Check both 'agreement_type' and 'type' in case your database column is named 'type'
            $type = $agreement->agreement_type ?? $agreement->type;

            if ($type === 'bareboat') {
                $agreementMap['bareboat'] = $agreement;
            } elseif ($type === 'captain_hire' && $agreement->captain_profile_id) {
                $agreementMap['captain-' . $agreement->captain_profile_id] = $agreement;
            }
        }
        // dd($existingAgreements);
        return \Inertia\Inertia::render('charterer/agreement', [
            'charterEventId' => $event->id,
            'agreements' => [
                [
                    'id'   => 'bareboat',
                    'type' => 'bareboat',
                    'title' => 'Vessel Charter Agreement',
                    'subtitle' => 'Bareboat/Demise Charter Agreement',
                    'parties' => [
                        'owner'     => $owner?->full_name ?? 'Vessel Owner',
                        'charterer' => $charterer->full_name ?? '—',
                    ],
                    'isSigned' => isset($agreementMap['bareboat']) && !is_null($agreementMap['bareboat']->charterer_signed_at),
                ],
                ...($acceptedCaptains->map(fn($captain) => [
                    'id'        => 'captain_' . $captain['profileId'],
                    'type'      => 'captain_hire',
                    'title'     => 'Captain Hire Agreement',
                    'subtitle'  => 'Independent Captain for Hire Agreement',
                    'captainProfileId' => $captain['profileId'],
                    'parties'   => [
                        'captain'   => $captain['name'],
                        'charterer' => $charterer->full_name ?? '—',
                    ],
                    'isSigned' => isset($agreementMap['captain_' . $captain['profileId']]) && !is_null($agreementMap['captain_' . $captain['profileId']]->charterer_signed_at),
                ]))->toArray(),
            ],


            'vessel' => [
                'name'           => $vessel?->name ?? '—',
                'officialNumber' => $vessel?->official_number ?? '—',
                'charterDate'    => $event->charter_date?->format('M d, Y') ?? '—',
            ],
        ]);
    }

    public function signAgreements(Request $request)
    {
        $request->validate([
            'agreement_id' => 'required|string',
        ]);

        $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();

        $rawId = $request->input('agreement_id');
        $parts = explode('_', $rawId);
        $uuid = end($parts);
        $prefix = count($parts) > 1 ? $parts[0] : null;

        // Determine the crew role based on the prefix
        $role = match ($prefix) {
            'captain' => 'captain',
            'deckhand' => 'deckhand',
            default => 'owner', // handles 'bareboat' or no prefix
        };

        // 1. Try to find the agreement by matching the role and the profile ID
        $agreement = \App\Models\CharterHireAgreement::where('crew_role', $role)
            ->when($role === 'captain', fn($q) => $q->where('captain_profile_id', $uuid))
            ->when($role === 'deckhand', fn($q) => $q->where('deckhand_profile_id', $uuid))
            ->first();

        // 2. If not found by profile ID, maybe the UUID is the actual agreement ID (for bareboat/owner)
        if (!$agreement) {
            $agreement = \App\Models\CharterHireAgreement::find($uuid);
        }

        // 3. If STILL not found, get the charter event and create it
        if (!$agreement) {
            $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
                ->whereNull('deleted_at')
                ->whereNotIn('status', ['completed', 'cancelled'])
                ->latest('created_at')
                ->firstOrFail();

            $agreement = \App\Models\CharterHireAgreement::create([
                'charter_event_id'    => $event->id,
                'charterer_id'        => $charterer->id,
                'crew_role'           => $role,
                'captain_profile_id'  => $role === 'captain' ? $uuid : null,
                'deckhand_profile_id' => $role === 'deckhand' ? $uuid : null,
            ]);
        }

        // Security check: Ensure the agreement belongs to this charterer's event
        if ($agreement->charterEvent->charterer_id !== $charterer->id) {
            abort(403, 'You are not authorized to sign this agreement.');
        }

        $agreement->update([
            'charterer_signed_at' => now(),
        ]);

        // Check if the PDF path is null OR if the file is actually missing from the disk
        $pdfIsMissing = is_null($agreement->pdf_path) || !\Illuminate\Support\Facades\Storage::disk('local')->exists($agreement->pdf_path);

        // Generate and save the PDF if it's missing
        if ($pdfIsMissing) {
            try {
                $pdfService = app(\App\Services\AgreementPdfService::class);
                $pdfPath = $pdfService->generateForAgreement($agreement);

                $agreement->update([
                    'pdf_path' => $pdfPath,
                ]);
            } catch (\Exception $e) {
                \Log::error('PDF Generation Error: ' . $e->getMessage());
                return back()->with('error', 'Agreement signed, but PDF generation failed. Check logs.');
            }
        }

        return redirect()->back()->with('success', 'Agreement signed successfully.');
    }



    public function downloadAgreement(string $agreementId): StreamedResponse
    {
        $user = auth()->user();

        // Find the agreement
        $agreement = \App\Models\CharterHireAgreement::with([
            'charterEvent.vessel.owner.user',
            'charterer.user',
            'captainProfile.user',
        ])->findOrFail($agreementId);

        // Check if the current user is authorized to download this agreement
        $isCharterer = $agreement->charterer && $agreement->charterer->user_id === $user->id;
        $isCaptain = $agreement->captainProfile && $agreement->captainProfile->user_id === $user->id;
        $isOwner = $agreement->charterEvent && $agreement->charterEvent->vessel &&
            $agreement->charterEvent->vessel->owner &&
            $agreement->charterEvent->vessel->owner->user_id === $user->id;

        if (!$isCharterer && !$isCaptain && !$isOwner) {
            abort(403, 'Unauthorized to download this agreement.');
        }

        // Get the PDF path from the agreement
        $path = $agreement->pdf_path;

        if (!$path || !Storage::disk('private')->exists($path)) {
            abort(404, 'Agreement document not found.');
        }

        // Return the file as a download
        return Storage::disk('private')->download($path, basename($path));
    }


    public function requestCompletion(string $id)
    {
        $owner = \App\Models\OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $event = \App\Models\CharterEvent::where('id', $id)
            ->where('status', 'confirmed')
            ->whereHas('vessel', fn($q) => $q->where('owner_id', $owner->id))
            ->firstOrFail();

        if ($event->completion_requested_at) {
            return back()->with('error', 'Completion already requested.');
        }

        $event->update(['completion_requested_at' => now()]);

        // Notify Charterer
        if ($event->charterer && $event->charterer->user) {
            $event->charterer->user->notify(new \App\Notifications\CharterCompletionRequestedNotification($event));
        }

        return back()->with('success', 'Completion request sent to charterer.');
    }
    public function cancelCompletionRequest(string $id): RedirectResponse
    {
        $owner = \App\Models\OwnerProfile::where('user_id', auth()->id())->firstOrFail();

        $event = \App\Models\CharterEvent::where('id', $id)
            ->whereHas('vessel', fn($q) => $q->where('owner_id', $owner->id))
            ->whereNotNull('completion_requested_at')
            ->firstOrFail();

        $event->update(['completion_requested_at' => null]);

        return back()->with('success', 'Completion request cancelled.');
    }
}
