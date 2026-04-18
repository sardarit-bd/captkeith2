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
        Schema::create('charter_hire_agreements', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->constrained('charter_events');
            $table->foreignUuid('charterer_id')->nullable()->constrained('charterer_profiles');
            $table->enum('crew_role', ['captain', 'deckhand']);
            $table->foreignUuid('captain_profile_id')->nullable()->constrained('captain_profiles');
            $table->foreignUuid('deckhand_profile_id')->nullable()->constrained('deckhand_profiles');
            $table->enum('initiated_by', ['charterer', 'captain'])->default('charterer');
            $table->enum('payor', ['charterer'])->default('charterer');

            $table->string('s3_key', 500)->nullable();
            $table->string('esign_envelope_id', 255)->nullable();
            $table->enum('sign_status', [
                'not_sent',
                'sent',
                'partially_signed',
                'fully_signed',
                'cancelled',
            ])->default('not_sent');
            $table->string('charterer_sign_url', 1000)->nullable();
            $table->string('crew_sign_url', 1000)->nullable();
            $table->timestamp('charterer_signed_at')->nullable();
            $table->timestamp('crew_signed_at')->nullable();
            $table->timestamp('fully_signed_at')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->unique(
                ['charter_event_id', 'crew_role'],
                'cha_event_role_unique',
            );
            $table->index('charter_event_id');
            $table->index('charterer_id');
            $table->index('captain_profile_id');
            $table->index('deckhand_profile_id');
            $table->index('sign_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charter_hire_agreements');
    }
};
