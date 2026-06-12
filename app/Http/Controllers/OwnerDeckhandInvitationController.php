<?php

namespace App\Http\Controllers;

use App\Models\DeckhandProfile;
use App\Models\OwnerDeckhandInvitation;
use App\Models\OwnerProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Notifications\InvitationResponseNotification;
class OwnerDeckhandInvitationController extends Controller
{
    public function store(Request $request, DeckhandProfile $deckhand): RedirectResponse
    {
        $validated = $request->validate([
            'vessel_id' => ['required', 'uuid', 'exists:vessels,id'],
        ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        abort_unless(
            $owner->vessels()->where('id', $validated['vessel_id'])->exists(),
            403
        );

        OwnerDeckhandInvitation::firstOrCreate(
            [
                'owner_id'     => $owner->id,
                'deckhand_id'  => $deckhand->id,
                'vessel_id'    => $validated['vessel_id'],
                'initiated_by' => 'owner',
            ],
            ['status' => 'pending']
        );

        return back()->with('success', 'Invitation sent.');
    }

    public function destroy(Request $request, DeckhandProfile $deckhand): RedirectResponse
    {
        $validated = $request->validate([
            'vessel_id' => ['required', 'uuid', 'exists:vessels,id'],
        ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        OwnerDeckhandInvitation::where('owner_id', $owner->id)
            ->where('deckhand_id', $deckhand->id)
            ->where('vessel_id', $validated['vessel_id'])
            ->delete();

        return back()->with('success', 'Invitation cancelled.');
    }

    public function respond(Request $request, OwnerDeckhandInvitation $invitation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:accepted,declined'],
        ]);

        $deckhand = DeckhandProfile::where('user_id', $request->user()->id)->firstOrFail();
        abort_if($invitation->deckhand_id !== $deckhand->id, 403);
        abort_if($invitation->status !== 'pending', 422);

        $invitation->update(['status' => $validated['status']]);
        $invitation->owner->user->notify(new InvitationResponseNotification(
        $request->user(),
        $invitation->vessel,
        $validated['status'],
        'deckhand'
    ));
        return back()->with('success', 'Response submitted.');
    }

    public function index(Request $request): Response
    {
        $deckhandProfile = $request->user()->deckhandProfile;

        if (! $deckhandProfile) {
            return Inertia::render('deckhand-invitations', ['invitations' => []]);
        }

        $invitations = OwnerDeckhandInvitation::where('deckhand_id', $deckhandProfile->id)
            ->with([
                'owner.user',
                'owner.vessels.photos' => fn($q) => $q->orderBy('display_order'),
                'vessel.photos'        => fn($q) => $q->orderBy('display_order'),
            ])
            ->where('initiated_by', 'owner')
            ->latest()
            ->get()
            ->map(function (OwnerDeckhandInvitation $invitation) {
                $owner  = $invitation->owner;
                $vessel = $invitation->vessel;
                $photo  = $vessel?->photos->first();

                return [
                    'id'          => $invitation->id,
                    'ownerId'     => $owner?->id,
                    'ownerUserId' => $owner?->user_id,
                    'ownerName'   => $owner?->full_name ?? '—',
                    'ownerPhoto'  => $owner?->photo_path
                        ? Storage::url($owner->photo_path)
                        : null,
                    'location'    => trim(
                        collect([$owner?->city, $owner?->state])
                            ->filter()
                            ->implode(', ')
                    ) ?: '—',
                    'vesselId'    => $vessel?->id,
                    'vesselName'  => $vessel?->name ?? '—',
                    'vesselSpec'  => $vessel
                        ? ucfirst($vessel->vessel_type) . ' • ' . $vessel->length_ft . 'ft'
                        : '—',
                    'vesselImage' => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                    'marina'      => $vessel
                        ? trim(collect([$vessel->marina_name, $vessel->marina_city])->filter()->implode(', '))
                        : '—',
                    'invitedAt'   => $invitation->created_at->format('M j, Y'),
                    'status'      => $invitation->status ?? 'pending',
                ];
            });

        return Inertia::render('deckhand-invitations', [
            'invitations' => $invitations,
        ]);
    }
}