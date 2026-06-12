<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->string('agreement_type')->nullable()->after('crew_role');
            $table->string('pdf_path')->nullable()->after('agreement_type');
        });
    }

    public function down(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            $table->dropColumn(['agreement_type', 'pdf_path']);
        });
    }
};