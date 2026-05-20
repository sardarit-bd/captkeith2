<?php

namespace App\Http\Controllers;

use App\Models\CaptainVesselInterest;
use App\Models\DeckhandVesselInterest;
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
        $user        = $request->user();
        $isCaptain   = $user->hasRole('captain');
        $isDeckhand  = $user->hasRole('deckhand');
        $profile     = $isCaptain ? $user->captainProfile : $user->deckhandProfile;

        if (! $profile) {
            return Inertia::render('yachts-match', [
                'vessels'          => [],
                'profileMissing'   => true,
                'interestStatuses' => [],
            ]);
        }

        $query = Vessel::query()
            ->with([
                'photos' => fn($q) => $q->orderBy('display_order'),
                'owner',
            ])
            ->where('is_active', true)
            ->whereNull('deleted_at');


        if ($isCaptain) {
            if ($profile->license_type !== null) {
                $query->where('required_license_type', $profile->license_type);
            }

            if ($profile->endorsement !== null) {
                $query->where('required_endorsement', $profile->endorsement);
            }

            if ($profile->tonnage_rating !== null) {
                $query->where(function ($q) use ($profile) {
                    $q->whereNull('required_tonnage_rating')
                        ->orWhere('required_tonnage_rating', '<=', $profile->tonnage_rating);
                });
            }

            if ($profile->years_experience !== null) {
                $query->where(function ($q) use ($profile) {
                    $q->whereNull('required_years_experience')
                        ->orWhere('required_years_experience', '<=', $profile->years_experience);
                });
            }
        }

        $vessels = $query
            ->latest()
            ->get()
            ->map(function (Vessel $vessel) {
                $photo          = $vessel->photos->first();
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
                    'type'           => ucfirst($vessel->vessel_type ?? ''),
                    'length'         => $vessel->length_ft ? $vessel->length_ft . ' ft' : null,
                    'marina'         => $vessel->marina_name,
                    'city'           => $vessel->marina_city,
                    'state'          => $vessel->marina_state,
                    'operatingArea'  => $vessel->operating_area,
                    'qualifications' => $qualifications,
                    'image'          => $photo?->image_path
                        ? Storage::url($photo->image_path)
                        : null,
                    'ownerUserId'    => $vessel->owner?->user_id, // add this
                ];
            });


        $interestStatuses = [];

        if ($isCaptain && $user->captainProfile) {
            $interestStatuses = CaptainVesselInterest::where('captain_id', $user->captainProfile->id)
                ->pluck('status', 'vessel_id')
                ->toArray();
        } elseif ($isDeckhand && $user->deckhandProfile) {
            $interestStatuses = DeckhandVesselInterest::where('deckhand_id', $user->deckhandProfile->id)
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
