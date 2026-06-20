<?php

namespace App\Http\Controllers;

use App\Models\ChartererProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class ChartererProfileController extends Controller
{
    public function show(User $charterer): Response
    {
        $charterer->load('chartererProfile');
        
        $chartererProfile = $charterer->chartererProfile ?? new ChartererProfile();
        
        // Get total charters count
        $totalCharters = $charterer->chartererProfile 
            ? $charterer->chartererProfile->charters()->where('end_date', '<', now())->count()
            : 0;
        
        return Inertia::render('admin/charterers/[id]/profile', [
            'user' => [
                'id' => $charterer->id,
                'name' => $charterer->name,
                'email' => $charterer->email,
                'status' => $charterer->status ?? 'Active',
                'created_at' => $charterer->created_at,
            ],
            'chartererProfile' => [
                'id' => $chartererProfile->id,
                'full_name' => $chartererProfile->full_name ?? $charterer->name,
                'phone' => $chartererProfile->phone,
                'address' => $chartererProfile->address,
                'city' => $chartererProfile->city,
                'state' => $chartererProfile->state,
                'zip' => $chartererProfile->zip,
                'country' => $chartererProfile->country,
                'date_of_birth' => $chartererProfile->date_of_birth ? $chartererProfile->date_of_birth->format('Y-m-d') : null,
                'total_charters' => $totalCharters,
            ],
        ]);
    }

    public function update(Request $request, User $charterer)
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
            
            // Account Information
            'email' => 'required|email|unique:users,email,' . $charterer->id,
            'password' => 'nullable|min:8|confirmed',
            'status' => 'required|in:Active,Suspended,Pending Review',
        ]);

        // Update user account
        $charterer->email = $validated['email'];
        $charterer->status = $validated['status'];
        
        if (!empty($validated['password'])) {
            $charterer->password = Hash::make($validated['password']);
        }
        
        $charterer->save();

        // Update or create charterer profile
        ChartererProfile::updateOrCreate(
            ['user_id' => $charterer->id],
            [
                'full_name' => $validated['full_name'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'zip' => $validated['zip'],
                'country' => $validated['country'],
                'date_of_birth' => $validated['date_of_birth'] ?: null,
            ]
        );

        return redirect()->back();
    }
}