<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RoleAndPermissionSeeder::class,
            ProfileSeeder::class,
            VesselSeeder::class,
            QualificationSeeder::class,
            InterestSeeder::class,
            CharterEventSeeder::class,
            CharterCrewResponseSeeder::class,
            MatchSeeder::class,
            ComplianceCheckSeeder::class,
            LegalDocumentSeeder::class,
            InsurancePolicySeeder::class,
        ]);
    }
}
