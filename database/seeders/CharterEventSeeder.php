<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CharterEventSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('charter_events')->upsert(
            [
                [
                    'id' => SeedIds::CHARTER_EVENT_1,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'charterer_id' => SeedIds::CHARTERER_PROFILE,
                    'selected_captain_id' => SeedIds::CAPTAIN_PROFILE_1,
                    'selected_deckhand_id' => SeedIds::DECKHAND_PROFILE_1,
                    'charter_date' => now()->addDays(14)->toDateString(),
                    'start_time' => '09:00:00',
                    'duration_minutes' => 240,
                    'special_notes' => 'Birthday charter',
                    'status' => 'agreements_pending',
                    'invite_token' => Str::lower('seed-charter-event-1'),
                    'invite_token_expires_at' => now()->addDays(21),
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ],
            ],
            ['id'],
            [
                'vessel_id',
                'charterer_id',
                'selected_captain_id',
                'selected_deckhand_id',
                'charter_date',
                'start_time',
                'duration_minutes',
                'special_notes',
                'status',
                'invite_token',
                'invite_token_expires_at',
                'updated_at',
                'deleted_at',
            ]
        );
    }
}
