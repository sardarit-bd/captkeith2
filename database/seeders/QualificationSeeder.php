<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QualificationSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('vessel_qualified_captains')->upsert(
            [
                [
                    'id' => SeedIds::QUALIFIED_CAPTAIN_1,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'captain_id' => SeedIds::CAPTAIN_PROFILE_1,
                    'status' => 'qualified',
                    'qualified_at' => $now,
                    'notes' => 'Preferred captain',
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ],
                [
                    'id' => SeedIds::QUALIFIED_CAPTAIN_2,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'captain_id' => SeedIds::CAPTAIN_PROFILE_2,
                    'status' => 'pending',
                    'qualified_at' => null,
                    'notes' => null,
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ],
            ],
            ['vessel_id', 'captain_id'],
            ['status', 'qualified_at', 'notes', 'updated_at', 'deleted_at']
        );

        DB::table('vessel_qualified_deckhands')->upsert(
            [
                [
                    'id' => SeedIds::QUALIFIED_DECKHAND_1,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'deckhand_id' => SeedIds::DECKHAND_PROFILE_1,
                    'status' => 'qualified',
                    'qualified_at' => $now,
                    'notes' => 'Great hospitality experience',
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ],
            ],
            ['vessel_id', 'deckhand_id'],
            ['status', 'qualified_at', 'notes', 'updated_at', 'deleted_at']
        );
    }
}
