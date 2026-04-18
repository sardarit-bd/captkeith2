<?php

namespace App\Services\Dashboard\Contracts;

use App\DataTransferObjects\DashboardViewData;
use App\Models\User;

interface DashboardStrategy
{
    public function supports(User $user): bool;

    public function resolve(User $user): DashboardViewData;
}

