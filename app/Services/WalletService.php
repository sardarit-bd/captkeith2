<?php

namespace App\Services;

use App\Models\CharterPayment;
use App\Models\WithdrawalRequest;
use App\Models\OwnerProfile;
use App\Models\CaptainProfile;
use App\Models\DeckhandProfile;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class WalletService
{
    public function getBalanceBreakdown(User $user): array
    {
        $earned = $this->calculateTotalEarnings($user);
        $pending = $this->calculatePendingWithdrawals($user);
        $withdrawn = $this->calculateTotalWithdrawn($user);

        return [
            'current_balance' => round($earned, 2),
            'pending_withdrawal' => round($pending, 2),
            'total_withdrawn' => round($withdrawn, 2),
            'available_balance' => round(max(0, $earned - $pending), 2),
        ];
    }

    public function calculateTotalEarnings(User $user): float
    {
        return CharterPayment::where('status', 'paid')
            ->whereHas('charterEvent', fn($q) => $q->where('status', 'completed'))
            ->where(function ($q) use ($user) {
                $owner = OwnerProfile::where('user_id', $user->id)->first();
                $captain = CaptainProfile::where('user_id', $user->id)->first();
                $deckhand = DeckhandProfile::where('user_id', $user->id)->first();

                if ($owner) {
                    $q->orWhere(function ($sub) use ($owner) {
                        $sub->where('payee_role', 'owner')
                            ->whereHas('charterEvent.vessel', fn($v) => $v->where('owner_id', $owner->id));
                    });
                }
                if ($captain) {
                    $q->orWhere(function ($sub) use ($captain) {
                        $sub->where('payee_role', 'captain')
                            ->where('captain_profile_id', $captain->id);
                    });
                }
                if ($deckhand) {
                    $q->orWhere(function ($sub) use ($deckhand) {
                        $sub->where('payee_role', 'deckhand')
                            ->where('deckhand_profile_id', $deckhand->id);
                    });
                }
            })
            ->sum('amount');
    }

    private function calculatePendingWithdrawals(User $user): float
    {
        return WithdrawalRequest::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'approved'])
            ->sum('amount');
    }

    private function calculateTotalWithdrawn(User $user): float
    {
        return WithdrawalRequest::where('user_id', $user->id)
            ->where('status', 'completed')
            ->sum('amount');
    }

    public function getWithdrawalSettings(): array
    {
        $settings = DB::table('platform_settings')->first();
        $current = $settings ? json_decode($settings->settings, true) : [];
        
        return [
            'min_amount' => $current['withdrawals']['min_amount'] ?? 50.00,
            'fee_percentage' => $current['withdrawals']['fee_percentage'] ?? 2.5,
        ];
    }
}