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
use App\Models\User;

class CaptainController extends Controller
{
    public function index(Request $request): Response
    {
        $query = CaptainProfile::query()
            ->where('status', 'approved')
            ->whereNull('deleted_at')
            ->with('user');
        // dd($query);
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
                'status'       => $captain->status,
            ]);

        // if (! $request->user()->hasRole('admin') && $captain->status !== 'approved') {
        //     abort(404);
        // }
        // dd($captains);
        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();

        $vesselIds = $owner
            ? Vessel::where('owner_id', $owner->id)
            ->whereNull('deleted_at')
            ->where('status', "approved")
            ->pluck('id')
            : collect();

    //    dd($vesselIds);

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
                ->where('status', 'approved')
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

    public function profile(string $id)
    {
        $captain = CaptainProfile::with('user')->findOrFail($id);
        
        return Inertia::render('admin/captains/[id]/profile', [
            'captain' => $captain,
        ]);
    }

    public function showProfile(User $captain)
    {
        $captainProfile = CaptainProfile::where('user_id', $captain->id)->firstOrFail();
        $captainProfile->load('user');
        
        return Inertia::render('admin/captains/[id]/profile', [
            'captain' => [
                'id' => $captainProfile->id,
                'user_id' => $captainProfile->user_id,
                'full_name' => $captainProfile->full_name,
                'email' => $captainProfile->user?->email ?? 'No email',
                'phone' => $captainProfile->phone,
                'address' => $captainProfile->address,
                'city' => $captainProfile->city,
                'state' => $captainProfile->state,
                'zip_code' => $captainProfile->zip_code,
                'license_type' => $captainProfile->license_type,
                'endorsement' => $captainProfile->endorsement,
                'tonnage_rating' => $captainProfile->tonnage_rating,
                'years_experience' => $captainProfile->years_experience,
                'boats_worked_on' => $captainProfile->boats_worked_on,
                'bodies_of_water' => $captainProfile->bodies_of_water,
                'geographic_area' => $captainProfile->geographic_area,
                'hourly_rate' => $captainProfile->hourly_rate,
                'status' => $captainProfile->status,
                'is_verified' => $captainProfile->is_verified,
                'created_at' => $captainProfile->created_at,
                'updated_at' => $captainProfile->updated_at,
                
                'resume_path' => $captainProfile->resume_path ? asset('storage/' . $captainProfile->resume_path) : null,
                'license_doc_path' => $captainProfile->license_doc_path ? asset('storage/' . $captainProfile->license_doc_path) : null,
                'photo_path' => $captainProfile->photo_path ? asset('storage/' . $captainProfile->photo_path) : null,
            ],
        ]);
    }



    public function apply(CaptainProfile $captain){

    }
}
