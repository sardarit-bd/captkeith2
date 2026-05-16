<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use App\Models\OwnerCaptainInvitation;
use App\Models\OwnerProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OwnerCaptainInvitationController extends Controller
{
    public function store(Request $request, CaptainProfile $captain): RedirectResponse
    {
        $validated = $request->validate([
            'vessel_id' => ['required', 'uuid', 'exists:vessels,id'],
        ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();


        abort_unless(
            $owner->vessels()->where('id', $validated['vessel_id'])->exists(),
            403
        );

        OwnerCaptainInvitation::firstOrCreate(
            [
                'owner_id'   => $owner->id,
                'captain_id' => $captain->id,
                'vessel_id'  => $validated['vessel_id'],
            ],
            ['status' => 'pending']
        );

        return back()->with('success', 'Invitation sent.');
    }

    public function destroy(Request $request, CaptainProfile $captain): RedirectResponse
    {
        $validated = $request->validate([
            'vessel_id' => ['required', 'uuid', 'exists:vessels,id'],
        ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();

        OwnerCaptainInvitation::where('owner_id', $owner->id)
            ->where('captain_id', $captain->id)
            ->where('vessel_id', $validated['vessel_id'])
            ->where('status', 'pending')
            ->delete();

        return back()->with('success', 'Invitation cancelled.');
    }
}
