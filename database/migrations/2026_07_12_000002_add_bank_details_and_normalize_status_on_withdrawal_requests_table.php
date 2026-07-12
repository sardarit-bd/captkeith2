<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('withdrawal_requests', function (Blueprint $table) {
            $table->string('bank_name')->nullable()->after('fee');
            $table->string('bank_account_holder_name')->nullable()->after('bank_name');
            $table->string('bank_account_number')->nullable()->after('bank_account_holder_name');
            $table->string('bank_routing_number')->nullable()->after('bank_account_number');
        });

        // Normalize legacy statuses to the pending/completed/cancelled model.
        DB::table('withdrawal_requests')->where('status', 'approved')->update(['status' => 'pending']);
        DB::table('withdrawal_requests')->where('status', 'rejected')->update(['status' => 'cancelled']);
    }

    public function down(): void
    {
        Schema::table('withdrawal_requests', function (Blueprint $table) {
            $table->dropColumn([
                'bank_name',
                'bank_account_holder_name',
                'bank_account_number',
                'bank_routing_number',
            ]);
        });
        // Note: status normalization is not reversible (original approved/rejected values are lost).
    }
};
