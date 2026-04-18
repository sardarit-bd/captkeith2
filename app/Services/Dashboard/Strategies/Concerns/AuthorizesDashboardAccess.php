<?php

namespace App\Services\Dashboard\Strategies\Concerns;

use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;

trait AuthorizesDashboardAccess
{
    /**
     * @throws AuthorizationException
     */
    protected function ensurePermission(User $user, string $permission): void
    {
        if ($user->can($permission)) {
            return;
        }

        throw new AuthorizationException(
            sprintf('User is not authorized to access dashboard permission [%s].', $permission),
        );
    }
}

