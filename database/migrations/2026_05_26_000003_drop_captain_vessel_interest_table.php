<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('captain_vessel_interest');
    }

    public function down(): void
    {
        // Cannot restore dropped table
    }
};
