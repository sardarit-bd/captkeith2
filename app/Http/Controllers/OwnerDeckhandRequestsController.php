<?php

namespace App\Http\Controllers;

use App\Models\DeckhandProfile;
use App\Models\OwnerDeckhandInvitation;
use App\Models\OwnerProfile;
use App\Notifications\OwnerDeckhandResponseNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class OwnerDeckhandRequestsController extends Controller
{
    public function index(Request $request): Response
    {
        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)->first();

        if (! $ownerProfile) {
            return Inertia::render('deckhand-requests', ['interests' => []]);
        }

        $vesselIds = $ownerProfile->vessels()->pluck('id');

        $interests = OwnerDeckhandInvitation::whereIn('vessel_id', $vesselIds)
            ->with([
                'deckhand.user',
                'vessel.photos' => fn($q) => $q->orderBy('display_order'),
            ])
            ->where('initiated_by', 'deckhand')
            ->latest()
            ->get()
            ->map(function (OwnerDeckhandInvitation $interest) {
                $deckhand = $interest->deckhand;
                $vessel   = $interest->vessel;
                $photo    = $vessel?->photos->first();

                return [
                    'id'                    => $interest->id,
                    'deckhandId'            => $deckhand?->id,
                    'deckhandUserId'        => $deckhand?->user_id,
                    'deckhandName'          => $deckhand?->full_name ?? '—',
                    'deckhandPhoto'         => $deckhand?->photo_path
                        ? Storage::url($deckhand->photo_path)
                        : null,
                    'hasServerExperience'   => $deckhand?->has_server_experience ? 'Server Exp' : '—',
                    'hasBartendingExperience' => $deckhand?->has_bartending_experience ? 'Bartending Exp' : '—',
                    'yearsExperience'       => $deckhand?->years_experience
                        ? $deckhand->years_experience . ' yrs exp'
                        : '—',
                    'hourlyRate'            => $deckhand?->hourly_rate
                        ? '$' . number_format($deckhand->hourly_rate, 0) . '/hr'
                        : '—',
                    'location'              => trim(
                        collect([$deckhand?->city, $deckhand?->state])
                            ->filter()
                            ->implode(', ')
                    ) ?: '—',
                    'vesselId'              => $vessel?->id,
                    'vesselName'            => $vessel?->name ?? '—',
                    'vesselSpec'            => $vessel
                        ? ucfirst($vessel->vessel_type) . ' • ' . $vessel->length_ft . 'ft'
                        : '—',
                    'vesselImage'           => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                    'marina'                => $vessel
                        ? trim(collect([$vessel->marina_name, $vessel->marina_city])->filter()->implode(', '))
                        : '—',
                    'requestedAt'           => $interest->created_at->format('M j, Y'),
                    'status'                => $interest->status ?? 'pending',
                    'initiatedBy'           => $interest->initiated_by ?? 'owner',
                ];
            });

        return Inertia::render('deckhand-requests', [
            'interests' => $interests,
        ]);
    }

    public function respond(Request $request, OwnerDeckhandInvitation $interest): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:accepted,declined'],
        ]);

        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)
            ->firstOrFail();

        $ownsVessel = $ownerProfile->vessels()
            ->where('id', $interest->vessel_id)
            ->exists();

        abort_if(! $ownsVessel, 403, 'You do not own this vessel.');

        $interest->update(['status' => $validated['status']]);
        $interest->load('vessel');
        $deckhandUser = $interest->deckhand?->user;

        if ($deckhandUser) {
            $deckhandUser->notify(new OwnerDeckhandResponseNotification($interest));
        }
        $message = $validated['status'] === 'accepted'
            ? 'Deckhand request accepted.'
            : 'Deckhand request declined.';

        return back()->with('success', $message);
    }

    public function revokeAcceptance(Request $request, DeckhandProfile $deckhand): RedirectResponse
    {
        $ownerProfile = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        OwnerDeckhandInvitation::whereIn(
            'vessel_id',
            $ownerProfile->vessels()->pluck('id')
        )
            ->where('deckhand_id', $deckhand->id)
            ->where('status', 'accepted')
            ->delete();

        return back()->with('success', 'Acceptance revoked.');
    }
}