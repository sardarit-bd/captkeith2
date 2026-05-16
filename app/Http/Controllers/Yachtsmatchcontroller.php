<?php

namespace App\Http\Controllers;

use App\Models\CaptainVesselInterest;
use App\Models\User;
use App\Models\Vessel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class YachtsMatchController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user    = $request->user();
        $profile = $user->captainProfile ?? $user->deckhandProfile;

        if (! $profile) {
            return Inertia::render('yachts-match', [
                'vessels'             => [],
                'profileMissing'      => true,
                'interestedVesselIds' => [],
            ]);
        }

        $vessels = Vessel::query()
            ->with(['photos' => fn($q) => $q->orderBy('display_order')])
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->where('required_license_type', $profile->license_type)
            ->where('required_endorsement', $profile->endorsement)
            ->where('required_tonnage_rating', '<=', $profile->tonnage_rating)
            ->where('required_years_experience', '<=', $profile->years_experience)
            ->latest()
            ->get()
            ->map(function (Vessel $vessel) {
                $photo = $vessel->photos->first();

                $qualifications = [];

                $licenseLabels = [
                    'oupv'    => 'OUPV (Six-Pack)',
                    'masters' => 'Master License',
                ];
                if ($vessel->required_license_type) {
                    $qualifications[] = $licenseLabels[$vessel->required_license_type]
                        ?? $vessel->required_license_type;
                }

                $endorsementLabels = [
                    'inland'       => 'Inland Waters',
                    'near_coastal' => 'Near Coastal',
                    'unlimited'    => 'Unlimited',
                ];
                if ($vessel->required_endorsement) {
                    $qualifications[] = $endorsementLabels[$vessel->required_endorsement]
                        ?? $vessel->required_endorsement;
                }

                if ($vessel->required_tonnage_rating) {
                    $qualifications[] = $vessel->required_tonnage_rating . ' Ton Rating';
                }

                if ($vessel->required_years_experience) {
                    $qualifications[] = $vessel->required_years_experience . '+ Years Experience';
                }

                return [
                    'id'             => $vessel->id,
                    'name'           => $vessel->name,
                    'registrationNo' => $vessel->official_number,
                    'type'           => ucfirst($vessel->vessel_type),
                    'length'         => $vessel->length_ft . ' ft',
                    'marina'         => $vessel->marina_name,
                    'city'           => $vessel->marina_city,
                    'state'          => $vessel->marina_state,
                    'operatingArea'  => $vessel->operating_area,
                    'qualifications' => $qualifications,
                    'image'          => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                ];
            });

        $interestStatuses = [];
        if ($user->captainProfile) {
            $interestStatuses = CaptainVesselInterest::where('captain_id', $user->captainProfile->id)
                ->pluck('status', 'vessel_id')
                ->toArray();
        }

        return Inertia::render('yachts-match', [
            'vessels'          => $vessels,
            'profileMissing'   => false,
            'interestStatuses' => $interestStatuses,
        ]);
    }
}
