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
        
        $yachts = $owner->ownerProfile ? $owner->ownerProfile->vessels->map(function ($vessel) {
            return [
                'id' => $vessel->id,
                'name' => $vessel->name,
                'make' => $vessel->make,
                'model' => $vessel->model,
                'length_ft' => $vessel->length_ft,
                'vessel_type' => $vessel->vessel_type,
                'status' => $vessel->status,
                'marina_name' => $vessel->marina_name,
            ];
        })->toArray() : [];

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
                // FIX: Use Carbon::parse to safely handle string dates from the DB
                'date_of_birth' => $ownerProfile->date_of_birth ? \Carbon\Carbon::parse($ownerProfile->date_of_birth)->format('Y-m-d') : null,
                'marina_name' => $ownerProfile->marina_name,
                'marina_city' => $ownerProfile->marina_city,
                'marina_state' => $ownerProfile->marina_state,
                'photo_path' => $ownerProfile->photo_path,
                'vessels_count' => $owner->ownerProfile ? $owner->ownerProfile->vessels()->count() : 0,
            ],
            'yachts' => $yachts,
        ]);
    }

    public function update(Request $request, User $owner)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'marina_name' => 'nullable|string|max:255',
            'marina_city' => 'nullable|string|max:100',
            'marina_state' => 'nullable|string|max:100',
            'email' => 'required|email|unique:users,email,' . $owner->id,
            'password' => 'nullable|min:8|confirmed',
            'status' => 'required|in:Active,Suspended,Pending Review',
        ]);

        $owner->email = $validated['email'];
        $owner->status = $validated['status'];
        
        if (!empty($validated['password'])) {
            $owner->password = Hash::make($validated['password']);
        }
        
        $owner->save();

        OwnerProfile::updateOrCreate(
            ['user_id' => $owner->id],
            [
                'full_name' => $validated['full_name'],
                'phone' => $validated['phone'] ?? null,
                'address' => $validated['address'] ?? null,
                'city' => $validated['city'] ?? null,
                'state' => $validated['state'] ?? null,
                'zip' => $validated['zip'] ?? null,
                'country' => $validated['country'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
                'marina_name' => $validated['marina_name'] ?? null,
                'marina_city' => $validated['marina_city'] ?? null,
                'marina_state' => $validated['marina_state'] ?? null,
            ]
        );

        return redirect()->back();
    }
}