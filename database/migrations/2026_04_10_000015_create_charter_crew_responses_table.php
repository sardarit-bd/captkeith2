<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('charter_crew_responses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->constrained('charter_events');
            $table->uuid('profile_id');
            $table->enum('crew_role', ['captain', 'deckhand']);
            $table->enum('response', ['pending', 'available', 'unavailable'])->default('pending');
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();

            $table->unique(
                ['charter_event_id', 'profile_id', 'crew_role'],
                'ccr_event_profile_role_unique'
            );
            $table->index('charter_event_id');
            $table->index(['charter_event_id', 'crew_role']);
            $table->index('response');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charter_crew_responses');
    }
};
