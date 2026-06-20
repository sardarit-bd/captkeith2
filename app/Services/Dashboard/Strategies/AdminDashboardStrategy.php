<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\User;
use App\Services\Dashboard\AdminDashboardService;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;

class AdminDashboardStrategy implements DashboardStrategy
{
    use AuthorizesDashboardAccess;

    public function __construct(
        private AdminDashboardService $adminDashboardService
    ) {}

    public function supports(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function resolve(User $user): DashboardViewData
    {
        $this->ensurePermission($user, 'dashboard.admin.view');
        // dd($this->adminDashboardService->getOverviewData());
        $data=$this->adminDashboardService->getOverviewData();
        // dd($data);
        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role' => 'admin',
            ],
            'dashboardData' => $this->adminDashboardService->getOverviewData(),
        ]);
    }
}