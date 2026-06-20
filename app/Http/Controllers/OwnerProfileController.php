<?php

namespace App\Http\Controllers;

use App\Models\OwnerProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class OwnerProfileController extends Controller
{
    public function show(User $owner): Response
    {
        $owner->load('ownerProfile.vessels');
        
        $ownerProfile = $owner->ownerProfile ?? new OwnerProfile();
        
        return Inertia::render('admin/owners/[id]/profile', [
            'user' => [
                'id' => $owner->id,
                'name' => $owner->name,
                'email' => $owner->email,
                'status' => $owner->status ?? 'Active',
                'created_at' => $owner->created_at,
            ],
            'ownerProfile' => [
                'id' => $ownerProfile->id,
                'full_name' => $ownerProfile->full_name ?? $owner->name,
                'phone' => $ownerProfile->phone,
                'address' => $ownerProfile->address,
                'city' => $ownerProfile->city,
                'state' => $ownerProfile->state,
                'zip' => $ownerProfile->zip,
                'country' => $ownerProfile->country,
                'date_of_birth' => $ownerProfile->date_of_birth ? $ownerProfile->date_of_birth->format('Y-m-d') : null,
                'marina_name' => $ownerProfile->marina_name,
                'marina_city' => $ownerProfile->marina_city,
                'marina_state' => $ownerProfile->marina_state,
                'photo_path' => $ownerProfile->photo_path,
                'vessels_count' => $owner->ownerProfile ? $owner->ownerProfile->vessels()->count() : 0,
            ],
        ]);
    }

    public function update(Request $request, User $owner)
    {
        $validated = $request->validate([
            // Personal Information
            'full_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            
            // Marina Information
            'marina_name' => 'nullable|string|max:255',
            'marina_city' => 'nullable|string|max:100',
            'marina_state' => 'nullable|string|max:100',
            
            // Account Information
            'email' => 'required|email|unique:users,email,' . $owner->id,
            'password' => 'nullable|min:8|confirmed',
            'status' => 'required|in:Active,Suspended,Pending Review',
        ]);

        // Update user account
        $owner->email = $validated['email'];
        $owner->status = $validated['status'];
        
        if (!empty($validated['password'])) {
            $owner->password = Hash::make($validated['password']);
        }
        
        $owner->save();

        // Update or create owner profile
        OwnerProfile::updateOrCreate(
            ['user_id' => $owner->id],
            [
                'full_name' => $validated['full_name'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'zip' => $validated['zip'],
                'country' => $validated['country'],
                'date_of_birth' => $validated['date_of_birth'] ?: null,
                'marina_name' => $validated['marina_name'],
                'marina_city' => $validated['marina_city'],
                'marina_state' => $validated['marina_state'],
            ]
        );

        return redirect()->back();
    }
}