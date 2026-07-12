<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charter_events', function (Blueprint $table) {
            $table->decimal('rental_cost', 10, 2)->default(0)->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('charter_events', function (Blueprint $table) {
            $table->dropColumn('rental_cost');
        });
    }
};
