<?php

namespace App\Services\Dashboard\Strategies;

use App\DataTransferObjects\DashboardViewData;
use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\Concerns\AuthorizesDashboardAccess;

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

        return new DashboardViewData('dashboard', [
            'dashboard' => [
                'role' => 'owner',
            ],
        ]);
    }
}

