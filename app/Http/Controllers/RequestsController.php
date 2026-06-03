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

                    $availableDeckhands = DeckhandVesselInterest::where('vessel_id', $vessel?->id)
                        ->where('status', 'accepted')
                        ->with(['deckhand.user'])
                        ->get()
                        ->map(function ($interest) {
                            $deckhand = $interest->deckhand;
                            $user = $deckhand?->user;
                            return [
                                'id'         => $deckhand?->id,
                                'name'       => $deckhand?->full_name ?? $user?->name ?? '—',
                                'photo'      => $deckhand?->photo_path ? Storage::url($deckhand->photo_path) : null,
                                'experience' => $deckhand?->years_experience ? $deckhand->years_experience . ' yrs experience' : '—',
                                'rate'       => $deckhand?->hourly_rate ? '$' . number_format($deckhand->hourly_rate, 0) . '/hr' : '—',
                                'hasServer'  => (bool) ($deckhand?->has_server_experience ?? false),
                                'hasBartend' => (bool) ($deckhand?->has_bartending_experience ?? false),
                            ];
                        })
                        ->values()
                        ->toArray();

                    $mustSelectDeckhand = !$existingDeckhandResponse;

                    $deckhandInfo = [
                        'selectedDeckhand'      => $existingDeckhandResponse ? [
                            'id'             => $existingDeckhandResponse->deckhandProfile?->id,
                            'name'           => $existingDeckhandResponse->deckhandProfile?->full_name ?? '—',
                            'responseStatus' => $existingDeckhandResponse->response,
                            'selectedByMe'   => $thisCaptainSelected,
                        ] : null,
                        'availableDeckhands'    => $availableDeckhands,
                        'mustSelectDeckhand'    => $mustSelectDeckhand,
                        'hasQualifiedDeckhands' => count($availableDeckhands) > 0, // Added for frontend logic
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

    /**
     * NEW METHOD: Handles sending requests to one or multiple deckhands
     */
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

        // Prevent sending requests if a deckhand has already been hired (accepted)
        $acceptedDeckhand = CharterCrewResponse::where('charter_event_id', $event->id)
            ->where('crew_role', 'deckhand')
            ->whereIn('response', ['available', 'accepted'])
            ->exists();

        if ($acceptedDeckhand) {
            return back()->withErrors(['deckhand_ids' => 'A deckhand has already been hired for this charter.']);
        }

        foreach ($validated['deckhand_ids'] as $deckhandId) {
            $validInterest = DeckhandVesselInterest::where('deckhand_id', $deckhandId)
                ->where('vessel_id', $event->vessel_id)
                ->where('status', 'accepted')
                ->exists();

            if (!$validInterest) {
                continue; // Skip if not qualified
            }

            $exists = CharterCrewResponse::where('charter_event_id', $event->id)
                ->where('profile_id', $deckhandId)
                ->where('crew_role', 'deckhand')
                ->exists();

            if (!$exists) {
                CharterCrewResponse::create([
                    'charter_event_id'       => $event->id,
                    'profile_id'             => $deckhandId,
                    'crew_role'              => 'deckhand',
                    'response'               => 'pending',
                    'expires_at'             => now()->addHours(48),
                    'selected_by_captain_id' => $profile->id,
                ]);
            }
        }

        return back()->with('success', 'Deckhand request(s) sent successfully. You can now accept the charter request.');
    }

    /**
     * UPDATED METHOD: Simplified to only handle charter acceptance/decline
     */
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

        // If a captain is accepting, ensure a deckhand has been selected/requested
        if ($isCaptain && $validated['response'] === 'available') {
            $event = $crewResponse->charterEvent;
            abort_if(!$event, 422, 'Charter event not found.');

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