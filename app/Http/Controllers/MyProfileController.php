<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\VesselMatchingService;

class MyProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();

        if ($user->hasRole('owner')) {
            $profile = $user->ownerProfile;

            return Inertia::render('my-profile', [
                'profile' => $profile ? [
                    'full_name'    => $profile->full_name,
                    'phone'        => $profile->phone,
                    'company_name' => $profile->company_name,
                    'bio'          => $profile->bio,
                    'photo_url'    => $profile->avatar_path
                        ? Storage::url($profile->avatar_path)
                        : null,
                ] : null,
            ]);
        }

        if ($user->hasRole('deckhand')) {
            $profile = $user->deckhandProfile;

            return Inertia::render('my-profile', [
                'profile' => $profile ? [
                    'full_name'                 => $profile->full_name,
                    'phone'                     => $profile->phone,
                    'address'                   => $profile->address,
                    'city'                      => $profile->city,
                    'state'                     => $profile->state,
                    'zip_code'                  => $profile->zip_code,
                    'travel_radius_miles'       => $profile->travel_radius_miles,
                    'years_experience'          => $profile->years_experience,
                    'has_server_experience'     => $profile->has_server_experience,
                    'has_bartending_experience' => $profile->has_bartending_experience,
                    'hourly_rate'               => $profile->hourly_rate,
                    'photo_url'                 => $profile->photo_path
                        ? Storage::url($profile->photo_path)
                        : null,
                    'resume_url'                => $profile->resume_path
                        ? Storage::url($profile->resume_path)
                        : null,
                ] : null,
            ]);
        }

        // captain (default)
        $profile = $user->captainProfile;

        return Inertia::render('my-profile', [
            'profile' => $profile ? [
                'full_name'            => $profile->full_name,
                'phone'                => $profile->phone,
                'address'              => $profile->address,
                'city'                 => $profile->city,
                'state'                => $profile->state,
                'zip_code'             => $profile->zip_code,
                'travel_radius_miles'  => $profile->travel_radius_miles,
                'license_type'         => $profile->license_type,
                'endorsement'          => $profile->endorsement,
                'tonnage_rating'       => $profile->tonnage_rating,
                'years_experience'     => $profile->years_experience,
                'boats_worked_on'      => $profile->boats_worked_on,
                'bodies_of_water'      => $profile->bodies_of_water,
                'geographic_area'      => $profile->geographic_area,
                'hourly_rate'          => $profile->hourly_rate,
                'can_provide_deckhand' => $profile->can_provide_deckhand,
                'deckhand_hourly_rate' => $profile->deckhand_hourly_rate,
                'photo_url'            => $profile->photo_path
                    ? Storage::url($profile->photo_path)
                    : null,
                'resume_url'           => $profile->resume_path
                    ? Storage::url($profile->resume_path)
                    : null,
                'license_doc_url'      => $profile->license_doc_path
                    ? Storage::url($profile->license_doc_path)
                    : null,
            ] : null,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasRole('owner')) {
            $validated = $request->validate([
                'full_name'    => ['required', 'string', 'max:150'],
                'phone' => ['required', 'string', 'max:20'],
                'company_name' => ['nullable', 'string', 'max:150'],
                'bio'          => ['nullable', 'string', 'max:1000'],
                'photo'        => ['nullable', 'image', 'max:5120'],
            ]);

            $profile = $user->ownerProfile()->firstOrNew(['user_id' => $user->id]);

            if ($request->hasFile('photo')) {
                if ($profile->avatar_path) {
                    Storage::disk('public')->delete($profile->avatar_path);
                }
                $validated['avatar_path'] = $request->file('photo')
                    ->store('owner-photos', 'public');
            }

            unset($validated['photo']);

            $profile->fill($validated);
            $profile->user_id = $user->id;
            $profile->save();

            session()->flash('toast', ['type' => 'success', 'message' => 'Profile updated successfully.']);

            return to_route('my-profile');
        }

        if ($user->hasRole('deckhand')) {
            $validated = $request->validate([
                'full_name'                 => ['required', 'string', 'max:150'],
                'phone'                     => ['required', 'string', 'max:20'],
                'address'                   => ['required', 'string', 'max:255'],
                'city'                      => ['required', 'string', 'max:100'],
                'state'                     => ['required', 'string', 'max:50'],
                'zip_code'                  => ['required', 'string', 'max:10'],
                'travel_radius_miles'       => ['required', 'integer', 'min:1'],
                'years_experience'          => ['required', 'numeric', 'min:0'],
                'has_server_experience'     => ['boolean'],
                'has_bartending_experience' => ['boolean'],
                'hourly_rate'               => ['required', 'numeric', 'min:0'],
                'photo'                     => ['nullable', 'image', 'max:2048'],
                'resume'                    => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            ]);

            $profile = $user->deckhandProfile()->firstOrNew(['user_id' => $user->id]);

            if ($request->hasFile('photo')) {
                if ($profile->photo_path) {
                    Storage::disk('public')->delete($profile->photo_path);
                }
                $validated['photo_path'] = $request->file('photo')
                    ->store('deckhand-photos', 'public');
            }

            if ($request->hasFile('resume')) {
                if ($profile->resume_path) {
                    Storage::disk('public')->delete($profile->resume_path);
                }
                $validated['resume_path'] = $request->file('resume')
                    ->store('deckhand-resumes', 'public');
            }

            unset($validated['photo'], $validated['resume']);

            $profile->fill($validated);
            $profile->user_id = $user->id;
            $profile->save();

            session()->flash('toast', ['type' => 'success', 'message' => 'Profile updated successfully.']);

            return to_route('my-profile');
        }

        $validated = $request->validate([
            'full_name'            => ['required', 'string', 'max:150'],
            'phone'                => ['required', 'string', 'max:20'],
            'address'              => ['required', 'string', 'max:255'],
            'city'                 => ['required', 'string', 'max:100'],
            'state'                => ['required', 'string', 'max:50'],
            'zip_code'             => ['required', 'string', 'max:10'],
            'travel_radius_miles'  => ['required', 'integer', 'min:1'],
            'license_type'         => ['required', 'in:oupv,masters'],
            'endorsement'          => ['required', 'in:inland,near_coastal,unlimited'],
            'tonnage_rating'       => ['required', 'integer', 'min:1'],
            'years_experience'     => ['required', 'integer', 'min:0'],
            'boats_worked_on'      => ['nullable', 'string'],
            'bodies_of_water'      => ['nullable', 'string'],
            'geographic_area'      => ['nullable', 'string'],
            'hourly_rate'          => ['required', 'numeric', 'min:0'],
            'can_provide_deckhand' => ['boolean'],
            'deckhand_hourly_rate' => ['nullable', 'numeric', 'min:0'],
            'photo'                => ['nullable', 'image', 'max:5120'],
            'resume'               => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
            'license_doc'          => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ]);

        $profile = $user->captainProfile()->firstOrNew(['user_id' => $user->id]);

        if ($request->hasFile('photo')) {
            if ($profile->photo_path) {
                Storage::disk('public')->delete($profile->photo_path);
            }
            $validated['photo_path'] = $request->file('photo')
                ->store('captain-photos', 'public');
        }

        if ($request->hasFile('resume')) {
            if ($profile->resume_path) {
                Storage::disk('public')->delete($profile->resume_path);
            }
            $validated['resume_path'] = $request->file('resume')
                ->store('captain-resumes', 'public');
        }

        if ($request->hasFile('license_doc')) {
            if ($profile->license_doc_path) {
                Storage::disk('public')->delete($profile->license_doc_path);
            }
            $validated['license_doc_path'] = $request->file('license_doc')
                ->store('captain-licenses', 'public');
        }

        unset($validated['photo'], $validated['resume'], $validated['license_doc']);

        $profile->fill($validated);
        $profile->user_id = $user->id;
        $profile->save();
        (new VesselMatchingService())->matchForCaptain($profile);
        session()->flash('toast', ['type' => 'success', 'message' => 'Profile updated successfully.']);

        return to_route('my-profile');
    }



    public function requestApproval(Request $request): RedirectResponse
{
    $user = $request->user();

    if ($user->hasRole('captain')) {
        $profile = $user->captainProfile;
        if (!$profile) {
            return back()->with('toast', ['type' => 'error', 'message' => 'Please create your profile first.']);
        }
  
        // Check if all required fields are filled based on your validation rules
        $requiredFields = [
            'full_name', 'phone', 'address', 'city', 'state', 'zip_code', 
            'travel_radius_miles', 'license_type', 'endorsement', "is_verified",
            'tonnage_rating', 'years_experience', 'hourly_rate'
        ];

        // foreach ($requiredFields as $field) {
        //     if (empty($profile->$field)) {
        //         return back()->with('error', 'Please fill in all required profile fields before requesting approval.');
        //     }
        // }
        // dd($profile);
        $uss = $profile->update(['is_verified' => 'pending']);
        // dd($uss);
    } elseif ($user->hasRole('deckhand')) {
        $profile = $user->deckhandProfile;
        if (!$profile) {
            return back()->with('toast', ['type' => 'error', 'message' => 'Please create your profile first.']);
        }

        $requiredFields = [
            'full_name', 'phone', 'address', 'city', 'state', 'zip_code', 
            'travel_radius_miles', 'years_experience', 'hourly_rate'
        ];

        foreach ($requiredFields as $field) {
            if (empty($profile->$field)) {
                return back()->with('toast', ['type' => 'error', 'message' => 'Please fill in all required profile fields before requesting approval.']);
            }
        }

        $profile->update(['status' => 'pending']);
        
    } else {
        return back()->with('toast', ['type' => 'error', 'message' => 'Invalid role for approval.']);
    }

    return back()->with('toast', ['type' => 'success', 'message' => 'Your approval request has been sent to the admin.']);
}
}
