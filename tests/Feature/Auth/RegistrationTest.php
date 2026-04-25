<?php

use App\Models\Role;
use App\Models\User;
use Spatie\Permission\PermissionRegistrar;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());

    app(PermissionRegistrar::class)->forgetCachedPermissions();

    Role::findOrCreate('owner', 'web');
    Role::findOrCreate('captain', 'web');
    Role::findOrCreate('deckhand', 'web');
    Role::findOrCreate('charterer', 'web');
    Role::findOrCreate('admin', 'web');
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'email' => 'test@example.com',
        'role' => 'owner',
        'password' => 'StrongPass#123',
        'password_confirmation' => 'StrongPass#123',
    ]);

    $this->assertAuthenticated();
    expect(auth()->user()?->hasRole('owner'))->toBeTrue();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('admin role cannot be self-registered', function () {
    $response = $this->from(route('register'))->post(route('register.store'), [
        'email' => 'admin-candidate@example.com',
        'role' => 'admin',
        'password' => 'StrongPass#123',
        'password_confirmation' => 'StrongPass#123',
    ]);

    $response->assertRedirect(route('register'));
    $response->assertSessionHasErrors('role');
    $this->assertGuest();
});

test('same email cannot register for a different role', function () {
    User::factory()->create([
        'email' => 'already-used@example.com',
    ]);

    $response = $this->from(route('register'))->post(route('register.store'), [
        'email' => 'already-used@example.com',
        'role' => 'captain',
        'password' => 'StrongPass#123',
        'password_confirmation' => 'StrongPass#123',
    ]);

    $response->assertRedirect(route('register'));
    $response->assertSessionHasErrors('email');
    $this->assertGuest();
});

test('registration requires a strong password that matches policy', function () {
    $response = $this->from(route('register'))->post(route('register.store'), [
        'email' => 'weak-password@example.com',
        'role' => 'deckhand',
        'password' => 'weakpass123',
        'password_confirmation' => 'weakpass123',
    ]);

    $response->assertRedirect(route('register'));
    $response->assertSessionHasErrors('password');
    $this->assertGuest();
});
