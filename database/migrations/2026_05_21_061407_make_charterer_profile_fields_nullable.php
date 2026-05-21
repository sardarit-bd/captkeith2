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
        Schema::table('charterer_profiles', function (Blueprint $table) {
            $table->string('address', 255)->nullable()->change();
            $table->string('city', 100)->nullable()->change();
            $table->string('state', 50)->nullable()->change();
            $table->string('zip_code', 10)->nullable()->change();
            $table->string('phone', 20)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
