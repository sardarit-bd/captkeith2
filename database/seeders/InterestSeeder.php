<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InterestSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        // Updated to use the new owner_captain_invitations table
        DB::table('owner_captain_invitations')->updateOrInsert(
            [
                'owner_id'   => SeedIds::OWNER_PROFILE,
                'captain_id' => SeedIds::CAPTAIN_PROFILE_1,
                'vessel_id'  => SeedIds::VESSEL_1,
            ],
            [
                'id'         => SeedIds::CAPTAIN_INTEREST_1,
                'status'     => 'accepted',
                'created_at' => $now,
            ]
        );

        // Deckhand interest remains the same as the table still exists
        DB::table('deckhand_vessel_interests')->updateOrInsert(
            [
                'deckhand_id' => SeedIds::DECKHAND_PROFILE_1,
                'vessel_id'   => SeedIds::VESSEL_1,
            ],
            [
                'id'         => SeedIds::DECKHAND_INTEREST_1,
                'created_at' => $now,
            ]
        );
    }
}