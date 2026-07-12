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
            'bankDetails' => [
                'bank_name' => $user->bank_name,
                'bank_account_holder_name' => $user->bank_account_holder_name,
                'bank_account_number' => $user->bank_account_number,
                'bank_routing_number' => $user->bank_routing_number,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $settings = $this->walletService->getWithdrawalSettings();

        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:' . $settings['min_amount']],
            'bank_name' => ['required', 'string', 'max:255'],
            'bank_account_holder_name' => ['required', 'string', 'max:255'],
            'bank_account_number' => ['required', 'string', 'max:255'],
            'bank_routing_number' => ['required', 'string', 'max:255'],
        ]);

        $amount = $validated['amount'];
        $fee = round($amount * ($settings['fee_percentage'] / 100), 2);

        $result = DB::transaction(function () use ($user, $amount, $fee, $validated) {

            WithdrawalRequest::where('user_id', $user->id)->lockForUpdate()->get();

            $balance = $this->walletService->getBalanceBreakdown($user);

            if ($amount > $balance['available_balance']) {
                throw new \Exception('Insufficient available balance.');
            }

            $profile = OwnerProfile::where('user_id', $user->id)->first()
                ?? CaptainProfile::where('user_id', $user->id)->first()
                ?? DeckhandProfile::where('user_id', $user->id)->first();

            // Save/update bank details on the user for reuse next time.
            $user->update([
                'bank_name' => $validated['bank_name'],
                'bank_account_holder_name' => $validated['bank_account_holder_name'],
                'bank_account_number' => $validated['bank_account_number'],
                'bank_routing_number' => $validated['bank_routing_number'],
            ]);

            return WithdrawalRequest::create([
                'user_id' => $user->id,
                'profile_type' => $profile instanceof OwnerProfile ? 'owner' : ($profile instanceof CaptainProfile ? 'captain' : 'deckhand'),
                'profile_id' => $profile->id,
                'amount' => $amount,
                'fee' => $fee,
                'status' => 'pending',
                'bank_name' => $validated['bank_name'],
                'bank_account_holder_name' => $validated['bank_account_holder_name'],
                'bank_account_number' => $validated['bank_account_number'],
                'bank_routing_number' => $validated['bank_routing_number'],
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
