<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ComplianceCheckSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('compliance_checks')->upsert(
            [
                [
                    'id' => SeedIds::COMPLIANCE_CHECK_1,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'check_type' => 'min_two_captains',
                    'passed' => true,
                    'metadata' => json_encode(['qualified_count' => 2], JSON_THROW_ON_ERROR),
                    'checked_at' => now(),
                ],
                [
                    'id' => SeedIds::COMPLIANCE_CHECK_2,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'check_type' => 'min_one_deckhand',
                    'passed' => true,
                    'metadata' => json_encode(['qualified_count' => 1], JSON_THROW_ON_ERROR),
                    'checked_at' => now(),
                ],
            ],
            ['id'],
            ['charter_event_id', 'check_type', 'passed', 'metadata', 'checked_at']
        );
    }
}
