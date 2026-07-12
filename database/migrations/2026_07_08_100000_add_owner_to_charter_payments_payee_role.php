<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Add 'owner' to the existing ENUM list
        DB::statement("ALTER TABLE `charter_payments` MODIFY COLUMN `payee_role` ENUM('captain', 'deckhand', 'insurance_vendor', 'owner') NOT NULL");
    }

    public function down(): void
    {
        // Revert back to the original ENUM list
        DB::statement("ALTER TABLE `charter_payments` MODIFY COLUMN `payee_role` ENUM('captain', 'deckhand', 'insurance_vendor') NOT NULL");
    }
};