<?php

namespace App\Http\Controllers;

use App\Models\ChartererProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChartererSettingsController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = ChartererProfile::where('user_id', $request->user()->id)->first();

        return Inertia::render('charterer-settings', [
            'preferences' => $profile?->resolvedPreferences() ?? ChartererProfile::defaultPreferences(),
        ]);
    }

    public function updatePreferences(Request $request)
    {
        $profile = ChartererProfile::where('user_id', $request->user()->id)->firstOrFail();

        $profile->update([
            'preferences' => array_merge(
                $profile->preferences ?? [],
                $request->validate([
                    'email_notifications' => ['sometimes', 'boolean'],
                    'sms_notifications'   => ['sometimes', 'boolean'],
                    'profile_visibility'  => ['sometimes', 'boolean'],
                ])
            ),
        ]);

        return back()->with('success', 'Preferences updated.');
    }

    public function deactivate(Request $request)
    {
        $profile = ChartererProfile::where('user_id', $request->user()->id)->firstOrFail();
        $profile->update(['preferences->is_active' => false]);

        return back()->with('success', 'Account deactivated.');
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return redirect('/');
    }
}
