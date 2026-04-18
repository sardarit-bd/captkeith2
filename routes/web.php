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

    Route::middleware('role:owner')->group(function () {
        Route::inertia('my-yachts', 'my-yachts')->name('my-yachts');
        Route::inertia('my-yachts/create', 'my-yachts/create')->name('my-yachts.create');
        Route::inertia('captains', 'captains')->name('captains');
    });
});

require __DIR__.'/settings.php';
