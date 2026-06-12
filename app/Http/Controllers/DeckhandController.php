<?php

namespace App\Http\Controllers;

use App\Models\DeckhandProfile;
use App\Models\OwnerDeckhandInvitation;
use App\Models\OwnerProfile;
use App\Models\Vessel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DeckhandController extends Controller
{
    public function index(Request $request): Response
    {
        $query = DeckhandProfile::query()
            ->whereNull('deleted_at')
            ->with('user');

        if ($request->filled('min_experience')) {
            $query->where('years_experience', '>=', (int) $request->input('min_experience'));
        }

        if ($request->filled('has_server_experience')) {
            $query->where('has_server_experience', true);
        }

        if ($request->filled('has_bartending_experience')) {
            $query->where('has_bartending_experience', true);
        }

        $deckhands = $query->latest()->get()
            ->map(fn(DeckhandProfile $deckhand) => [
                'id'                      => $deckhand->id,
                'user_id'                 => $deckhand->user_id,
                'name'                    => $deckhand->full_name,
                'location'                => trim(collect([$deckhand->city, $deckhand->state])->filter()->implode(', ')),
                'hasServerExperience'     => $deckhand->has_server_experience,
                'hasBartendingExperience' => $deckhand->has_bartending_experience,
                'experience'              => $deckhand->years_experience ? $deckhand->years_experience . ' years experience' : '—',
                'rate'                    => $deckhand->hourly_rate ? '$' . number_format($deckhand->hourly_rate, 0) . '/hr' : '—',
                'availability'            => 'Available',
                'photo'                   => $deckhand->photo_path ? Storage::url($deckhand->photo_path) : null,
            ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();

        $vesselIds = $owner
            ? Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->pluck('id')
            : collect();


        $invitations = $owner
            ? OwnerDeckhandInvitation::where('owner_id', $owner->id)
            ->where('initiated_by', 'owner') 
            ->get()
            ->groupBy('deckhand_id')
            ->map(fn($group) => $group->pluck('status', 'vessel_id')->toArray())
            ->toArray()
            : [];

        $acceptedDeckhandIds = $owner
            ? OwnerDeckhandInvitation::where('owner_id', $owner->id)
            ->where('status', 'accepted')
            ->pluck('deckhand_id')
            ->unique()
            ->values()
            ->toArray()
            : [];

       
        $acceptedViaInterestIds = $owner
            ? OwnerDeckhandInvitation::whereIn('vessel_id', $vesselIds)
            ->where('initiated_by', 'deckhand') 
            ->where('status', 'accepted')
            ->pluck('deckhand_id')
            ->unique()
            ->values()
            ->toArray()
            : [];


        $interestedDeckhandIds = $owner
            ? OwnerDeckhandInvitation::whereIn('vessel_id', $vesselIds)
            ->where('initiated_by', 'deckhand')
            ->whereIn('status', ['pending', 'accepted'])
            ->pluck('deckhand_id')
            ->unique()
            ->values()
            ->toArray()
            : [];

        return Inertia::render('deckhands', [
            'deckhands'               => $deckhands,
            'filters'                 => $request->only(['min_experience', 'has_server_experience', 'has_bartending_experience']),
            'vessels'                 => $owner
                ? Vessel::where('owner_id', $owner->id)
                ->whereNull('deleted_at')
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn($v) => ['value' => $v->id, 'label' => $v->name])
                : [],
            'invitations'             => $invitations,
            'acceptedDeckhandIds'     => $acceptedDeckhandIds,
            'acceptedViaInterestIds'  => $acceptedViaInterestIds,
            'interestedDeckhandIds'   => $interestedDeckhandIds,
        ]);
    }
}