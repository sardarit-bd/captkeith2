<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\CharterEvent;
use App\Models\OwnerProfile;
use App\Models\User;
use App\Models\Vessel;
use App\Models\VesselMatch;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;
use Illuminate\Support\Facades\Storage;

class OwnerDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;

    public function supports(User $user): bool
    {
        return $user->hasRole('owner');
    }

    public function resolve(User $user): DashboardViewData
    {
        $this->ensurePermission($user, 'dashboard.owner.view');

        /** @var OwnerProfile|null $ownerProfile */
        $ownerProfile = OwnerProfile::where('user_id', $user->id)->first();

        if (! $ownerProfile) {
            return new DashboardViewData('dashboard', [
                'dashboard' => [
                    'role' => 'owner',
                    'stats' => [
                        'total_vessels' => 0,
                        'approved_captains' => 0,
                        'active_charters' => 0,
                        'pending_requests' => 0,
                    ],
                    'recent_vessels' => [],
                    'captain_matches' => [],
                ],
            ]);
        }


        $vesselIds = Vessel::where('owner_id', $ownerProfile->id)
            ->whereNull('deleted_at')
            ->pluck('id');

        $totalVessels = $vesselIds->count();

        $approvedCaptains = \App\Models\VesselQualifiedCaptain::whereIn('vessel_id', $vesselIds)
            ->distinct('captain_id')
            ->count('captain_id');

        $activeCharters = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->where('status', 'confirmed')
            ->count();

        $pendingRequests = CharterEvent::whereIn('vessel_id', $vesselIds)
            ->where('status', 'pending')
            ->count();


        $recentVessels = Vessel::where('owner_id', $ownerProfile->id)
            ->whereNull('deleted_at')
            ->with(['photos' => fn($q) => $q->orderBy('display_order')->limit(1)])
            ->latest()
            ->limit(5)
            ->get()
            ->map(function (Vessel $vessel) {
                $photo = $vessel->photos->first();
                $photoUrl = $photo
                    ? Storage::url($photo->photo_path)
                    : null;

                return [
                    'id'         => $vessel->id,
                    'name'       => $vessel->name,
                    'spec'       => trim(($vessel->vessel_type ?? '') . ' • ' . ($vessel->length_ft ? (int) $vessel->length_ft . 'ft' : ''), ' •'),
                    'marina'     => $vessel->marina_name ?? $vessel->marina_city ?? '—',
                    'photo_url'  => $photoUrl,
                ];
            });


        $captainMatches = VesselMatch::whereIn('vessel_id', $vesselIds)
            ->where('profile_type', 'captain')
            ->with([
                'captainProfile' => fn($q) => $q->select('id', 'full_name', 'license_type', 'tonnage_rating', 'photo_path'),
            ])
            ->orderByDesc('match_score')
            ->limit(5)
            ->get()
            ->map(function (VesselMatch $match) {
                $captain = $match->captainProfile;

                if (! $captain) {
                    return null;
                }

                $photoUrl = $captain->photo_path
                    ? Storage::url($captain->photo_path)
                    : null;

                $spec = collect([
                    $captain->license_type,
                    $captain->tonnage_rating ? $captain->tonnage_rating . ' Ton' : null,
                ])->filter()->implode(' ');

                return [
                    'id'        => $captain->id,
                    'name'      => $captain->full_name,
                    'spec'      => $spec ?: '—',
                    'match'     => $match->match_score . '% Match',
                    'photo_url' => $photoUrl,
                ];
            })
            ->filter()
            ->values();

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role' => 'owner',
                'stats' => [
                    'total_vessels'    => $totalVessels,
                    'approved_captains' => $approvedCaptains,
                    'active_charters'  => $activeCharters,
                    'pending_requests' => $pendingRequests,
                ],
                'recent_vessels'  => $recentVessels,
                'captain_matches' => $captainMatches,
            ],
        ]);
    }
}
