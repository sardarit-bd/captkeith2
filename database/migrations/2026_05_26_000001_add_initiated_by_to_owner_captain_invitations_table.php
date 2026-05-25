<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('owner_captain_invitations', function (Blueprint $table) {
            $table->enum('initiated_by', ['owner', 'captain'])->default('owner')->after('status');
        });
    }

    public function down(): void
    {
        Schema::table('owner_captain_invitations', function (Blueprint $table) {
            $table->dropColumn('initiated_by');
        });
    }
};
