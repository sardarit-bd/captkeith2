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
        Schema::create('insurance_policies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('charter_event_id')->unique()->constrained('charter_events');
            $table->string('vquip_policy_id', 255)->nullable();
            $table->string('policy_s3_key', 500)->nullable();
            $table->enum('status', ['pending', 'purchased', 'failed'])->default('pending');
            $table->decimal('premium_amount', 10, 2)->nullable();
            $table->date('coverage_start')->nullable();
            $table->date('coverage_end')->nullable();
            $table->timestamp('issued_at')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('vquip_policy_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insurance_policies');
    }
};
