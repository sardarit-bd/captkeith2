<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CharterCrewResponseSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('charter_crew_responses')->upsert(
            [
                [
                    'id' => SeedIds::CHARTER_RESPONSE_CAPTAIN_1,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'profile_id' => SeedIds::CAPTAIN_PROFILE_1,
                    'crew_role' => 'captain',
                    'response' => 'available',
                    'responded_at' => $now,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::CHARTER_RESPONSE_CAPTAIN_2,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'profile_id' => SeedIds::CAPTAIN_PROFILE_2,
                    'crew_role' => 'captain',
                    'response' => 'pending',
                    'responded_at' => null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::CHARTER_RESPONSE_DECKHAND_1,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'profile_id' => SeedIds::DECKHAND_PROFILE_1,
                    'crew_role' => 'deckhand',
                    'response' => 'available',
                    'responded_at' => $now,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['charter_event_id', 'profile_id', 'crew_role'],
            ['response', 'responded_at', 'updated_at']
        );
    }
}
