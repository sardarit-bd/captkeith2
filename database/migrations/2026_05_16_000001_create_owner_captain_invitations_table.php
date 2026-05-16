<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('owner_captain_invitations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('owner_id')->constrained('owner_profiles');
            $table->foreignUuid('captain_id')->constrained('captain_profiles');
            $table->foreignUuid('vessel_id')->constrained('vessels');
            $table->enum('status', ['pending', 'accepted', 'declined'])->default('pending');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable();

            $table->unique(['owner_id', 'captain_id', 'vessel_id']);
            $table->index('captain_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('owner_captain_invitations');
    }
};
