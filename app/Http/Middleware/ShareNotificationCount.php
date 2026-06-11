<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia; // 1. Import the Inertia facade

class ShareNotificationCount
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            $unreadCount = $request->user()->unreadNotifications()->count();
            Inertia::share('notifications', [
                'unreadCount' => $unreadCount,
            ]);
        }

        return $next($request);
    }
}