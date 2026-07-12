<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Clean up the incorrectly created BIGINT columns from the previous failed run
        if (Schema::hasColumn('charter_events', 'captain_id')) {
            Schema::table('charter_events', function (Blueprint $table) {
                $table->dropColumn('captain_id');
            });
        }

        if (Schema::hasColumn('charter_events', 'deckhand_id')) {
            Schema::table('charter_events', function (Blueprint $table) {
                $table->dropColumn('deckhand_id');
            });
        }

        // 2. Add the columns correctly as UUIDs with proper foreign keys
        Schema::table('charter_events', function (Blueprint $table) {
            $table->uuid('captain_id')->nullable()->constrained('captain_profiles')->nullOnDelete();
            
            // If you also have a deckhand_id in this migration, ensure it's also a uuid:
            // $table->uuid('deckhand_id')->nullable()->constrained('deckhand_profiles')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('charter_events', function (Blueprint $table) {
            if (Schema::hasColumn('charter_events', 'captain_id')) {
                $table->dropForeign(['captain_id']);
                $table->dropColumn('captain_id');
            }
            
            if (Schema::hasColumn('charter_events', 'deckhand_id')) {
                $table->dropForeign(['deckhand_id']);
                $table->dropColumn('deckhand_id');
            }
        });
    }
};