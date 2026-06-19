<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\OwnerCaptainInvitation;
use App\Models\OwnerProfile;
use App\Models\Vessel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CaptainController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CaptainProfile::query()
            ->where('status', 'approved')
            ->whereNull('deleted_at')
            ->with('user');

        if ($request->filled('license_type')) {
            $query->where('license_type', $request->input('license_type'));
        }

        if ($request->filled('min_experience')) {
            $query->where('years_experience', '>=', (int) $request->input('min_experience'));
        }

        $captains = $query->latest()->get()
            ->map(fn(CaptainProfile $captain) => [
                'id'           => $captain->id,
                'user_id'      => $captain->user_id,
                'name'         => $captain->full_name,
                'location'     => trim(collect([$captain->city, $captain->state])->filter()->implode(', ')),
                'license'      => $captain->license_type ?? '—',
                'experience'   => $captain->years_experience ? $captain->years_experience . ' years experience' : '—',
                'endorsement'  => $captain->endorsement ? [$captain->endorsement] : [],
                'bio'          => $captain->geographic_area ?? '',
                'rate'         => $captain->hourly_rate ? '$' . number_format($captain->hourly_rate, 0) . '/hr' : '—',
                'availability' => 'Available',
                'photo'        => $captain->photo_path ? Storage::url($captain->photo_path) : null,
                'is_verified'  => $captain->is_verified,
            ]);

        if (! $request->user()->hasRole('admin') && $captain->status !== 'approved') {
            abort(404);
        }

        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();

        $vesselIds = $owner
            ? Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->pluck('id')
            : collect();

       

            $invitations = $owner
                ? OwnerCaptainInvitation::where('owner_id', $owner->id)
                ->get()
                ->groupBy('captain_id')
                ->map(fn($group) => $group->mapWithKeys(fn($invitation) => [
                    $invitation->vessel_id => [
                        'status' => $invitation->status,
                        'initiated_by' => $invitation->initiated_by,
                    ]
                ])->toArray())
                ->toArray()
                : [];
      
        $acceptedCaptainIds = $owner
            ? OwnerCaptainInvitation::where('owner_id', $owner->id)
            ->where('status', 'accepted')
            ->get()
            ->groupBy('captain_id')
            ->map(fn($group) => $group->pluck('vessel_id')->unique()->values()->toArray())
            ->toArray()
            : [];

    
        $interestedCaptainIds = $owner
            ? OwnerCaptainInvitation::whereIn('vessel_id', $vesselIds)
            ->whereIn('status', ['pending', 'accepted'])
            ->pluck('captain_id')
            ->unique()
            ->values()
            ->toArray()
            : [];

        return Inertia::render('captains', [
            'captains'               => $captains,
            'filters'                => $request->only(['license_type', 'min_experience']),
            'vessels'                => $owner
                ? Vessel::where('owner_id', $owner->id)
                ->whereNull('deleted_at')
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn($v) => ['value' => $v->id, 'label' => $v->name])
                : [],
            'invitations'            => $invitations,
            'acceptedCaptainIds'     => $acceptedCaptainIds,
            'acceptedViaInterestIds' => [], 
            'interestedCaptainIds'   => $interestedCaptainIds,
        ]);
    }

    public function show(CaptainProfile $captain)
    {
        $captain->load('user');
        
        return Inertia::render('admin/captains/show', [
            'captain' => [
                'id' => $captain->id,
                'user_id' => $captain->user_id,
                'full_name' => $captain->full_name,
                'phone' => $captain->phone,
                'email' => $captain->user->email,
                'address' => $captain->address,
                'city' => $captain->city,
                'state' => $captain->state,
                'zip_code' => $captain->zip_code,
                'license_type' => $captain->license_type,
                'endorsement' => $captain->endorsement,
                'tonnage_rating' => $captain->tonnage_rating,
                'years_experience' => $captain->years_experience,
                'hourly_rate' => $captain->hourly_rate,
                'status' => $captain->status ?? 'pending',
                'is_verified' => $captain->is_verified,
                'resume_path' => $captain->resume_path,
                'license_doc_path' => $captain->license_doc_path,
                'photo_path' => $captain->photo_path,
                'created_at' => $captain->created_at,
                'updated_at' => $captain->updated_at,
            ],
        ]);
    }

    public function approve(CaptainProfile $captain)
    {
        $captain->update(['status' => 'approved']);
        
        return back()->with('success', 'Captain approved successfully');
    }

    public function reject(CaptainProfile $captain)
    {
        $captain->update(['status' => 'rejected']);
        
        return back()->with('success', 'Captain rejected');
    }

    public function acceptRequest(Request $request, CaptainProfile $captain)
{
    $owner = OwnerProfile::where('user_id', $request->user()->id)->first();
    
    if (!$owner) {
        return back()->with('error', 'Owner profile not found.');
    }


    $invitations = OwnerCaptainInvitation::where('owner_id', $owner->id)
        ->where('captain_id', $captain->id)
        ->where('status', 'pending')
        ->where('initiated_by', 'captain')
        ->get();

  
    foreach ($invitations as $invitation) {
        $invitation->update(['status' => 'accepted']);
    }

    return back()->with('success', 'Captain request accepted successfully.');
}



    public function showProfile(CaptainProfile $captain)
    {
        $captain->load('user');
        
        return Inertia::render('admin/captains/[id]/profile', [
            'captain' => [
                'id' => $captain->id,
                'user_id' => $captain->user_id,
                'full_name' => $captain->full_name,
                'email' => $captain->user?->email ?? 'No email',
                'phone' => $captain->phone,
                'address' => $captain->address,
                'city' => $captain->city,
                'state' => $captain->state,
                'zip_code' => $captain->zip_code,
                'license_type' => $captain->license_type,
                'endorsement' => $captain->endorsement,
                'tonnage_rating' => $captain->tonnage_rating,
                'years_experience' => $captain->years_experience,
                'boats_worked_on' => $captain->boats_worked_on,
                'bodies_of_water' => $captain->bodies_of_water,
                'geographic_area' => $captain->geographic_area,
                'hourly_rate' => $captain->hourly_rate,
                'status' => $captain->status,
                'is_verified' => $captain->is_verified,
                'created_at' => $captain->created_at,
                'updated_at' => $captain->updated_at,
                
                // FIX: Use asset() to generate the full public URL for storage files
                'resume_path' => $captain->resume_path ? asset('storage/' . $captain->resume_path) : null,
                'license_doc_path' => $captain->license_doc_path ? asset('storage/' . $captain->license_doc_path) : null,
                'photo_path' => $captain->photo_path ? asset('storage/' . $captain->photo_path) : null,
            ],
        ]);
    }
}
