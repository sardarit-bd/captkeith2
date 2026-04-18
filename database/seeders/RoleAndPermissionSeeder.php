<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    private const GUARD = 'web';

    /**
     * Single source of truth: role to permission mapping.
     *
     * Add or edit permissions here in future.
     * Use '*' to grant all permissions to a role.
     *
     * @var array<string, array<int, string>>
     */
    private const ROLE_PERMISSIONS = [
        'admin' => ['*'],

        'owner' => [
            'dashboard.owner.view',
            'my-yachts.view',
            'my-yachts.create',
            'my-yachts.update',
            'my-yachts.delete',
            'captains.view',
            'captains.qualify',
            'captains.message',
            'charters.view',
            'charters.create',
            'charters.manage',
            'agreements.view',
            'payments.view',
            'settings.profile.update',
            'settings.security.update',
            'settings.appearance.update',
        ],

        'captain' => [
            'dashboard.captain.view',
            'opportunities.view',
            'charters.view',
            'charters.respond',
            'agreements.view',
            'agreements.sign',
            'payments.view',
            'settings.profile.update',
            'settings.security.update',
            'settings.appearance.update',
        ],

        'deckhand' => [
            'dashboard.deckhand.view',
            'opportunities.view',
            'charters.view',
            'charters.respond',
            'agreements.view',
            'agreements.sign',
            'payments.view',
            'settings.profile.update',
            'settings.security.update',
            'settings.appearance.update',
        ],

        'charterer' => [
            'dashboard.charterer.view',
            'charters.view',
            'charters.book',
            'captains.select',
            'deckhands.select',
            'agreements.view',
            'agreements.sign',
            'insurance.purchase',
            'payments.create',
            'payments.view',
            'settings.profile.update',
            'settings.security.update',
            'settings.appearance.update',
        ],
    ];

    /**
     * Seed users by email => role name.
     *
     * @var array<string, string>
     */
    private const SEEDED_USER_ROLES = [
        'test@example.com' => 'admin',
        'owner@example.com' => 'owner',
        'captain1@example.com' => 'captain',
        'captain2@example.com' => 'captain',
        'deckhand1@example.com' => 'deckhand',
        'deckhand2@example.com' => 'deckhand',
        'charterer@example.com' => 'charterer',
    ];

    /**
     * Seed roles and permissions.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $allPermissions = $this->collectPermissions();
        foreach ($allPermissions as $permissionName) {
            Permission::findOrCreate($permissionName, self::GUARD);
        }

        $allPermissionModels = Permission::query()
            ->where('guard_name', self::GUARD)
            ->get();

        foreach (self::ROLE_PERMISSIONS as $roleName => $permissionNames) {
            $role = Role::findOrCreate($roleName, self::GUARD);

            if ($permissionNames === ['*']) {
                $role->syncPermissions($allPermissionModels);

                continue;
            }

            $role->syncPermissions($permissionNames);
        }

        $this->assignRolesToSeedUsers();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * Build a unique list of permissions from ROLE_PERMISSIONS.
     *
     * @return array<int, string>
     */
    private function collectPermissions(): array
    {
        $permissions = [];

        foreach (self::ROLE_PERMISSIONS as $rolePermissions) {
            foreach ($rolePermissions as $permissionName) {
                if ($permissionName === '*') {
                    continue;
                }

                $permissions[] = $permissionName;
            }
        }

        // Keep deterministic order to reduce noise across runs.
        $permissions = array_values(array_unique($permissions));
        sort($permissions);

        // Ensure critical back-office permission always exists.
        if (!in_array('roles.permissions.update', $permissions, true)) {
            $permissions[] = 'roles.permissions.update';
        }

        return $permissions;
    }

    /**
     * Assign seeded roles to seeded users if they exist.
     */
    private function assignRolesToSeedUsers(): void
    {
        foreach (self::SEEDED_USER_ROLES as $email => $roleName) {
            User::where('email', $email)->first()?->syncRoles([$roleName]);
        }
    }
}
