<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Update Deckhand Profiles
        Schema::table('deckhand_profiles', function (Blueprint $table) {
            // Change to a nullable string
            $table->string('is_verified')->nullable()->default(null)->change();
        });

        // Update Captain Profiles (if applicable)
        Schema::table('captain_profiles', function (Blueprint $table) {
            $table->string('is_verified')->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('deckhand_profiles', function (Blueprint $table) {
            // Revert back to boolean/integer if you rollback
            $table->boolean('is_verified')->default(false)->change(); 
        });

        Schema::table('captain_profiles', function (Blueprint $table) {
            $table->boolean('is_verified')->default(false)->change();
        });
    }
};