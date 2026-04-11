<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VesselSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();

        DB::table('vessels')->upsert(
            [
                [
                    'id' => SeedIds::VESSEL_1,
                    'owner_id' => SeedIds::OWNER_PROFILE,
                    'name' => 'Sea Whisper',
                    'official_number' => 'CK-SEA-0001',
                    'make' => 'Beneteau',
                    'model' => 'Oceanis 41.1',
                    'length_ft' => 41.10,
                    'beam_ft' => 13.90,
                    'draft_ft' => 7.20,
                    'vessel_type' => 'sailing',
                    'marina_name' => 'Miami Beach Marina',
                    'marina_address' => '300 Alton Rd',
                    'marina_city' => 'Miami Beach',
                    'marina_state' => 'FL',
                    'marina_zip' => '33139',
                    'latitude' => 25.7710,
                    'longitude' => -80.1340,
                    'operating_area' => 'Biscayne Bay and nearby coastal waters',
                    'requires_deckhand' => true,
                    'required_license_type' => 'masters',
                    'required_endorsement' => 'near_coastal',
                    'required_tonnage_rating' => 100,
                    'required_years_experience' => 3,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                    'deleted_at' => null,
                ],
            ],
            ['official_number'],
            [
                'owner_id',
                'name',
                'make',
                'model',
                'length_ft',
                'beam_ft',
                'draft_ft',
                'vessel_type',
                'marina_name',
                'marina_address',
                'marina_city',
                'marina_state',
                'marina_zip',
                'latitude',
                'longitude',
                'operating_area',
                'requires_deckhand',
                'required_license_type',
                'required_endorsement',
                'required_tonnage_rating',
                'required_years_experience',
                'is_active',
                'updated_at',
                'deleted_at',
            ]
        );

        DB::table('vessel_photos')->upsert(
            [
                [
                    'id' => SeedIds::VESSEL_PHOTO_1,
                    'vessel_id' => SeedIds::VESSEL_1,
                    'image_path' => 'seed/vessels/sea-whisper-1.jpg',
                    'display_order' => 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ],
            ],
            ['id'],
            ['vessel_id', 'image_path', 'display_order', 'updated_at']
        );
    }
}
