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
        Schema::create('legal_documents', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->constrained('charter_events');
            $table->enum('doc_type', ['captain_hire_agreement', 'vessel_charter_agreement']);
            $table->string('s3_key', 500)->nullable();
            $table->string('esign_envelope_id', 255)->nullable();
            $table->enum('sign_status', ['not_sent', 'sent', 'partially_signed', 'fully_signed'])->default('not_sent');
            $table->string('charterer_sign_url', 1000)->nullable();
            $table->string('captain_sign_url', 1000)->nullable();
            $table->timestamp('signed_at')->nullable();
            $table->timestamps();

            $table->index('charter_event_id');
            $table->index(['charter_event_id', 'doc_type']);
            $table->index('sign_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legal_documents');
    }
};
