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

        $responses = CharterCrewResponse::where('profile_id', $profile->id)
            ->where('crew_role', $crewRole)
            ->with([
                'charterEvent.vessel.photos' => fn($q) => $q->orderBy('display_order'),
                'charterEvent.vessel',
            ])
            ->latest()
            ->get()
            ->map(function (CharterCrewResponse $crewResponse) use ($crewRole, $profile) {
                $event  = $crewResponse->charterEvent;
                $vessel = $event?->vessel;
                $photo  = $vessel?->photos->first()?->image_path;

                $durationHours = $event ? round($event->duration_minutes / 60, 1) : 0;
                $durationLabel = $durationHours == 1 ? '1 hour' : "{$durationHours} hours";

                $deckhandInfo = null;

                if ($crewRole === 'captain' && $event) {
                    $existingDeckhandResponse = CharterCrewResponse::where('charter_event_id', $event->id)
                        ->where('crew_role', 'deckhand')
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
                        ->where('response', 'accepted')
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
                                'name' => $deckhand->user->name ?? 'Unknown',
                                'photo' => $deckhand->photo_path ? asset('storage/' . $deckhand->photo_path) : null,
                                'experience' => ($deckhand->experience_years ?? 0) . ' years',
                                'rate' => '$' . ($deckhand->daily_rate ?? 0) . '/day',
                                'hasServer' => (bool) ($deckhand->has_server ?? false),
                                'hasBartend' => (bool) ($deckhand->has_bartend ?? false),
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
                    'ownerUserId'       => null,
                    'deckhandInfo'      => $deckhandInfo,
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
        ->where('response', 'accepted')
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
            ->where('response', 'accepted')
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
                ->first();
            
            if (!$existingDeckhand) {
                return back()->withErrors([
                    'deckhand' => 'You must select a deckhand before accepting this request.'
                ]);
            }
        }

        $crewResponse->update([
            'response'     => $validated['response'],
            'responded_at' => now(),
        ]);

        return back()->with('success', 'Response submitted successfully.');
    }
}