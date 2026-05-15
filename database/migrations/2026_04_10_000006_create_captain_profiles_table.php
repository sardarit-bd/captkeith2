<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('captain_profiles', function (Blueprint $table) {
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
            $table->enum('license_type', ['oupv', 'masters']);
            $table->enum('endorsement', ['inland', 'near_coastal', 'unlimited']);
            $table->unsignedSmallInteger('tonnage_rating');
            $table->unsignedSmallInteger('years_experience');
            $table->text('boats_worked_on')->nullable();
            $table->text('bodies_of_water')->nullable();
            $table->text('geographic_area')->nullable();
            $table->string('resume_path', 500)->nullable();
            $table->string('license_doc_path', 500)->nullable();
            $table->decimal('hourly_rate', 8, 2);
            $table->boolean('can_provide_deckhand')->default(false);
            $table->decimal('deckhand_hourly_rate', 8, 2)->nullable();
            $table->string('photo_path', 500)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index('zip_code');
            $table->index(['license_type', 'endorsement', 'tonnage_rating'], 'captain_license_match_idx');
            $table->index('is_verified');
            $table->index(['latitude', 'longitude']);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('captain_profiles');
    }
};
