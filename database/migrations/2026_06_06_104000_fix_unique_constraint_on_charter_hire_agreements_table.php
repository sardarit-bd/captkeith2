<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropUnique('cha_event_role_unique');
            $table->unique(
                ['charter_event_id', 'crew_role', 'captain_profile_id'], 
                'cha_event_role_captain_unique'
            );
        });
    }


    public function down(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropUnique('cha_event_role_captain_unique');
            $table->unique(['charter_event_id', 'crew_role'], 'cha_event_role_unique');
        });
    }
};