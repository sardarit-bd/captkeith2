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
        Route::get('my-yachts', [\App\Http\Controllers\Vessels\VesselController::class, 'index'])->name('my-yachts');
        Route::inertia('my-yachts/create', 'my-yachts/create')->name('my-yachts.create');
        Route::get('captains', [\App\Http\Controllers\CaptainController::class, 'index'])->name('captains');
        Route::get('charterers', [\App\Http\Controllers\CharterController::class, 'index'])->name('charterers');
        Route::post('charterers', [\App\Http\Controllers\CharterController::class, 'store'])->name('charterers.store');
        Route::inertia('chartarere/invite', 'chartarere/invite')->name('chartarere.invite');
        Route::inertia('owner/settings', 'owner-settings')->name('owner-settings');
        Route::get('my-yachts/{vessel}/edit', [\App\Http\Controllers\Vessels\VesselController::class, 'edit'])->name('my-yachts.edit');
        Route::delete('my-yachts/{vessel}', [\App\Http\Controllers\Vessels\VesselController::class, 'destroy'])->name('my-yachts.destroy');
        Route::post('my-yachts', [\App\Http\Controllers\Vessels\VesselController::class, 'store'])->name('my-yachts.store');
        Route::match(['PUT', 'PATCH'], 'my-yachts/{vessel}', [\App\Http\Controllers\Vessels\VesselController::class, 'edit'])->name('my-yachts.update');
        Route::get(
            'captain-requests',
            [\App\Http\Controllers\OwnerCaptainRequestsController::class, 'index']
        )->name('captain-requests');

        Route::patch(
            'captain-requests/{interest}/respond',
            [\App\Http\Controllers\OwnerCaptainRequestsController::class, 'respond']
        )->name('captain-requests.respond');
        Route::get('charterer/join/{token}', [\App\Http\Controllers\CharterController::class, 'join'])
            ->name('charterer.join');
    });

    Route::middleware('role:admin')->group(function () {
        Route::inertia('admin/users', 'admin-users')->name('admin-users');
        Route::inertia('admin/vessel-inventory', 'vessel-inventory')->name('vessel-inventory');
        Route::inertia('admin/compliance-log', 'compliance-log')->name('compliance-log');
        Route::inertia('admin/platform-settings', 'platform-settings')->name('platform-settings');
        Route::inertia('admin/my-profile', 'admin/my-profile')->name('admin-my-profile');
    });

    Route::middleware('role:owner|captain|deckhand')->group(function () {
        Route::get('my-profile', [\App\Http\Controllers\MyProfileController::class, 'edit'])
            ->name('my-profile');
        Route::post('my-profile', [\App\Http\Controllers\MyProfileController::class, 'update'])
            ->name('my-profile.update');
    });

    Route::middleware('role:captain|deckhand')->group(function () {
        Route::get('yachts-match', [\App\Http\Controllers\YachtsMatchController::class, 'index'])
            ->name('yachts-match');
        Route::get('requests', [\App\Http\Controllers\RequestsController::class, 'index'])->name('requests');
        Route::patch('requests/{crewResponse}/respond', [\App\Http\Controllers\RequestsController::class, 'respond'])->name('requests.respond');
        Route::get('account-preferences', [\App\Http\Controllers\AccountPreferencesController::class, 'index'])
            ->name('account-preferences');

        Route::patch('account-preferences/toggles', [\App\Http\Controllers\AccountPreferencesController::class, 'updateToggles'])
            ->name('account-preferences.toggles');

        Route::post('account-preferences/dates', [\App\Http\Controllers\AccountPreferencesController::class, 'storeDate'])
            ->name('account-preferences.dates.store');

        Route::delete('account-preferences/dates/{dateId}', [\App\Http\Controllers\AccountPreferencesController::class, 'destroyDate'])
            ->name('account-preferences.dates.destroy');
        Route::inertia('yacht/details', 'yacht/details')->name('yacht-details');
        Route::post(
            'vessels/{vessel}/interest',
            [\App\Http\Controllers\VesselInterestController::class, 'store']
        )->name('vessels.interest.store');

        Route::delete(
            'vessels/{vessel}/interest',
            [\App\Http\Controllers\VesselInterestController::class, 'destroy']
        )->name('vessels.interest.destroy');
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

require __DIR__ . '/settings.php';
