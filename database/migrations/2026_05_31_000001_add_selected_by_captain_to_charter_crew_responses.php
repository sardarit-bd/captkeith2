<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('charter_crew_responses', function (Blueprint $table) {

            $table->foreignUuid('selected_by_captain_id')
                ->nullable()
                ->after('expires_at')
                ->constrained('captain_profiles')
                ->nullOnDelete();

            $table->index('selected_by_captain_id');
        });
    }

    public function down(): void
    {
        Schema::table('charter_crew_responses', function (Blueprint $table) {
            $table->dropForeign(['selected_by_captain_id']);
            $table->dropIndex(['selected_by_captain_id']);
            $table->dropColumn('selected_by_captain_id');
        });
    }
};
