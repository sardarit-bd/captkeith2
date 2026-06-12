<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            if (!Schema::hasColumn('charter_hire_agreements', 'agreement_type')) {
                $table->string('agreement_type')->nullable();
            }
            if (!Schema::hasColumn('charter_hire_agreements', 'pdf_path')) {
                $table->string('pdf_path')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('charter_hire_agreements', function (Blueprint $table) {
            if (Schema::hasColumn('charter_hire_agreements', 'agreement_type')) {
                $table->dropColumn('agreement_type');
            }
            if (Schema::hasColumn('charter_hire_agreements', 'pdf_path')) {
                $table->dropColumn('pdf_path');
            }
        });
    }
};