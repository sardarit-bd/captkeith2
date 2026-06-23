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
                ->map(function(Vessel $v) {
                    $agreements = $v->charterEvents->flatMap(function($event) {
                        return $event->hireAgreements
                            ->where('agreement_type', 'bareboat') 
                            ->map(function($agreement) {
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
                ->whereNotIn('status', ['draft', 'completed', 'cancelled'])
                ->with(['vessel.photos', 'charterer.user', 'hireAgreements']) 
                ->latest('charter_date')
                ->get()
                ->map(fn(CharterEvent $event) => [
                    'id'              => $event->id,
                    'yachtName'       => $event->vessel->name,
                    'yachtType'       => ucfirst($event->vessel->vessel_type ?? ''),
                    'yachtLength'     => $event->vessel->length_ft ? $event->vessel->length_ft . ' ft' : '—',
                    'date'            => $event->charter_date?->format('M d, Y') ?? '—',
                    'yachtImage'      => $event->vessel->photos->first()
                        ? Storage::url($event->vessel->photos->first()->image_path)
                        : null,
                    'chartererName'   => $event->charterer?->user?->name ?? 'Pending',
                    'chartererAvatar' => null,
                    'status'          => ucfirst($event->status ?? 'Booked'),
                    'bareboatAgreementId' => $event->hireAgreements->where('agreement_type', 'bareboat')->first()?->id,
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

        $firstName = '';
        $lastName  = '';

        if ($profile?->full_name) {
            $parts     = explode(' ', $profile->full_name, 2);
            $firstName = $parts[0] ?? '';
            $lastName  = $parts[1] ?? '';
        }

        return Inertia::render('charterer/information', [
            'profile' => [
                'first_name' => $firstName,
                'last_name'  => $lastName,
                'phone'      => $profile?->phone ?? '',
                'address'    => $profile?->address ?? '',
                'city'       => $profile?->city ?? '',
                'state'      => $profile?->state ?? '',
                'zip_code'   => $profile?->zip_code ?? '',
                'photo_path' => $profile?->photo_path
                    ? Storage::url($profile->photo_path)
                    : null,
            ],
        ]);
    }

    public function saveInformation(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:75'],
            // 'last_name'  => ['required', 'string', 'max:75'],
            'phone'      => ['required', 'string', 'max:20'],
            'address'    => ['required', 'string', 'max:255'],
            'city'       => ['required', 'string', 'max:100'],
            'state'      => ['required', 'string', 'max:50'],
            'zip_code'   => ['required', 'string', 'max:10'],
            'photo'      => ['nullable', 'image', 'max:2048'],
        ]);

        // $full_name = trim($validated['first_name'] . ' ' . $validated['last_name']);

        $profile = ChartererProfile::where('user_id', auth()->id())->first();

        $photoPath = $profile?->photo_path;

        if ($request->hasFile('photo')) {
            if ($photoPath) {
                Storage::disk('public')->delete($photoPath);
            }
            $photoPath = $request->file('photo')->store('charterer-photos', 'public');
        }

   
        if ($profile) {
            $profile->update([
                'full_name'  => $validated['full_name'],
                'phone'      => $validated['phone'],
                'address'    => $validated['address'],
                'city'       => $validated['city'],
                'state'      => $validated['state'],
                'zip_code'   => $validated['zip_code'],
                'photo_path' => $photoPath,
            ]);
        }

        $charterer = $profile;


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
            ->where('charterer_id', $charterer->id)
            ->whereNotNull('charterer_signed_at') 
            ->with('captainProfile')
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'name' => match($a->agreement_type) {
                    'bareboat' => 'Bareboat Charter Agreement',
                    'captain_hire' => 'Captain ' . ($a->captainProfile?->full_name ?? 'Hire') . ' Agreement',
                    default => 'Agreement',
                },
                'downloadUrl' => url("/charterer/agreement/{$a->id}/download"), 
            ]);

        return \Inertia\Inertia::render('charterer/insurance', [
            'charterEventId' => $event->id,
            'agreements' => $agreements,
        ]);
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
            ->with(['vessel.owner', 'crewResponses.captainProfile.user'])
            ->latest('created_at')
            ->first();

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

        // Fetch all agreements for this event and charterer
        $existingAgreements = \App\Models\CharterHireAgreement::where('charter_event_id', $event->id)
            ->where('charterer_id', $charterer->id)
            ->get();

        // Log for debugging
        \Illuminate\Support\Facades\Log::info('Agreements fetched for signing page', [
            'event_id' => $event->id,
            'agreements_count' => $existingAgreements->count(),
            'agreements' => $existingAgreements->map(fn($a) => [
                'type' => $a->agreement_type,
                'captain_id' => $a->captain_profile_id,
                'signed_at' => $a->charterer_signed_at
            ])->toArray()
        ]);

        // Map agreements to a keyed array for easy lookup
        $agreementMap = [];
        foreach ($existingAgreements as $agreement) {
            if ($agreement->agreement_type === 'bareboat') {
                $agreementMap['bareboat'] = $agreement;
            } elseif ($agreement->agreement_type === 'captain_hire' && $agreement->captain_profile_id) {
                $agreementMap['captain_' . $agreement->captain_profile_id] = $agreement;
            }
        }

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

        public function signAgreements(
            \Illuminate\Http\Request $request,
            AgreementPdfService $pdfService
        ): \Illuminate\Http\RedirectResponse {
            $charterer = \App\Models\ChartererProfile::where('user_id', auth()->id())->firstOrFail();

            $event = \App\Models\CharterEvent::where('charterer_id', $charterer->id)
                ->whereNull('deleted_at')
                ->whereNotIn('status', ['completed', 'cancelled'])
                ->with(['vessel.owner', 'crewResponses.captainProfile'])
                ->latest('created_at')
                ->firstOrFail();

            $request->validate([
                'acknowledged' => ['required', 'accepted'],
            ]);

            // Step 1: Record signing intent for ALL agreements immediately (before PDF generation).
            // This ensures isSigned is persisted even if PDF generation later fails.
            $bareboatAgreement = \App\Models\CharterHireAgreement::updateOrCreate(
                [
                    'charter_event_id'   => $event->id,
                    'charterer_id'       => $charterer->id,
                    'captain_profile_id' => null,
                    'agreement_type'     => 'bareboat',
                    'crew_role'          => 'owner',
                ],
                [
                    'sign_status'         => 'partially_signed',
                    'charterer_signed_at' => now(),
                    'initiated_by'        => 'charterer',
                    'payor'               => 'charterer',
                ]
            );

            $acceptedCaptains = $event->crewResponses
                ->where('crew_role', 'captain')
                ->where('response', 'available')
                ->take(2);

            $captainAgreements = [];
            foreach ($acceptedCaptains as $crewResponse) {
                $captain = $crewResponse->captainProfile;
                if (! $captain) {
                    continue;
                }

                $captainAgreements[$captain->id] = \App\Models\CharterHireAgreement::updateOrCreate(
                    [
                        'charter_event_id'   => $event->id,
                        'charterer_id'       => $charterer->id,
                        'captain_profile_id' => $captain->id,
                        'agreement_type'     => 'captain_hire',
                        'crew_role'          => 'captain',
                    ],
                    [
                        'sign_status'         => 'partially_signed',
                        'charterer_signed_at' => now(),
                        'initiated_by'        => 'charterer',
                        'payor'               => 'charterer',
                    ]
                );
            }

            // Step 2: Update event status now that signing is recorded.
            if (in_array($event->status, ['awaiting_responses', 'draft'])) {
                $event->update(['status' => 'agreements_signed']);
            }

            // Step 3: Attempt PDF generation as best-effort (non-blocking).
            // If PDF generation fails, signing is already recorded above — user still proceeds to insurance.
            try {
                $bareboatPath = $pdfService->generateBareboatAgreement($event);
                $bareboatAgreement->update(['pdf_path' => $bareboatPath]);

                foreach ($acceptedCaptains as $crewResponse) {
                    $captain = $crewResponse->captainProfile;
                    if (! $captain) {
                        continue;
                    }

                    $captainPath = $pdfService->generateCaptainHireAgreement($event, $captain);

                    $agreement = $captainAgreements[$captain->id] ?? null;
                    if ($agreement) {
                        $agreement->update(['pdf_path' => $captainPath]);

                        if ($event->vessel && $event->vessel->owner && $event->vessel->owner->user) {
                            $event->vessel->owner->user->notify(
                                new AgreementSignedNotification($agreement, $charterer->user)
                            );
                        }
                    }
                }
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::error('Agreement PDF generation failed (non-blocking)', [
                    'charter_event_id' => $event->id,
                    'error'            => $e->getMessage(),
                ]);
                // Do NOT return back() here — signing is already recorded, user should proceed.
            }

            return redirect()->route('charterer.insurance')
                ->with('success', 'Agreements signed and saved successfully.');
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
}