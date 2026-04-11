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
        Schema::create('vessel_qualified_captains', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('vessel_id')->constrained('vessels');
            $table->foreignUuid('captain_id')->constrained('captain_profiles');
            $table->enum('status', ['pending', 'qualified', 'rejected'])->default('pending');
            $table->timestamp('qualified_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['vessel_id', 'captain_id']);
            $table->index('status');
            $table->index('vessel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vessel_qualified_captains');
    }
};
