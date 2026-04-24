<?php

use App\Models\Role;
use App\Models\User;

test('admin can access admin users route', function () {
    $adminRole = Role::findOrCreate('admin', 'web');

    $user = User::factory()->create();
    $user->assignRole($adminRole);
    $this->actingAs($user);

    $this->get(route('admin-users'))->assertOk();
});

test('non-admin cannot access admin users route', function () {
    $ownerRole = Role::findOrCreate('owner', 'web');

    $user = User::factory()->create();
    $user->assignRole($ownerRole);
    $this->actingAs($user);

    $this->get(route('admin-users'))->assertForbidden();
});
