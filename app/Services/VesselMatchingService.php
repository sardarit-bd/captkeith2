<?php

namespace App\Services;

use App\Models\CaptainProfile;
use App\Models\Vessel;
use App\Models\VesselMatch;
use Illuminate\Database\Eloquent\Collection;

class VesselMatchingService
{
    public function matchForVessel(Vessel $vessel): void
    {
        $captains = $this->getQualifiedCaptains($vessel);

        foreach ($captains as $captain) {
            VesselMatch::updateOrCreate(
                [
                    'vessel_id'    => $vessel->id,
                    'profile_id'   => $captain->id,
                    'profile_type' => 'captain',
                ],
                [
                    'match_score'      => $this->calculateScore($vessel, $captain),
                    'match_reasons'    => $this->calculateReasons($vessel, $captain),
                    'owner_notified'   => false,
                    'profile_notified' => false,
                ]
            );
        }

        VesselMatch::where('vessel_id', $vessel->id)
            ->where('profile_type', 'captain')
            ->whereNotIn('profile_id', $captains->pluck('id')->toArray())
            ->delete();
    }

    public function matchForCaptain(CaptainProfile $captain): void
    {
        $vessels = Vessel::query()
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->get();

        foreach ($vessels as $vessel) {
            if ($this->captainQualifiesForVessel($captain, $vessel)) {
                VesselMatch::updateOrCreate(
                    [
                        'vessel_id'    => $vessel->id,
                        'profile_id'   => $captain->id,
                        'profile_type' => 'captain',
                    ],
                    [
                        'match_score'      => $this->calculateScore($vessel, $captain),
                        'match_reasons'    => $this->calculateReasons($vessel, $captain),
                        'owner_notified'   => false,
                        'profile_notified' => false,
                    ]
                );
            } else {
                VesselMatch::where('vessel_id', $vessel->id)
                    ->where('profile_id', $captain->id)
                    ->where('profile_type', 'captain')
                    ->delete();
            }
        }
    }

    private function getQualifiedCaptains(Vessel $vessel): Collection
    {
        $query = CaptainProfile::query()->whereNull('deleted_at');

        // License Type Matching
        if ($vessel->required_license_type === 'oupv') {
            $query->whereIn('license_type', ['oupv', 'masters']);
        } elseif ($vessel->required_license_type === 'masters') {
            $query->where('license_type', 'masters');
        }

        // Years of Experience (YOE) Matching
        if ($vessel->required_years_experience) {
            $query->where('years_experience', '>=', $vessel->required_years_experience);
        }

        // Skipping endorsement and tonnage checks as requested

        return $query->get();
    }

    private function captainQualifiesForVessel(CaptainProfile $captain, Vessel $vessel): bool
    {
     
        if ($vessel->required_license_type === 'masters' && $captain->license_type !== 'masters') {
            return false;
        }
        if ($vessel->required_license_type === 'oupv' && !in_array($captain->license_type, ['oupv', 'masters'])) {
            return false;
        }


        if ($vessel->required_years_experience && $captain->years_experience < $vessel->required_years_experience) {
            return false;
        }



        return true;
    }

    private function calculateScore(Vessel $vessel, CaptainProfile $captain): int
    {
        $score = 0;
        

        if ($captain->license_type === $vessel->required_license_type) $score += 40;
        elseif ($captain->license_type === 'masters') $score += 30;
        

        if ($captain->years_experience >= ($vessel->required_years_experience ?? 0)) $score += 15;
        
        return min($score, 100);
    }

    /** @return string[] */
    private function calculateReasons(Vessel $vessel, CaptainProfile $captain): array
    {
        $reasons = [];
        
        if ($captain->license_type) $reasons[] = 'license_match';
        if ($captain->years_experience >= ($vessel->required_years_experience ?? 0)) $reasons[] = 'experience_match';
        
        return $reasons;
    }
}
