<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WithdrawalRequest;
use App\Notifications\WithdrawalStatusUpdatedNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WithdrawalController extends Controller
{
    public function index(Request $request)
    {
        $query = WithdrawalRequest::with('user');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $requests = $query->latest()->get()->map(function ($req) {
            $profile = match ($req->profile_type) {
                'owner' => \App\Models\OwnerProfile::find($req->profile_id),
                'captain' => \App\Models\CaptainProfile::find($req->profile_id),
                'deckhand' => \App\Models\DeckhandProfile::find($req->profile_id),
                default => null,
            };

            return [
                'id' => $req->id,
                'user_name' => $profile?->full_name ?? 'Unknown',
                'profile_type' => $req->profile_type,
                'amount' => $req->amount,
                'fee' => $req->fee ?? 0,
                'net_amount' => $req->amount - ($req->fee ?? 0),
                'status' => $req->status,
                'requested_at' => $req->requested_at,
                'bank_name' => $req->bank_name,
                'bank_account_holder_name' => $req->bank_account_holder_name,
                'bank_account_number' => $req->bank_account_number,
                'bank_routing_number' => $req->bank_routing_number,
            ];
        });

        return Inertia::render('admin/withdrawals', [
            'requests' => $requests,
            'filters' => ['status' => $request->status],
        ]);
    }

    public function updateStatus(Request $request, string $id)
    {
        $request->validate(['status' => 'required|in:pending,completed,cancelled']);

        $withdrawal = WithdrawalRequest::findOrFail($id);
        $newStatus = $request->status;

        if ($newStatus === 'completed') {
            $withdrawal->update(['status' => 'completed', 'completed_at' => now()]);
        } else {
            $withdrawal->update(['status' => $newStatus]);
        }

        $withdrawal->user->notify(new WithdrawalStatusUpdatedNotification($withdrawal, $newStatus));

        return back()->with('success', "Withdrawal marked as {$newStatus}.");
    }

    public function complete(Request $request, string $id)
    {

        $withdrawal = WithdrawalRequest::findOrFail($id);

        $withdrawal->update([
            'status' => 'completed',
            'completed_at' => now(),
        ]);

        $withdrawal->user->notify(new WithdrawalStatusUpdatedNotification($withdrawal, 'completed'));

        return back()->with('success', 'Withdrawal marked as completed.');
    }
}
