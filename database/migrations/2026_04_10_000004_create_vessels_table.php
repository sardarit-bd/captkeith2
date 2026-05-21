<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('vessels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('owner_id')->constrained('owner_profiles');
            $table->string('name', 100);
            $table->string('official_number', 50)->unique();
            $table->string('make', 100);
            $table->string('model', 100);
            $table->decimal('length_ft', 6, 2);
            $table->decimal('beam_ft', 6, 2);
            $table->decimal('draft_ft', 6, 2);
            $table->enum('vessel_type', ['power', 'sailing']);
            $table->string('marina_name', 150);
            $table->string('marina_address', 255);
            $table->string('marina_city', 100);
            $table->string('marina_state', 50);
            $table->string('marina_zip', 10);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->text('operating_area');
            $table->boolean('requires_deckhand')->default(false);
            $table->enum('required_license_type', ['oupv', 'masters']);
            $table->enum('required_endorsement', ['inland', 'near_coastal', 'unlimited']);
            $table->unsignedSmallInteger('required_tonnage_rating');
            $table->unsignedSmallInteger('required_years_experience')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('owner_id');
            $table->index('marina_zip');
            $table->index(
                ['required_license_type', 'required_endorsement', 'required_tonnage_rating'],
                'vessels_license_match_idx',
            );
            $table->index(['is_active', 'deleted_at']);
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('vessels');
    }
};
