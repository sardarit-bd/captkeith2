<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InsurancePolicySeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('insurance_policies')->upsert(
            [
                [
                    'id' => SeedIds::INSURANCE_POLICY_1,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'vquip_policy_id' => 'VQ-SEED-0001',
                    'policy_s3_key' => 'seed/policies/policy-1.pdf',
                    'status' => 'purchased',
                    'premium_amount' => 249.99,
                    'coverage_start' => now()->addDays(14)->toDateString(),
                    'coverage_end' => now()->addDays(14)->toDateString(),
                    'issued_at' => $now,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['charter_event_id'],
            ['vquip_policy_id', 'policy_s3_key', 'status', 'premium_amount', 'coverage_start', 'coverage_end', 'issued_at', 'updated_at']
        );
    }
}
