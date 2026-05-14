<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\CharterEvent;
use App\Models\CharterPayment;
use App\Models\User;
use App\Models\Vessel;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;
use Illuminate\Support\Facades\Storage;

class CaptainDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;

    public function supports(User $user): bool
    {
        return $user->hasRole('captain');
    }

    public function resolve(User $user): DashboardViewData
    {
        $this->ensurePermission($user, 'dashboard.captain.view');

        $profile = $user->captainProfile;

        if (! $profile) {
            return new DashboardViewData('dashboard', [
                'dashboard' => [
                    'role'             => 'captain',
                    'stats'            => $this->emptyStats(),
                    'matchedYachts'    => [],
                    'charterRequests'  => [],
                ],
            ]);
        }


        $matchedVessels = Vessel::query()
            ->with(['photos' => fn($q) => $q->orderBy('display_order')->limit(1)])
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->where('required_license_type', $profile->license_type)
            ->where('required_endorsement', $profile->endorsement)
            ->where('required_tonnage_rating', '<=', $profile->tonnage_rating)
            ->where('required_years_experience', '<=', $profile->years_experience)
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn(Vessel $v) => [
                'id'     => $v->id,
                'name'   => $v->name,
                'spec'   => ucfirst($v->vessel_type) . ' • ' . $v->length_ft . 'ft',
                'marina' => $v->marina_name,
                'image'  => $v->photos->first()?->photo_path
                    ? Storage::url($v->photos->first()->photo_path)
                    : null,
            ]);

        $matchedYachtsCount = Vessel::query()
            ->where('is_active', true)
            ->whereNull('deleted_at')
            ->where('required_license_type', $profile->license_type)
            ->where('required_endorsement', $profile->endorsement)
            ->where('required_tonnage_rating', '<=', $profile->tonnage_rating)
            ->where('required_years_experience', '<=', $profile->years_experience)
            ->count();


        $charterRequests = CharterEvent::query()
            ->with(['vessel', 'vessel.photos' => fn($q) => $q->orderBy('display_order')->limit(1)])
            ->where('selected_captain_id', $profile->id)
            ->whereIn('status', ['pending', 'invited'])
            ->whereNull('deleted_at')
            ->latest('charter_date')
            ->limit(3)
            ->get()
            ->map(fn(CharterEvent $e) => [
                'id'        => $e->id,
                'yachtName' => $e->vessel?->name ?? '—',
                'yachtSpec' => $e->vessel
                    ? ucfirst($e->vessel->vessel_type) . ' • ' . $e->vessel->length_ft . 'ft'
                    : '—',
                'date'      => $e->charter_date?->format('M d, Y') ?? '—',
                'duration'  => $e->start_time
                    ? $e->start_time . ' • ' . round($e->duration_minutes / 60, 1) . ' hours'
                    : '—',
                'status'    => $e->status ?? 'pending',
            ]);

        $pendingRequestsCount = CharterEvent::query()
            ->where('selected_captain_id', $profile->id)
            ->whereIn('status', ['pending', 'invited'])
            ->whereNull('deleted_at')
            ->count();


        $plannedChartersCount = CharterEvent::query()
            ->where('selected_captain_id', $profile->id)
            ->whereIn('status', ['confirmed', 'accepted', 'in_progress'])
            ->whereNull('deleted_at')
            ->count();

        $totalEarnings = CharterPayment::query()
            ->where('captain_profile_id', $profile->id)
            ->where('status', 'paid')
            ->sum('amount');

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role'  => 'captain',
                'stats' => [
                    'matchedYachts'    => $matchedYachtsCount,
                    'pendingRequests'  => $pendingRequestsCount,
                    'plannedCharters'  => $plannedChartersCount,
                    'totalEarnings'    => '$' . number_format((float) $totalEarnings, 0),
                ],
                'matchedYachts'   => $matchedVessels,
                'charterRequests' => $charterRequests,
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function emptyStats(): array
    {
        return [
            'matchedYachts'   => 0,
            'pendingRequests' => 0,
            'plannedCharters' => 0,
            'totalEarnings'   => '$0',
        ];
    }
}
