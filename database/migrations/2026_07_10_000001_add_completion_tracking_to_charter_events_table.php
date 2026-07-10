<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charter_events', function (Blueprint $table) {
            $table->timestamp('completion_requested_at')->nullable()->after('status');
            $table->timestamp('completed_at')->nullable()->after('completion_requested_at');
        });
    }

    public function down(): void
    {
        Schema::table('charter_events', function (Blueprint $table) {
            $table->dropColumn(['completion_requested_at', 'completed_at']);
        });
    }
};