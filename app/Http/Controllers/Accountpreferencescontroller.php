<?php

namespace App\Http\Controllers;

use App\Models\CaptainProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AccountPreferencesController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = CaptainProfile::where('user_id', $request->user()->id)->firstOrFail();

        return Inertia::render('account-preferences', [
            'preferences' => $profile->resolvedPreferences(),
        ]);
    }


    public function updateToggles(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'is_available'          => ['required', 'boolean'],
            'weekday_availability'  => ['required', 'boolean'],
            'weekend_availability'  => ['required', 'boolean'],
            'last_minute_charters'  => ['required', 'boolean'],
            'multi_day_charters'    => ['required', 'boolean'],
            'charter_notifications' => ['required', 'boolean'],
            'owner_notification'    => ['required', 'boolean'],
            'email_notifications'   => ['required', 'boolean'],
            'sms_notifications'     => ['required', 'boolean'],
            'profile_visibility'    => ['required', 'boolean'],
            'show_rating'           => ['required', 'boolean'],
        ]);

        $profile = CaptainProfile::where('user_id', $request->user()->id)->firstOrFail();

        $current = $profile->resolvedPreferences();

        $profile->update([
            'preferences' => array_merge($current, $validated),
        ]);

        return back()->with('success', 'Preferences saved.');
    }


    public function storeDate(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date_from' => ['required', 'date'],
            'date_to'   => ['required', 'date', 'after_or_equal:date_from'],
            'reason'    => ['required', 'string', 'max:255'],
        ]);

        $profile = CaptainProfile::where('user_id', $request->user()->id)->firstOrFail();

        $current = $profile->resolvedPreferences();

        $dates   = $current['unavailable_dates'] ?? [];
        $dates[] = [
            'id'        => (string) Str::uuid(),
            'date_from' => $validated['date_from'],
            'date_to'   => $validated['date_to'],
            'reason'    => $validated['reason'],
        ];

        $profile->update([
            'preferences' => array_merge($current, ['unavailable_dates' => $dates]),
        ]);


        return back()->with('success', 'Unavailable date added.');
    }


    public function destroyDate(Request $request, string $dateId): RedirectResponse
    {
        $profile = CaptainProfile::where('user_id', $request->user()->id)->firstOrFail();

        $current = $profile->resolvedPreferences();

        $dates = array_values(
            array_filter(
                $current['unavailable_dates'] ?? [],
                fn(array $d) => $d['id'] !== $dateId,
            )
        );

        $profile->update([
            'preferences' => array_merge($current, ['unavailable_dates' => $dates]),
        ]);

        return back()->with('success', 'Date removed.');
    }
}
