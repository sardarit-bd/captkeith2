<?php

namespace App\Http\Controllers;

use App\Models\CharterPayment;
use App\Models\WithdrawalRequest;
use App\Models\OwnerProfile;
use App\Models\CaptainProfile;
use App\Models\DeckhandProfile;
use App\Services\WalletService;
use App\Notifications\WithdrawalRequestedNotification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    protected WalletService $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $balance = $this->walletService->getBalanceBreakdown($user);
        $settings = $this->walletService->getWithdrawalSettings();
        
        $history = WithdrawalRequest::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(fn($req) => [
                'id' => $req->id,
                'amount' => $req->amount,
                'fee' => $req->fee ?? 0,
                'net_amount' => $req->amount - ($req->fee ?? 0),
                'status' => $req->status,
                'created_at' => $req->created_at->format('M d, Y H:i'),
            ]);

        return Inertia::render('withdrawal', [
            'balance' => $balance,
            'settings' => $settings,
            'history' => $history,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $settings = $this->walletService->getWithdrawalSettings();
        
        $request->validate([
            'amount' => ['required', 'numeric', 'min:' . $settings['min_amount']],
        ]);

        $amount = $request->amount;
        $fee = round($amount * ($settings['fee_percentage'] / 100), 2);
        
        $result = DB::transaction(function () use ($user, $amount, $fee) {
         
            WithdrawalRequest::where('user_id', $user->id)->lockForUpdate()->get();

            $balance = $this->walletService->getBalanceBreakdown($user);
            
            if ($amount > $balance['available_balance']) {
                throw new \Exception('Insufficient available balance.');
            }

            $profile = OwnerProfile::where('user_id', $user->id)->first() 
                ?? CaptainProfile::where('user_id', $user->id)->first() 
                ?? DeckhandProfile::where('user_id', $user->id)->first();

            return WithdrawalRequest::create([
                'user_id' => $user->id,
                'profile_type' => $profile instanceof OwnerProfile ? 'owner' : ($profile instanceof CaptainProfile ? 'captain' : 'deckhand'),
                'profile_id' => $profile->id,
                'amount' => $amount,
                'fee' => $fee,
                'status' => 'pending',
                'requested_at' => now(),
            ]);
        });

        // Notify Admins
        $admins = User::role('admin')->get();
        if ($admins->isNotEmpty()) {
            Notification::send($admins, new WithdrawalRequestedNotification($result));
        }

        return back()->with('success', 'Withdrawal requested successfully.');
    }
}