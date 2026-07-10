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

        $requests = $query->latest()->get()->map(fn($req) => [
            'id' => $req->id,
            'user_name' => $req->user?->name ?? 'Unknown',
            'role' => ucfirst($req->profile_type),
            'amount' => $req->amount,
            'fee' => $req->fee ?? 0,
            'net_amount' => $req->amount - ($req->fee ?? 0),
            'status' => $req->status,
            'requested_at' => $req->requested_at?->format('M d, Y H:i'),
        ]);

        return Inertia::render('admin/withdrawals', [
            'requests' => $requests,
            'filters' => ['status' => $request->status],
        ]);
    }

    public function updateStatus(Request $request, string $id)
    {
        $request->validate(['status' => 'required|in:approved,rejected,completed']);
        
        $withdrawal = WithdrawalRequest::findOrFail($id);
        $newStatus = $request->status;

        if ($newStatus === 'completed') {
            $withdrawal->update(['status' => 'completed', 'completed_at' => now()]);
        } else {
            $withdrawal->update(['status' => $newStatus]);
        }

        // Notify User
        $withdrawal->user->notify(new WithdrawalStatusUpdatedNotification($withdrawal, $newStatus));

        return back()->with('success', "Withdrawal marked as {$newStatus}.");
    }
}