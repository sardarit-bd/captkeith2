<?php

use App\Models\Role;
use App\Models\User;

dataset('notification_roles', ['owner', 'captain', 'deckhand', 'charterer', 'admin']);

test('supported roles can access notifications route', function (string $roleName) {
    $role = Role::findOrCreate($roleName, 'web');

    $user = User::factory()->create();
    $user->assignRole($role);
    $this->actingAs($user);

    $this->get(route('notifications'))->assertOk();
})->with('notification_roles');

test('user without supported role cannot access notifications route', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $this->get(route('notifications'))->assertForbidden();
});
