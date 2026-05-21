<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\CharterCrewResponse;
use App\Models\DeckhandProfile;
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
            ->map(function (CharterCrewResponse $crewResponse) {
                $event         = $crewResponse->charterEvent;
                $vessel        = $event?->vessel;
                $photo         = $vessel?->photos->first()?->image_path;
                $durationHours = $event ? round($event->duration_minutes / 60, 1) : 0;
                $durationLabel = $durationHours == 1 ? '1 hour' : "{$durationHours} hours";

                return [
                    'id'             => $crewResponse->id,
                    'type'           => 'charter_request',
                    'yachtName'      => $vessel?->name ?? '—',
                    'yachtSpec'      => $vessel ? ucfirst($vessel->vessel_type) . ' • ' . $vessel->length_ft . 'ft' : '—',
                    'marina'         => $vessel ? trim(collect([$vessel->marina_name, $vessel->marina_city])->filter()->implode(', ')) : '—',
                    'image'          => $photo ? Storage::url($photo) : null,
                    'date'           => $event?->charter_date?->format('M j, Y') ?? '—',
                    'time'           => $event?->start_time ?? '—',
                    'duration'       => $durationLabel,
                    'specialNotes'   => $event?->special_notes ?? '',
                    'status'         => $crewResponse->response,
                    'charterEventId' => $event?->id,
                    'ownerUserId'    => null,
                ];
            });

        return Inertia::render('requests', [
            'requests' => $responses->values(),
        ]);
    }

    public function respond(Request $request, CharterCrewResponse $crewResponse): RedirectResponse
    {
        $validated = $request->validate([
            'response' => ['required', 'in:available,unavailable'],
        ]);

        $user = Auth::user();

        if ($user->hasRole('captain')) {
            $profile  = CaptainProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'captain';
        } else {
            $profile  = DeckhandProfile::where('user_id', $user->id)->firstOrFail();
            $crewRole = 'deckhand';
        }

        abort_if(
            $crewResponse->profile_id !== $profile->id || $crewResponse->crew_role !== $crewRole,
            403,
        );

        $crewResponse->update([
            'response'     => $validated['response'],
            'responded_at' => now(),
        ]);

        return back()->with('success', 'Response submitted successfully.');
    }
}
