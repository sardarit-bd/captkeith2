<?php

namespace App\Http\Controllers;

use App\Services\Dashboard\AdminDashboardService;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    public function index(AdminDashboardService $service): Response
    {
        try {
            $dashboardData = $service->getOverviewData();
        } catch (\Exception $e) {
            // Log the error in production
            logger()->error('Failed to load admin dashboard data', ['exception' => $e]);
            
            // Return safe fallback data so the page still renders
            $dashboardData = [
                'stats' => [
                    'totalVessels' => 0,
                    'activeVessels' => 0,
                    'pendingApprovals' => 0,
                    'flaggedIssues' => 0,
                    'totalUsers' => 0,
                    'complianceChecks' => 0,
                ],
                'recentVessels' => [],
                'complianceAlerts' => [],
                'error' => 'Unable to load dashboard data. Please try again later.',
            ];
        }

        return Inertia::render('admin/dashboard', [
            'dashboardData' => $dashboardData,
        ]);
    }
}