<?php

namespace App\Http\Controllers;

use App\Models\CaptainVesselInterest;
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

            CaptainVesselInterest::firstOrCreate([
                'captain_id' => $profile->id,
                'vessel_id'  => $vessel->id,
            ]);
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

            CaptainVesselInterest::where('captain_id', $profile->id)
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
