<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Spatie\Permission\PermissionRegistrar;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('owner users with dashboard permission can visit the dashboard', function () {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    Permission::findOrCreate('dashboard.owner.view', 'web');
    $ownerRole = Role::findOrCreate('owner', 'web');
    $ownerRole->syncPermissions(['dashboard.owner.view']);

    $user = User::factory()->create();
    $user->assignRole($ownerRole);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('admin users with dashboard permission can visit the dashboard', function () {
    app(PermissionRegistrar::class)->forgetCachedPermissions();

    Permission::findOrCreate('dashboard.admin.view', 'web');
    $adminRole = Role::findOrCreate('admin', 'web');
    $adminRole->syncPermissions(['dashboard.admin.view']);

    $user = User::factory()->create();
    $user->assignRole($adminRole);
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('users without a supported dashboard role cannot visit dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertForbidden();
});
