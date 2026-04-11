<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LegalDocumentSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('legal_documents')->upsert(
            [
                [
                    'id' => SeedIds::LEGAL_DOCUMENT_1,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'doc_type' => 'captain_hire_agreement',
                    's3_key' => 'seed/contracts/captain-hire-1.pdf',
                    'esign_envelope_id' => 'env-seed-001',
                    'sign_status' => 'fully_signed',
                    'charterer_sign_url' => null,
                    'captain_sign_url' => null,
                    'signed_at' => $now,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
                [
                    'id' => SeedIds::LEGAL_DOCUMENT_2,
                    'charter_event_id' => SeedIds::CHARTER_EVENT_1,
                    'doc_type' => 'vessel_charter_agreement',
                    's3_key' => 'seed/contracts/vessel-charter-1.pdf',
                    'esign_envelope_id' => 'env-seed-002',
                    'sign_status' => 'sent',
                    'charterer_sign_url' => 'https://example.test/sign/charterer',
                    'captain_sign_url' => null,
                    'signed_at' => null,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['charter_event_id', 'doc_type'],
            ['s3_key', 'esign_envelope_id', 'sign_status', 'charterer_sign_url', 'captain_sign_url', 'signed_at', 'updated_at']
        );
    }
}
