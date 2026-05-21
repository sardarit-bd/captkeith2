<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('captain_vessel_interest', function (Blueprint $table) {
            $table->enum('status', ['pending', 'accepted', 'declined'])
                ->default('pending')
                ->after('vessel_id');
        });
    }

    public function down(): void
    {
        Schema::table('captain_vessel_interest', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
