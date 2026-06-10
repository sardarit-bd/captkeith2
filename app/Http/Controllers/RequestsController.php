<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\CharterCrewResponse;
use App\Models\DeckhandProfile;
use App\Models\DeckhandVesselInterest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\CharterHireAgreement;
use App\Services\AgreementPdfService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RequestsController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        if ($user->hasRole('captain')) {
            $profile  = CaptainProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'captain';
        } else {
            $profile  = DeckhandProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'deckhand';
        }

        $responsesQuery = CharterCrewResponse::where('profile_id', $profile->id)
            ->where('crew_role', $crewRole)
            ->with([
                'charterEvent.vessel.photos' => fn($q) => $q->orderBy('display_order'),
                'charterEvent.vessel',
            ])
            ->latest()
            ->get();
        $captainIds = $responsesQuery->pluck('selected_by_captain_id')->filter()->unique();
        $captains = \App\Models\CaptainProfile::whereIn('id', $captainIds)->with('user')->get()->keyBy('id');

        $responses = $responsesQuery->map(function (CharterCrewResponse $crewResponse) use ($crewRole, $profile, $captains) {
                $event  = $crewResponse->charterEvent;
                $vessel = $event?->vessel;
                $photo  = $vessel?->photos->first()?->image_path;

                $durationHours = $event ? round($event->duration_minutes / 60, 1) : 0;
                $durationLabel = $durationHours == 1 ? '1 hour' : "{$durationHours} hours";

                $deckhandInfo = null;
                $agreements = [];

                if ($crewRole === 'captain' && $event) {
                    $existingDeckhandResponse = CharterCrewResponse::where('charter_event_id', $event->id)
                        ->where('crew_role', 'deckhand')
                        ->where('response', 'available') 
                        ->with('deckhandProfile')
                        ->first();

                    $thisCaptainSelected = $existingDeckhandResponse
                        && $existingDeckhandResponse->selected_by_captain_id === $profile->id;

                    $approvedInvitations = \App\Models\OwnerDeckhandInvitation::where('vessel_id', $vessel?->id)
                        ->where('status', 'accepted') 
                        ->with(['deckhand.user'])
                        ->get();

                    $approvedDeckhandIds = $approvedInvitations->pluck('deckhand_id')->toArray();
                    $hiredDeckhandIds = CharterCrewResponse::where('charter_event_id', $event->id)
                        ->where('crew_role', 'deckhand')
                        ->where('response', 'available') 
                        ->pluck('profile_id')
                        ->toArray();

                    $availableDeckhands = \App\Models\DeckhandProfile::query()
                        ->with('user') 
                        ->whereIn('deckhand_profiles.id', $approvedDeckhandIds) 
                        ->leftJoin('charter_crew_responses as ccr', function($join) use ($event, $profile) {
                            $join->on('ccr.profile_id', '=', 'deckhand_profiles.id')
                                ->where('ccr.charter_event_id', $event->id)
                                ->where('ccr.crew_role', 'deckhand')
                                ->where('ccr.selected_by_captain_id', $profile->id);
                        })
                        ->addSelect('deckhand_profiles.*', 'ccr.response as request_status', 'ccr.id as request_id')
                        ->get()
                        ->map(function($deckhand) {
                            return [
                                'id' => $deckhand->id,
                                'name' => $deckhand->full_name ?? ($deckhand->user->name ?? 'Unknown'),
                                'photo' => $deckhand->photo_path ? asset('storage/' . $deckhand->photo_path) : null,
                                'experience' => ($deckhand->years_experience ?? 0) . ' years',
                                'rate' => '$' . ($deckhand->hourly_rate ?? 0) . '/day',
                                'hasServer' => (bool) ($deckhand->has_server_experience ?? false),
                                'hasBartend' => (bool) ($deckhand->has_bartending_experience ?? false),
                                'requestStatus' => $deckhand->request_status ?? 'none',
                                'requestId' => $deckhand->request_id,
                            ];
                        });

                    $mustSelectDeckhand = empty($hiredDeckhandIds);

                    $deckhandInfo = [
                        'selectedDeckhand'      => $existingDeckhandResponse ? [
                            'id'             => $existingDeckhandResponse->deckhandProfile?->id,
                            'name'           => $existingDeckhandResponse->deckhandProfile?->full_name ?? '—',
                            'responseStatus' => $existingDeckhandResponse->response,
                            'selectedByMe'   => $thisCaptainSelected,
                        ] : null,
                        'availableDeckhands'    => $availableDeckhands,
                        'mustSelectDeckhand'    => $mustSelectDeckhand,
                        'hasQualifiedDeckhands' => count($availableDeckhands) > 0,
                    ];
                    
                    $agreements = \App\Models\CharterHireAgreement::where('charter_event_id', $event->id)
                        ->where(function ($query) use ($profile) {
                            $query->where('captain_profile_id', $profile->id)
                                  ->orWhere('agreement_type', 'bareboat');
                        })
                        ->get()
                        ->map(function ($a) use ($profile) {
                            return [
                                'id' => $a->id,
                                'type' => $a->agreement_type,
                                'title' => $a->agreement_type === 'bareboat' ? 'Bareboat Charter Agreement' : 'Captain Hire Agreement',
                                'status' => $this->getAgreementStatusLabel($a),
                                'downloadUrl' => route('requests.agreement.download', ['agreementId' => $a->id]),
                                'isSignedByCharterer' => !is_null($a->charterer_signed_at),
                                'isSignedByCrew' => !is_null($a->crew_signed_at),
                                'isFullySigned' => !is_null($a->fully_signed_at),
                            ];
                        });
                }
                $captain = $captains->get($crewResponse->selected_by_captain_id);
                $captainInfo = null;
                            if ($captain) {
                    $captainInfo = [
                        'id' => $captain->id,
                        'userId' => $captain->user_id, 
                        'name' => $captain->full_name ?? ($captain->user->name ?? 'Unknown Captain'),
                        'photo' => $captain->photo_path ? Storage::url($captain->photo_path) : null,
                        'role' => 'Captain',
                    ];
                }
                return [
                    'id'                => $crewResponse->id,
                    'type'              => 'charter_request',
                    'yachtName'         => $vessel?->name ?? '—',
                    'yachtSpec'         => $vessel ? ucfirst($vessel->vessel_type) . ' • ' . $vessel->length_ft . 'ft' : '—',
                    'marina'            => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city])->filter()->implode(', ')) : '—',
                    'image'             => $photo ? Storage::url($photo) : null,
                    'date'              => $event?->charter_date?->format('M j, Y') ?? '—',
                    'time'              => $event?->start_time ?? '—',
                    'duration'          => $durationLabel,
                    'specialNotes'      => $event?->special_notes ?? '',
                    'status'            => $crewResponse->response,
                    'charterEventId'    => $event?->id,
                    'vesselId'          => $vessel?->id, 
                    'ownerUserId'       => null,
                    'deckhandInfo'      => $deckhandInfo,
                    'agreements'        => $agreements,
                    'captainInfo'       => $captainInfo, 
                ];
            });

        return Inertia::render('requests', [
            'requests' => $responses->values(),
        ]);
    }

    public function sendDeckhandRequest(Request $request)
    {
        $validated = $request->validate([
            'charter_event_id' => 'required|exists:charter_events,id',
            'deckhand_profile_id' => 'required|exists:deckhand_profiles,id',
        ]);

        $captainProfileId = auth()->user()->captainProfile->id;

        $event = \App\Models\CharterEvent::find($validated['charter_event_id']);
        if (!$event) {
            return back()->withErrors(['charter_event_id' => 'Charter event not found.']);
        }

        $validInvitation = \App\Models\OwnerDeckhandInvitation::where('deckhand_id', $validated['deckhand_profile_id'])
            ->where('vessel_id', $event->vessel_id)
            ->where('status', 'accepted')
            ->exists();

        if (!$validInvitation) {
            return back()->withErrors(['deckhand' => 'This deckhand is not approved by the owner for this specific vessel.']);
        }

        $alreadyHired = \App\Models\CharterCrewResponse::where('charter_event_id', $validated['charter_event_id'])
            ->where('profile_id', $validated['deckhand_profile_id'])
            ->where('response', 'available')
            ->exists();

        if ($alreadyHired) {
            return back()->withErrors(['deckhand' => 'This deckhand is already hired for this charter.']);
        }

        \App\Models\CharterCrewResponse::updateOrCreate(
            [
                'charter_event_id' => $validated['charter_event_id'],
                'profile_id' => $validated['deckhand_profile_id'],
                'crew_role' => 'deckhand',
                'selected_by_captain_id' => $captainProfileId,
            ],
            [
                'response' => 'pending',
                'responded_at' => null,
                'expires_at' => now()->addDays(3),
            ]
        );

        return back()->with('success', 'Request sent successfully!');
    }

    public function cancelDeckhandRequest(Request $request)
    {
        $validated = $request->validate([
            'charter_event_id' => 'required|exists:charter_events,id',
            'deckhand_profile_id' => 'required|exists:deckhand_profiles,id',
        ]);

        $captainProfileId = auth()->user()->captainProfile->id;

        \App\Models\CharterCrewResponse::where('charter_event_id', $validated['charter_event_id'])
            ->where('profile_id', $validated['deckhand_profile_id'])
            ->where('selected_by_captain_id', $captainProfileId)
            ->where('response', 'pending')
            ->delete();

        return back()->with('success', 'Request cancelled.');
    }

    public function selectDeckhand(Request $request, CharterCrewResponse $crewResponse): RedirectResponse
    {
        $user = Auth::user();
        $profile = CaptainProfile::where('user_id', $user->id)->firstOrFail();

        abort_if($crewResponse->profile_id !== $profile->id || $crewResponse->crew_role !== 'captain', 403);

        $validated = $request->validate([
            'deckhand_ids'   => ['required', 'array', 'min:1'],
            'deckhand_ids.*' => ['uuid', 'exists:deckhand_profiles,id'],
        ]);

        $event = $crewResponse->charterEvent;
        abort_if(!$event, 422, 'Charter event not found.');


        $hiredDeckhand = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'deckhand')
            ->where('response', 'available')
            ->exists();

        if ($hiredDeckhand) {
            return back()->withErrors(['deckhand_ids' => 'A deckhand has already been hired for this charter.']);
        }

        foreach ($validated['deckhand_ids'] as $deckhandId) {
            $validInvitation = \App\Models\OwnerDeckhandInvitation::where('deckhand_id', $deckhandId)
                ->where('vessel_id', $event->vessel_id)
                ->where('status', 'accepted') 
                ->exists();

            if (!$validInvitation) {
                continue; 
            }

            CharterCrewResponse::updateOrCreate(
                [
                    'charter_event_id' => $event->id,
                    'profile_id'       => $deckhandId,
                    'crew_role'        => 'deckhand',
                ],
                [
                    'response'               => 'pending',
                    'expires_at'             => now()->addHours(48),
                    'selected_by_captain_id' => $profile->id,
                    'responded_at'           => null, 
                ]
            );
        }

        return back()->with('success', 'Deckhand request(s) sent successfully. You can now accept the charter request.');
    }

    public function respond(Request $request, CharterCrewResponse $crewResponse): RedirectResponse
    {
        $user = Auth::user();
        $isCaptain = $user->hasRole('captain');

        if ($isCaptain) {
            $profile = CaptainProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'captain';
        } else {
            $profile = DeckhandProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'deckhand';
        }

        abort_if($crewResponse->profile_id !== $profile->id || $crewResponse->crew_role !== $crewRole, 403);

        $validated = $request->validate([
            'response' => ['required', 'in:available,unavailable'],
        ]);

        $event = $crewResponse->charterEvent; 

        if ($isCaptain && $validated['response'] === 'available') {
            $existingDeckhand = CharterCrewResponse::where('charter_event_id', $event->id)
                ->where('crew_role', 'deckhand')
                ->where('response', 'available') 
                ->first();
            
            if (!$existingDeckhand) {
                return back()->withErrors([
                    'deckhand' => 'You must select a deckhand and they must accept before you can accept this request.'
                ]);
            }
        }

        $crewResponse->update([
            'response'     => $validated['response'],
            'responded_at' => now(),
        ]);

        return back()->with('success', 'Response submitted successfully.');
    }

    public function getAgreementDetails(CharterCrewResponse $crewResponse): Response
    {
        $user = Auth::user();
        $profile = CaptainProfile::where('user_id', $user->id)->firstOrFail();
        
        abort_if($crewResponse->profile_id !== $profile->id || $crewResponse->crew_role !== 'captain', 403);

        $event = $crewResponse->charterEvent;
        abort_if(!$event, 404);

        $agreements = CharterHireAgreement::where('charter_event_id', $event->id)
            ->where(function ($query) use ($profile) {
                $query->where('captain_profile_id', $profile->id)
                    ->orWhere('agreement_type', 'bareboat');
            })
        ->get()
        ->map(function ($a) {
            return [
                'id' => $a->id,
                'type' => $a->agreement_type,
                'title' => $a->agreement_type === 'bareboat' ? 'Bareboat Charter Agreement' : 'Captain Hire Agreement',
                'status' => $this->getAgreementStatusLabel($a),
                'downloadUrl' => route('requests.agreement.download', ['agreementId' => $a->id]),
                'isSignedByCharterer' => !is_null($a->charterer_signed_at),
                'isSignedByCrew' => !is_null($a->crew_signed_at),
                'isFullySigned' => !is_null($a->fully_signed_at),
            ];
        });

        return Inertia::render('requests/agreement-details', [
            'agreements' => $agreements,
            'charterEventId' => $event->id,
        ]);
    }
   
    public function downloadAgreement(string $agreementId): StreamedResponse
    {
        $user = Auth::user();
        $agreement = CharterHireAgreement::with(['charterEvent.vessel.owner.user', 'charterer.user', 'captainProfile.user'])
            ->findOrFail($agreementId);

        $isCaptain = $agreement->captainProfile?->user_id === $user->id;
        $isCharterer = $agreement->charterer?->user_id === $user->id;
        $isOwner = $agreement->charterEvent?->vessel?->owner?->user_id === $user->id;
        
        $isCoCaptain = false;
        if (!$isCaptain && !$isCharterer && !$isOwner) {
            $captainProfile = CaptainProfile::where('user_id', $user->id)->first();
            if ($captainProfile && $agreement->charterEvent?->vessel_id) {
                $isCoCaptain = \App\Models\VesselQualifiedCaptain::where('vessel_id', $agreement->charterEvent->vessel_id)
                    ->where('captain_profile_id', $captainProfile->id)
                    ->exists();
            }
        }

        if (!$isCaptain && !$isCharterer && !$isOwner && !$isCoCaptain) {
            abort(403, 'Unauthorized.');
        }

        $path = $agreement->pdf_path;
        if (!$path || !Storage::disk('local')->exists($path)) {
            abort(404, 'Document not found.');
        }

        return Storage::disk('local')->download($path, basename($path));
    }

    public function signDeckhandAgreement(Request $request, CharterCrewResponse $crewResponse): RedirectResponse
    {
        $user = Auth::user();
        $profile = CaptainProfile::where('user_id', $user->id)->firstOrFail();
        
        abort_if($crewResponse->profile_id !== $profile->id || $crewResponse->crew_role !== 'captain', 403);

        $event = $crewResponse->charterEvent;
        abort_if(!$event, 404);

        $deckhandResponse = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'deckhand')
            ->where('selected_by_captain_id', $profile->id)
            ->first();

        abort_if(!$deckhandResponse, 403, 'No deckhand selected by you for this charter.');

        $agreement = CharterHireAgreement::where('charter_event_id', $event->id)
            ->where('deckhand_profile_id', $deckhandResponse->profile_id)
            ->where('agreement_type', 'deckhand_hire') 
            ->first();

        if (!$agreement) {
            $pdfService = app(AgreementPdfService::class);
            $deckhand = $deckhandResponse->deckhandProfile;

            $agreement = CharterHireAgreement::updateOrCreate(
                [
                    'charter_event_id' => $event->id,
                    'deckhand_profile_id' => $deckhandResponse->profile_id,
                    'agreement_type' => 'deckhand_hire', 
                ],
                [
                    'charterer_id' => $event->charterer_id,
                    'captain_profile_id' => $profile->id, 
                    'initiated_by' => 'captain',
                    'crew_role' => 'deckhand', 
                    'sign_status' => 'not_sent', 
                ]
            );
        }

        return back()->with([
            'signDeckhandAgreementId' => $agreement->id,
            'signDeckhandModalOpen' => true,
        ]);
    }

    private function getAgreementStatusLabel(CharterHireAgreement $agreement): string
    {
        if ($agreement->fully_signed_at) return 'Fully Signed';
        if ($agreement->crew_signed_at && $agreement->charterer_signed_at) return 'Pending Finalization';
        if ($agreement->charterer_signed_at) return 'Signed by Charterer';
        if ($agreement->crew_signed_at) return 'Signed by Crew';
        return 'Pending Signature';
    }

    public function confirmSignDeckhandAgreement(string $agreementId): RedirectResponse
    {
        $user = Auth::user();
        $profile = CaptainProfile::where('user_id', $user->id)->firstOrFail();
        
        $agreement = CharterHireAgreement::findOrFail($agreementId);
        
        abort_if($agreement->captain_profile_id !== $profile->id, 403, 'You are not authorized to sign this agreement.');
        
        $agreement->update([
            'crew_signed_at' => now(),
        ]);
        
        if ($agreement->charterer_signed_at && !$agreement->fully_signed_at) {
            $agreement->update(['fully_signed_at' => now()]);
        }

        return back()->with('success', 'Deckhand agreement signed successfully!');
    }
}