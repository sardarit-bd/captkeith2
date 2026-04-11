<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InterestSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('captain_vessel_interest')->updateOrInsert(
            [
                'captain_id' => SeedIds::CAPTAIN_PROFILE_1,
                'vessel_id' => SeedIds::VESSEL_1,
            ],
            [
                'id' => SeedIds::CAPTAIN_INTEREST_1,
                'created_at' => $now,
            ]
        );

        DB::table('deckhand_vessel_interest')->updateOrInsert(
            [
                'deckhand_id' => SeedIds::DECKHAND_PROFILE_1,
                'vessel_id' => SeedIds::VESSEL_1,
            ],
            [
                'id' => SeedIds::DECKHAND_INTEREST_1,
                'created_at' => $now,
            ]
        );
    }
}
