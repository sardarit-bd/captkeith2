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
        Schema::create('charter_payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->constrained('charter_events');
            $table->foreignUuid('charterer_id')->nullable()->constrained('charterer_profiles');
            $table->foreignUuid('hire_agreement_id')
                ->nullable()
                ->constrained('charter_hire_agreements');

            $table->enum('payment_type', ['crew_hire', 'insurance']);
            $table->enum('payee_role', ['captain', 'deckhand', 'insurance_vendor']);
            $table->foreignUuid('captain_profile_id')->nullable()->constrained('captain_profiles');
            $table->foreignUuid('deckhand_profile_id')->nullable()->constrained('deckhand_profiles');

            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('status', [
                'pending',
                'requires_action',
                'processing',
                'paid',
                'failed',
                'refunded',
                'cancelled',
            ])->default('pending');
            $table->string('provider', 100)->nullable();
            $table->string('provider_payment_id', 255)->nullable();
            $table->string('provider_transfer_id', 255)->nullable();
            $table->json('metadata')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->timestamp('refunded_at')->nullable();

            $table->timestamps();

            $table->unique('hire_agreement_id');
            $table->index('charter_event_id');
            $table->index('charterer_id');
            $table->index('captain_profile_id');
            $table->index('deckhand_profile_id');
            $table->index(['payment_type', 'payee_role']);
            $table->index('status');
            $table->index('provider_payment_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('charter_payments');
    }
};
