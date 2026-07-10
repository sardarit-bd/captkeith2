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
        // Step 1: Temporarily change the column to VARCHAR to bypass ENUM strictness
        DB::statement("ALTER TABLE `charter_events` MODIFY COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'draft'");

        // Step 2: Clean up any invalid statuses that currently exist in the database
        // Any status not in our final list will be safely reset to 'draft'
        DB::table('charter_events')
            ->whereNotIn('status', [
                'draft', 
                'awaiting_responses', 
                'agreements_signed', 
                'confirmed', 
                'completed', 
                'cancelled', 
                'deleted'
            ])
            ->update(['status' => 'draft']);

        // Step 3: Safely convert back to ENUM with the new 'confirmed' value included
        DB::statement("ALTER TABLE `charter_events` MODIFY COLUMN `status` ENUM('draft', 'awaiting_responses', 'agreements_signed', 'confirmed', 'completed', 'cancelled', 'deleted') NOT NULL DEFAULT 'draft'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Step 1: Temporarily change to VARCHAR to safely remove 'confirmed'
        DB::statement("ALTER TABLE `charter_events` MODIFY COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'draft'");

        // Step 2: Revert any 'confirmed' statuses back to 'draft'
        DB::table('charter_events')
            ->where('status', 'confirmed')
            ->update(['status' => 'draft']);

        // Step 3: Revert back to the original ENUM (without 'confirmed')
        DB::statement("ALTER TABLE `charter_events` MODIFY COLUMN `status` ENUM('draft', 'awaiting_responses', 'agreements_signed', 'completed', 'cancelled', 'deleted') NOT NULL DEFAULT 'draft'");
    }
};