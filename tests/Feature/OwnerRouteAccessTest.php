<?php

use App\Models\Role;
use App\Models\User;

test('owner can access owner routes', function () {
    $ownerRole = Role::findOrCreate('owner', 'web');

    $user = User::factory()->create();
    $user->assignRole($ownerRole);
    $this->actingAs($user);

    $this->get(route('my-yachts'))->assertOk();
    $this->get(route('my-yachts.create'))->assertOk();
    $this->get(route('captains'))->assertOk();
});

test('non-owner cannot access owner routes', function () {
    $chartererRole = Role::findOrCreate('charterer', 'web');

    $user = User::factory()->create();
    $user->assignRole($chartererRole);
    $this->actingAs($user);

    $this->get(route('my-yachts'))->assertForbidden();
    $this->get(route('my-yachts.create'))->assertForbidden();
    $this->get(route('captains'))->assertForbidden();
});

