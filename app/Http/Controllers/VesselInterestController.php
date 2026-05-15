<?php

namespace App\Http\Controllers;

use App\Models\CaptainVesselInterest;
use App\Models\Vessel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VesselInterestController extends Controller
{

    public function store(Request $request, Vessel $vessel): RedirectResponse
    {
        $captainProfile = $request->user()->captainProfile;

        abort_if($captainProfile === null, 403, 'No captain profile found.');


        CaptainVesselInterest::firstOrCreate([
            'captain_id' => $captainProfile->id,
            'vessel_id'  => $vessel->id,
        ]);

        return back()->with('success', 'Interest sent to the owner.');
    }


    public function destroy(Request $request, Vessel $vessel): RedirectResponse
    {
        $captainProfile = $request->user()->captainProfile;

        abort_if($captainProfile === null, 403, 'No captain profile found.');

        CaptainVesselInterest::where('captain_id', $captainProfile->id)
            ->where('vessel_id', $vessel->id)
            ->delete();

        return back()->with('success', 'Interest withdrawn.');
    }
}
