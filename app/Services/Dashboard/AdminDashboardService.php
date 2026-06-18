<?php

namespace App\Services\Dashboard;

use App\Models\Vessel;
use App\Models\User;
use App\Models\ComplianceCheck;
use Illuminate\Support\Facades\DB;

class AdminDashboardService
{
    /**
     * Get overview data for the admin dashboard.
     *
     * @return array<string, mixed>
     */
    public function getOverviewData(): array
    {
        return [
            'stats' => [
                'totalVessels' => Vessel::count(),
                'activeVessels' => Vessel::where('status', 'active')->count(),
                'pendingApprovals' => Vessel::where('status', 'pending_approval')->count(),
                'flaggedIssues' => Vessel::where('status', 'flagged')->count(),
                'totalUsers' => User::count(),
                'complianceChecks' => ComplianceCheck::count(),
            ],
            'recentVessels' => Vessel::with(['ownerProfile.user'])
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($vessel) {
                    return [
                        'id' => $vessel->id,
                        'name' => $vessel->name,
                        'type' => $vessel->type ?? 'POWER',
                        'length' => $vessel->length . 'ft',
                        'owner' => $vessel->ownerProfile?->user?->name ?? 'Unknown',
                        'location' => $vessel->home_port ?? 'N/A',
                        'status' => $vessel->status,
                        'official_number' => $vessel->official_number,
                        'capacity' => 'Max ' . ($vessel->passenger_capacity ?? 6) . ' Pax',
                        'deckhand_required' => $vessel->deckhand_required ?? false,
                    ];
                }),
            'complianceAlerts' => ComplianceCheck::with('vessel')
                ->where('status', 'failed')
                ->latest()
                ->take(3)
                ->get()
                ->map(function ($check) {
                    return [
                        'id' => $check->id,
                        'vessel_name' => $check->vessel?->name ?? 'Unknown Vessel',
                        'issue' => $check->notes ?? 'Compliance check failed',
                        'date' => $check->created_at->format('M d, Y'),
                    ];
                }),
        ];
    }
}