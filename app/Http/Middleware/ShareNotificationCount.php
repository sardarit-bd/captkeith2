<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;
use App\Models\OwnerProfile;
use App\Models\CaptainProfile;
use App\Models\OwnerCaptainInvitation;

class ShareNotificationCount
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($user = $request->user()) {
            Inertia::share('notificationsUnreadCount', function () use ($user) {
                $pendingCount = 0;

                // 1. Owner: Count only pending requests initiated by a captain
                $ownerProfile = OwnerProfile::where('user_id', $user->id)->first();
                if ($ownerProfile) {
                    $vesselIds = $ownerProfile->vessels()->pluck('id');
                    $pendingCount += OwnerCaptainInvitation::whereIn('vessel_id', $vesselIds)
                        ->where('status', 'pending')
                        ->where('initiated_by', 'captain')
                        ->count();
                }

                // 2. Captain: Count only pending invitations initiated by an owner
                $captainProfile = CaptainProfile::where('user_id', $user->id)->first();
                if ($captainProfile) {
                    $pendingCount += OwnerCaptainInvitation::where('captain_id', $captainProfile->id)
                        ->where('status', 'pending')
                        ->where('initiated_by', 'owner')
                        ->count();
                }

                return $pendingCount;
            });
        }

        return $next($request);
    }
}