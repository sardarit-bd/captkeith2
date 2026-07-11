<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropUnique('cha_event_role_unique');
        });

        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->foreignUuid('owner_profile_id')->nullable()->after('deckhand_profile_id')->constrained('owner_profiles');
        });

        DB::statement("ALTER TABLE charter_hire_agreements MODIFY COLUMN crew_role ENUM('captain', 'deckhand', 'owner') NOT NULL");

        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->unique(['charter_event_id', 'crew_role', 'captain_profile_id'], 'cha_event_role_captain_unique')
                ->whereNotNull('captain_profile_id');
            $table->unique(['charter_event_id', 'crew_role', 'deckhand_profile_id'], 'cha_event_role_deckhand_unique')
                ->whereNotNull('deckhand_profile_id');
            $table->unique(['charter_event_id', 'crew_role', 'owner_profile_id'], 'cha_event_role_owner_unique')
                ->whereNotNull('owner_profile_id');
        });
    }

    public function down(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropUnique('cha_event_role_captain_unique');
            $table->dropUnique('cha_event_role_deckhand_unique');
            $table->dropUnique('cha_event_role_owner_unique');
        });

        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropForeign(['owner_profile_id']);
            $table->dropColumn('owner_profile_id');
        });

        DB::statement("ALTER TABLE charter_hire_agreements MODIFY COLUMN crew_role ENUM('captain', 'deckhand') NOT NULL");

        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->unique(['charter_event_id', 'crew_role'], 'cha_event_role_unique');
        });
    }
};
