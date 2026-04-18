<?php

namespace App\Services\Dashboard;

use App\DataTransferObjects\DashboardViewData;
use App\Models\User;
use App\Services\Dashboard\Contracts\DashboardStrategy;
use App\Services\Dashboard\Strategies\AdminDashboardStrategy;
use App\Services\Dashboard\Strategies\CaptainDashboardStrategy;
use App\Services\Dashboard\Strategies\ChartererDashboardStrategy;
use App\Services\Dashboard\Strategies\DeckhandDashboardStrategy;
use App\Services\Dashboard\Strategies\OwnerDashboardStrategy;
use Illuminate\Auth\Access\AuthorizationException;

class DashboardResolver
{
    /**
     * @var array<int, DashboardStrategy>
     */
    private array $strategies;

    public function __construct(
        AdminDashboardStrategy $adminDashboardStrategy,
        OwnerDashboardStrategy $ownerDashboardStrategy,
        CaptainDashboardStrategy $captainDashboardStrategy,
        DeckhandDashboardStrategy $deckhandDashboardStrategy,
        ChartererDashboardStrategy $chartererDashboardStrategy,
    ) {
        $this->strategies = [
            $adminDashboardStrategy,
            $ownerDashboardStrategy,
            $captainDashboardStrategy,
            $deckhandDashboardStrategy,
            $chartererDashboardStrategy,
        ];
    }

    /**
     * @throws AuthorizationException
     */
    public function resolve(User $user): DashboardViewData
    {
        foreach ($this->strategies as $strategy) {
            if (! $strategy->supports($user)) {
                continue;
            }

            return $strategy->resolve($user);
        }

        throw new AuthorizationException('No dashboard strategy found for current user role.');
    }
}

