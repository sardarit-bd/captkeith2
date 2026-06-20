<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PlatformSettingsController extends Controller
{
    public function index()
    {
        $settings = DB::table('platform_settings')->first();
        
        // Default fallback data if nothing is saved yet
        $defaultSettings = [
            'general' => [
                'platform_name' => 'CaptMatch',
                'support_email' => 'support@captmatch.com',
                'support_phone' => '+1 (800) 555-0192',
                'timezone' => 'Eastern Time (ET)',
                'search_radius' => 50,
                'maintenance_mode' => false,
            ],
            'uscg' => [
                'license_types' => [
                    ['id' => 'oupv', 'title' => 'OUPV (6-Pack)', 'description' => 'Operator of uninspected passenger vessels', 'enabled' => true],
                    ['id' => 'masters', 'title' => 'Masters License', 'description' => 'Requires specific tonnage and endorsement ratings', 'enabled' => true],
                ],
                'tonnage_ratings' => ['OUPV', '25 Gross Ton', '50 Gross Ton', '100 Gross Ton', '200 Gross Ton', '500 Gross Ton'],
                'geographic_endorsements' => ['Inland', 'Near Coastal', 'Unlimited'],
            ],
            'notifications' => [
                'triggers' => [
                    ['id' => 'new-captain-registration', 'title' => 'New Captain Registration', 'description' => 'Alert when a captain joins and requires document verification.', 'enabled' => true],
                    ['id' => 'new-vessel-listing', 'title' => 'New Vessel Listing', 'description' => 'Alert when an owner adds a yacht needing spec approval.', 'enabled' => true],
                    ['id' => 'charter-agreement-executed', 'title' => 'Charter Agreement Executed', 'description' => 'Daily digest of completed demise charters.', 'enabled' => false],
                    ['id' => 'compliance-flag', 'title' => 'Compliance Flag / Void Charter', 'description' => 'Immediate alert if a demise constraint is broken.', 'enabled' => true, 'disabled' => true],
                ],
            ],
            'security' => [
                'require_2fa' => true,
                'session_timeout' => '15 Minutes',
                'retention_period' => '7 Years (USCG Audit Standard)',
            ],
            'vquip' => [
                'environment' => 'Production (Live)',
                'api_key' => 'sk_live_1234567890abcdef',
                'webhook_secret' => 'whsec_abcdef123456',
                'strict_enforcement' => true,
            ],
        ];

        $currentSettings = $settings ? json_decode($settings->settings, true) : [];
        // Merge to ensure any new keys added in the future still render
        $mergedSettings = array_replace_recursive($defaultSettings, $currentSettings);

        return Inertia::render('platform-settings', [
            'settings' => $mergedSettings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
        ]);

        $settings = DB::table('platform_settings')->first();

        if ($settings) {
            DB::table('platform_settings')
                ->where('id', $settings->id)
                ->update(['settings' => json_encode($validated['settings']), 'updated_at' => now()]);
        } else {
            DB::table('platform_settings')
                ->insert(['settings' => json_encode($validated['settings']), 'created_at' => now(), 'updated_at' => now()]);
        }

        return redirect()->back()->with('success', 'Platform settings updated successfully.');
    }
}