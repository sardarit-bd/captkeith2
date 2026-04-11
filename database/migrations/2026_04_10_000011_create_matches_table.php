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
        Schema::create('matches', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('vessel_id')->constrained('vessels');
            $table->uuid('profile_id');
            $table->enum('profile_type', ['captain', 'deckhand']);
            $table->unsignedTinyInteger('match_score');
            $table->json('match_reasons');
            $table->boolean('owner_notified')->default(false);
            $table->boolean('profile_notified')->default(false);
            $table->timestamps();

            $table->index(['vessel_id', 'profile_type']);
            $table->index(['profile_id', 'profile_type']);
            $table->index('match_score');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
