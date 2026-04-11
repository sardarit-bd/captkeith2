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
        Schema::create('deckhand_vessel_interest', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('deckhand_id')->constrained('deckhand_profiles');
            $table->foreignUuid('vessel_id')->constrained('vessels');
            $table->timestamp('created_at')->useCurrent();

            $table->unique(['deckhand_id', 'vessel_id']);
            $table->index('vessel_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deckhand_vessel_interest');
    }
};
