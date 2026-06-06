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
        Schema::table('vessels', function (Blueprint $table) {
            // Adding passenger_capacity as an integer. 
            // You can change ->unsigned() or ->nullable() based on your specific needs.
            $table->unsignedSmallInteger('passenger_capacity')->nullable()->after('operating_area');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vessels', function (Blueprint $table) {
            $table->dropColumn('passenger_capacity');
        });
    }
};