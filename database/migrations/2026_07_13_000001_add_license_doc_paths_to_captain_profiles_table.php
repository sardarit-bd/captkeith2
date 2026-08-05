<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('captain_profiles', function (Blueprint $table) {
            $table->json('license_doc_paths')->nullable()->after('license_doc_path');
        });

        DB::table('captain_profiles')
            ->whereNotNull('license_doc_path')
            ->orderBy('id')
            ->cursor()
            ->each(function ($row) {
                DB::table('captain_profiles')
                    ->where('id', $row->id)
                    ->update([
                        'license_doc_paths' => json_encode([$row->license_doc_path]),
                    ]);
            });
    }

    public function down(): void
    {
        Schema::table('captain_profiles', function (Blueprint $table) {
            $table->dropColumn('license_doc_paths');
        });
    }
};