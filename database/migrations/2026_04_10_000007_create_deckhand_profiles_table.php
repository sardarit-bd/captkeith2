<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('deckhand_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->unique()->constrained('users');
            $table->string('full_name', 150);
            $table->string('phone', 20);
            $table->string('address', 255);
            $table->string('city', 100);
            $table->string('state', 50);
            $table->string('zip_code', 10);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->unsignedSmallInteger('travel_radius_miles');
            $table->unsignedSmallInteger('years_experience');
            $table->boolean('has_server_experience')->default(false);
            $table->boolean('has_bartending_experience')->default(false);
            $table->string('resume_path', 500)->nullable();
            $table->string('photo_path', 500)->nullable();
            $table->decimal('hourly_rate', 8, 2);
            $table->timestamps();
            $table->softDeletes();

            $table->index('zip_code');
            $table->index(['latitude', 'longitude']);
            $table->index(['has_server_experience', 'has_bartending_experience'], 'deckhand_experience_idx');
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('deckhand_profiles');
    }
};
