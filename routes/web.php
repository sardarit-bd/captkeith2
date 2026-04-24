<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::inertia('/contact', 'public/contact')->name('contact');
Route::inertia('/about-us', 'public/about', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::inertia('messages', 'messages')->name('messages');
    Route::middleware('role:owner|captain|deckhand|charterer|admin')->group(function () {
        Route::inertia('notifications', 'notifications')->name('notifications');
    });

    Route::middleware('role:owner')->group(function () {
        Route::inertia('my-yachts', 'my-yachts')->name('my-yachts');
        Route::inertia('my-yachts/create', 'my-yachts/create')->name('my-yachts.create');
        Route::inertia('captains', 'captains')->name('captains');
        Route::inertia('charterers', 'charterers')->name('charterers');
        Route::inertia('chartarere/invite', 'chartarere/invite')->name('chartarere.invite');
        Route::inertia('owner/settings', 'owner-settings')->name('owner-settings');
    });

    Route::middleware('role:admin')->group(function () {
        Route::inertia('admin/users', 'admin-users')->name('admin-users');
        Route::inertia('admin/vessel-inventory', 'vessel-inventory')->name('vessel-inventory');
        Route::inertia('admin/compliance-log', 'compliance-log')->name('compliance-log');
        Route::inertia('admin/platform-settings', 'platform-settings')->name('platform-settings');
        Route::inertia('admin/my-profile', 'admin/my-profile')->name('admin-my-profile');
    });

    Route::middleware('role:owner|captain|deckhand')->group(function () {
        Route::inertia('my-profile', 'my-profile')->name('my-profile');
    });

    Route::middleware('role:captain|deckhand')->group(function () {
        Route::inertia('yachts-match', 'yachts-match')->name('yachts-match');
        Route::inertia('requests', 'requests')->name('requests');
        Route::inertia('account-preferences', 'account-preferences')->name('account-preferences');
        Route::inertia('yacht/details', 'yacht/details')->name('yacht-details');
    });

    Route::middleware('role:charterer')->group(function () {
        Route::inertia('my-booking', 'my-booking')->name('my-booking');
        Route::inertia('charterer/request', 'charterer/request')->name('charterer.request');
        Route::inertia('charterer/captain-select', 'charterer/captain-select')->name('charterer.captain-select');
        Route::inertia('charterer/information', 'charterer/information')->name('charterer.information');
        Route::inertia('charterer/agreement', 'charterer/agreement')->name('charterer.agreement');
        Route::inertia('charterer/insurance', 'charterer/insurance')->name('charterer.insurance');
        Route::inertia('charterer/confirmed', 'charterer/confirmed')->name('charterer.confirmed');
        Route::inertia('charterer/settings', 'charterer-settings')->name('charterer-settings');
    });
});

require __DIR__.'/settings.php';
