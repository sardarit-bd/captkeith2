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
        Schema::create('compliance_checks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->constrained('charter_events');
            $table->enum('check_type', [
                'min_two_captains',
                'owner_exclusion',
                'min_one_deckhand',
                'captain_hire_agreement_signed',
                'vessel_charter_agreement_signed',
                'insurance_purchased',
            ]);
            $table->boolean('passed');
            $table->json('metadata')->nullable();
            $table->timestamp('checked_at');

            $table->index('charter_event_id');
            $table->index('check_type');
            $table->index('passed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compliance_checks');
    }
};
