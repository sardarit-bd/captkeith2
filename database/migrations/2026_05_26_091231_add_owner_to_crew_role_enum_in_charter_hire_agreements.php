<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modify the ENUM column to include 'owner'
        DB::statement("ALTER TABLE `charter_hire_agreements` MODIFY COLUMN `crew_role` ENUM('captain', 'deckhand', 'owner') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to the original ENUM values
        DB::statement("ALTER TABLE `charter_hire_agreements` MODIFY COLUMN `crew_role` ENUM('captain', 'deckhand') NOT NULL");
    }
};