<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MatchSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('matches')->upsert(
            [
                [
                    'id' => SeedIds::MATCH_1,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'profile_id' => SeedIds::CAPTAIN_PROFILE_1,
                    'profile_type' => 'captain',
                    'match_score' => 92,
                    'match_reasons' => json_encode(['license_match', 'experience_match'], JSON_THROW_ON_ERROR),
                    'owner_notified' => true,
                    'profile_notified' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::MATCH_2,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'profile_id' => SeedIds::DECKHAND_PROFILE_1,
                    'profile_type' => 'deckhand',
                    'match_score' => 88,
                    'match_reasons' => json_encode(['availability', 'bartending_experience'], JSON_THROW_ON_ERROR),
                    'owner_notified' => false,
                    'profile_notified' => false,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['id'],
            ['vessel_id', 'profile_id', 'profile_type', 'match_score', 'match_reasons', 'owner_notified', 'profile_notified', 'updated_at']
        );
    }
}
