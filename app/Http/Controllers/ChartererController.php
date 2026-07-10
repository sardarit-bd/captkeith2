<?php

namespace App\Http\Controllers;

use App\Models\CharterEvent;
use App\Notifications\CharterCompletionRequestNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartererController extends Controller
{
    public function requestCompletion(CharterEvent $charter)
    {
        // Verify the user is the owner
        if ($charter->vessel->owner_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // Check if charter is in confirmed status
        if ($charter->status !== 'confirmed') {
            return back()->with('error', 'Charter must be confirmed before requesting completion.');
        }

        // Send notification to charterer
        $charter->charterer->user->notify(
            new CharterCompletionRequestNotification($charter)
        );

        // Optionally update charter status or add a flag
        $charter->update([
            'completion_requested_at' => now(),
            'completion_requested_by' => auth()->id(),
        ]);

        return back()->with('success', 'Completion request sent to charterer.');
    }
}