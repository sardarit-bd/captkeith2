<?php

namespace App\Http\Controllers;

use App\Models\OwnerProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OwnerSettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $owner = OwnerProfile::where('user_id', $request->user()->id)->first();
        $prefs = $owner ? $owner->resolvedPreferences() : OwnerProfile::defaultPreferences();

        return Inertia::render('owner-settings', [
            'preferences' => $prefs,
            'twoFactorEnabled' => !is_null($request->user()->two_factor_confirmed_at),
        ]);
    }

    public function updatePreferences(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email_notifications' => ['boolean'],
            'sms_notifications'   => ['boolean'],
            'booking_reminders'   => ['boolean'],
            'marketing_emails'    => ['boolean'],
        ]);

        $owner = OwnerProfile::where('user_id', $request->user()->id)->firstOrFail();
        $owner->update(['preferences' => array_merge(
            $owner->resolvedPreferences(),
            $validated,
        )]);

        return back()->with('success', 'Preferences saved.');
    }

    public function deactivate(Request $request): RedirectResponse
    {
        $request->user()->update(['is_active' => false]);
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Account deactivated.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $user = $request->user();
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $user->delete();

        return redirect('/')->with('success', 'Account deleted.');
    }
}
