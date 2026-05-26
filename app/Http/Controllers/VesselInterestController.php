<?php

namespace App\Http\Controllers;

use App\Models\OwnerCaptainInvitation;
use App\Models\DeckhandVesselInterest;
use App\Models\Vessel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VesselInterestController extends Controller
{
    public function store(Request $request, Vessel $vessel): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasRole('captain')) {
            $profile = $user->captainProfile;
            abort_if($profile === null, 403, 'No captain profile found.');

            OwnerCaptainInvitation::firstOrCreate(
                [
                    'owner_id'   => $vessel->owner_id,
                    'captain_id' => $profile->id,
                    'vessel_id'  => $vessel->id,
                ],
                [
                    'status'       => 'pending',
                    'initiated_by' => 'captain',
                ]
            );
        } else {
            $profile = $user->deckhandProfile;
            abort_if($profile === null, 403, 'No deckhand profile found.');

            DeckhandVesselInterest::firstOrCreate([
                'deckhand_id' => $profile->id,
                'vessel_id'   => $vessel->id,
            ]);
        }

        return back()->with('success', 'Interest sent to the owner.');
    }

    public function destroy(Request $request, Vessel $vessel): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasRole('captain')) {
            $profile = $user->captainProfile;
            abort_if($profile === null, 403, 'No captain profile found.');

            OwnerCaptainInvitation::where('owner_id', $vessel->owner_id)
                ->where('captain_id', $profile->id)
                ->where('vessel_id', $vessel->id)
                ->delete();
        } else {
            $profile = $user->deckhandProfile;
            abort_if($profile === null, 403, 'No deckhand profile found.');

            DeckhandVesselInterest::where('deckhand_id', $profile->id)
                ->where('vessel_id', $vessel->id)
                ->delete();
        }

        return back()->with('success', 'Interest withdrawn.');
    }
}
