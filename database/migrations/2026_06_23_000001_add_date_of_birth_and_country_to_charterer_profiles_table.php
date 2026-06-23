<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charterer_profiles', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable()->after('phone');
            $table->string('country', 100)->nullable()->after('date_of_birth');
        });
    }

    public function down(): void
    {
        Schema::table('charterer_profiles', function (Blueprint $table) {
            $table->dropColumn(['date_of_birth', 'country']);
        });
    }
};