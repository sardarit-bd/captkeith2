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
            ->where('status', 'approved')
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



        public function show(DeckhandProfile $deckhand)
    {
        $deckhand->load('user');
        
        return Inertia::render('admin/deckhands/show', [
            'deckhand' => [
                'id' => $deckhand->id,
                'user_id' => $deckhand->user_id,
                'full_name' => $deckhand->full_name,
                'phone' => $deckhand->phone,
                'email' => $deckhand->user->email,
                'address' => $deckhand->address,
                'city' => $deckhand->city,
                'state' => $deckhand->state,
                'zip_code' => $deckhand->zip_code,
                'years_experience' => $deckhand->years_experience,
                'hourly_rate' => $deckhand->hourly_rate,
                'has_server_experience' => $deckhand->has_server_experience,
                'has_bartending_experience' => $deckhand->has_bartending_experience,
                'status' => $deckhand->status ?? 'pending',
                'resume_path' => $deckhand->resume_path,
                'photo_path' => $deckhand->photo_path,
                'created_at' => $deckhand->created_at,
                'updated_at' => $deckhand->updated_at,
            ],
        ]);
    }

    public function approve(DeckhandProfile $deckhand)
    {
        $deckhand->update(['status' => 'approved']);
        
        return back()->with('success', 'Deckhand approved successfully');
    }

    public function reject(DeckhandProfile $deckhand)
    {
        $deckhand->update(['status' => 'rejected']);
        
        return back()->with('success', 'Deckhand rejected');
    }


    public function showProfile(DeckhandProfile $deckhand)
    {
        $deckhand->load('user');
        
        return Inertia::render('admin/deckhands/[id]/profile', [
            'deckhand' => [
                'id' => $deckhand->id,
                'user_id' => $deckhand->user_id,
                'full_name' => $deckhand->full_name,
                'email' => $deckhand->user?->email ?? 'No email',
                'phone' => $deckhand->phone,
                'address' => $deckhand->address,
                'city' => $deckhand->city,
                'state' => $deckhand->state,
                'zip_code' => $deckhand->zip_code,
                'years_experience' => $deckhand->years_experience,
                'has_server_experience' => $deckhand->has_server_experience,
                'has_bartending_experience' => $deckhand->has_bartending_experience,
                'hourly_rate' => $deckhand->hourly_rate,
                'status' => $deckhand->status,
                'is_verified' => $deckhand->is_verified,
                'created_at' => $deckhand->created_at,
                'updated_at' => $deckhand->updated_at,
                
                // FIX: Use asset() to generate the full public URL for storage files
                'resume_path' => $deckhand->resume_path ? asset('storage/' . $deckhand->resume_path) : null,
                'photo_path' => $deckhand->photo_path ? asset('storage/' . $deckhand->photo_path) : null,
            ],
        ]);
    }
}