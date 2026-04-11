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
        Schema::create('charter_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('vessel_id')->constrained('vessels');
            $table->foreignUuid('charterer_id')->nullable()->constrained('charterer_profiles');
            $table->foreignUuid('selected_captain_id')->nullable()->constrained('captain_profiles');
            $table->foreignUuid('selected_deckhand_id')->nullable()->constrained('deckhand_profiles');
            $table->date('charter_date');
            $table->time('start_time');
            $table->unsignedSmallInteger('duration_minutes');
            $table->text('special_notes')->nullable();
            $table->enum('status', [
                'draft',
                'awaiting_responses',
                'ready_for_charterer',
                'captain_selected',
                'agreements_pending',
                'agreements_signed',
                'insurance_pending',
                'insurance_complete',
                'completed',
                'cancelled',
            ])->default('draft');
            $table->string('invite_token', 100)->unique();
            $table->timestamp('invite_token_expires_at');
            $table->timestamps();
            $table->softDeletes();

            $table->index('vessel_id');
            $table->index('charterer_id');
            $table->index('status');
            $table->index('charter_date');
            $table->index(['vessel_id', 'charter_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charter_events');
    }
};
