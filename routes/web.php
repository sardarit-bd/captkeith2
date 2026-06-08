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
        Route::get('messages', [\App\Http\Controllers\MessageController::class, 'index'])->name('messages');
        Route::post('messages', [\App\Http\Controllers\MessageController::class, 'store'])->name('messages.store');
        Route::get('charterer/agreement/{agreementId}/download', [\App\Http\Controllers\CharterController::class, 'downloadAgreement'])->name('charterer.agreement.download');
        Route::middleware('role:owner|captain|deckhand|charterer|admin')->group(function () {
            Route::inertia('notifications', 'notifications')->name('notifications');
            Route::get('captains/{captain}', [\App\Http\Controllers\CaptainController::class, 'show'])->name('captains.show');
            Route::get('vessels/{vessel}', [\App\Http\Controllers\Vessels\VesselController::class, 'show'])->name('vessels.show');
        });

        Route::middleware('role:owner')->group(function () {
            Route::get('my-yachts', [\App\Http\Controllers\Vessels\VesselController::class, 'index'])->name('my-yachts');
            Route::inertia('my-yachts/create', 'my-yachts/create')->name('my-yachts.create');
            Route::get('captains', [\App\Http\Controllers\CaptainController::class, 'index'])->name('captains');
            Route::get('charterers', [\App\Http\Controllers\CharterController::class, 'index'])->name('charterers');
            Route::get('owner/agreement/{agreementId}/download', [\App\Http\Controllers\CharterController::class, 'downloadAgreement'])->name('owner.agreement.download');
            Route::post('charterers', [\App\Http\Controllers\CharterController::class, 'store'])->name('charterers.store');
            Route::delete('charterers/{charterEvent}', [\App\Http\Controllers\CharterController::class, 'destroy'])->name('charterers.destroy');
            Route::inertia('chartarere/invite', 'chartarere/invite')->name('chartarere.invite');
            Route::post('captains/{captain}/invite', [\App\Http\Controllers\OwnerCaptainInvitationController::class, 'store'])
                ->name('captains.invite.store');
            Route::delete('captains/{captain}/invite', [\App\Http\Controllers\OwnerCaptainInvitationController::class, 'destroy'])
                ->name('captains.invite.destroy');
            Route::get('owner/settings', [\App\Http\Controllers\OwnerSettingsController::class, 'index'])
                ->name('owner-settings');
            Route::patch('owner/settings/preferences', [\App\Http\Controllers\OwnerSettingsController::class, 'updatePreferences'])
                ->name('owner-settings.preferences');
            Route::patch('owner/settings/deactivate', [\App\Http\Controllers\OwnerSettingsController::class, 'deactivate'])
                ->name('owner-settings.deactivate');
                // Deckhands routes
            Route::get('deckhands', [\App\Http\Controllers\DeckhandController::class, 'index'])->name('deckhands');
            Route::post('deckhands/{deckhand}/invite', [\App\Http\Controllers\OwnerDeckhandInvitationController::class, 'store'])
                ->name('deckhands.invite.store');
            Route::delete('deckhands/{deckhand}/invite', [\App\Http\Controllers\OwnerDeckhandInvitationController::class, 'destroy'])
                ->name('deckhands.invite.destroy');
            Route::delete(
                'deckhands/{deckhand}/revoke-acceptance',
                [\App\Http\Controllers\OwnerDeckhandRequestsController::class, 'revokeAcceptance']
            )->name('deckhands.revoke-acceptance');

            Route::get(
                'deckhand-requests',
                [\App\Http\Controllers\OwnerDeckhandRequestsController::class, 'index']
            )->name('deckhand-requests');

            Route::patch(
                'deckhand-requests/{interest}/respond',
                [\App\Http\Controllers\OwnerDeckhandRequestsController::class, 'respond']
            )->name('deckhand-requests.respond');
            Route::delete('owner/settings', [\App\Http\Controllers\OwnerSettingsController::class, 'destroy'])
                ->name('owner-settings.destroy');
            Route::get('my-yachts/{vessel}/edit', [\App\Http\Controllers\Vessels\VesselController::class, 'edit'])->name('my-yachts.edit');
            Route::delete('my-yachts/{vessel}', [\App\Http\Controllers\Vessels\VesselController::class, 'destroy'])->name('my-yachts.destroy');
            Route::post('my-yachts', [\App\Http\Controllers\Vessels\VesselController::class, 'store'])->name('my-yachts.store');
            Route::match(['PUT', 'PATCH'], 'my-yachts/{vessel}', [\App\Http\Controllers\Vessels\VesselController::class, 'update'])->name('my-yachts.update');
            Route::get(
                'captain-requests',
                [\App\Http\Controllers\OwnerCaptainRequestsController::class, 'index']
            )->name('captain-requests');

            Route::patch(
                'captain-requests/{interest}/respond',
                [\App\Http\Controllers\OwnerCaptainRequestsController::class, 'respond']
            )->name('captain-requests.respond');
            // Route::get('charterer/join/{token}', [\App\Http\Controllers\CharterController::class, 'join'])
            //     ->name('charterer.join');
            Route::delete(
                'captains/{captain}/revoke-acceptance',
                [\App\Http\Controllers\OwnerCaptainRequestsController::class, 'revokeAcceptance']
            )->name('captains.revoke-acceptance');
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
            Route::patch('/requests/{crewResponse}/select-deckhand', [\App\Http\Controllers\RequestsController::class, 'selectDeckhand'])->name('requests.select-deckhand');
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

            Route::patch(
                'invitations/{invitation}/respond',
                [\App\Http\Controllers\OwnerCaptainInvitationController::class, 'respond']
            )->name('invitations.respond');
            Route::get('invitations', [\App\Http\Controllers\OwnerCaptainInvitationController::class, 'index'])->name('invitations');
            Route::patch(
            'deckhand-invitations/{invitation}/respond',
            [\App\Http\Controllers\OwnerDeckhandInvitationController::class, 'respond']
            )->name('deckhand-invitations.respond');
            Route::get('deckhand-invitations', [\App\Http\Controllers\OwnerDeckhandInvitationController::class, 'index'])->name('deckhand-invitations');
            Route::post('/requests/deckhand/send', [\App\Http\Controllers\RequestsController::class, 'sendDeckhandRequest'])
                ->name('requests.send-deckhand');
                
            Route::post('/requests/deckhand/cancel', [\App\Http\Controllers\RequestsController::class, 'cancelDeckhandRequest'])
                ->name('requests.cancel-deckhand');
        });

        Route::middleware('role:charterer')->group(function () {
            Route::get('my-booking', [\App\Http\Controllers\MyBookingController::class, 'index'])->name('my-booking');
           Route::get('charterer/request/{id}', [\App\Http\Controllers\CharterController::class, 'request'])->name('charterer.request');
            Route::get('/charterer/captain-select', [\App\Http\Controllers\CharterController::class, 'captainSelect'])->name('charterer.captain-select');
            Route::post('/charterer/captain-requests/{responseId}/cancel', [\App\Http\Controllers\CharterController::class, 'cancelCaptainRequest'])
                ->name('charterer.captain-request.cancel');
            Route::post('/charterer/captain-requests', [\App\Http\Controllers\CharterController::class, 'sendCaptainRequests'])->name('charterer.captain-requests.send');
            Route::get('/charterer/captain-request-status', [\App\Http\Controllers\CharterController::class, 'captainRequestStatus'])->name('charterer.captain-request-status');
            Route::get('charterer/information', [\App\Http\Controllers\CharterController::class, 'information'])->name('charterer.information');
            Route::post('charterer/information', [\App\Http\Controllers\CharterController::class, 'saveInformation'])->name('charterer.information.save');
            Route::get('charterer/agreement', [\App\Http\Controllers\CharterController::class, 'agreement'])->name('charterer.agreement');
            Route::post('charterer/agreement', [\App\Http\Controllers\CharterController::class, 'signAgreements'])->name('charterer.agreement.sign');
            // Route::inertia('charterer/insurance', 'charterer/insurance')->name('charterer.insurance');
            Route::get('charterer/insurance', [\App\Http\Controllers\CharterController::class, 'insurance'])->name('charterer.insurance');
            Route::get('charterer/agreement/{agreementId}/download', [\App\Http\Controllers\CharterController::class, 'downloadAgreement'])->name('charterer.agreement.download');
            Route::inertia('charterer/confirmed', 'charterer/confirmed')->name('charterer.confirmed');
            Route::get('charterer/settings', [\App\Http\Controllers\ChartererSettingsController::class, 'index'])->name('charterer-settings');
            Route::patch('charterer/settings/preferences', [\App\Http\Controllers\ChartererSettingsController::class, 'updatePreferences'])->name('charterer-settings.preferences');
            Route::patch('charterer/settings/deactivate', [\App\Http\Controllers\ChartererSettingsController::class, 'deactivate'])->name('charterer-settings.deactivate');
            Route::delete('charterer/settings', [\App\Http\Controllers\ChartererSettingsController::class, 'destroy'])->name('charterer-settings.destroy');
            Route::get('charterer/join/{token}', [\App\Http\Controllers\CharterController::class, 'join'])->name('charterer.join');
        });
    });

    require __DIR__ . '/settings.php';
