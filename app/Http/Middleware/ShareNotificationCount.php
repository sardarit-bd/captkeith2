<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia; // ✅ Import the Inertia facade
use Symfony\Component\HttpFoundation\Response;

class ShareNotificationCount
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            // ✅ Use Inertia::share() with a closure for lazy evaluation
            Inertia::share('unreadNotificationsCount', fn () => $request->user()->unreadNotifications()->count());
        }

        return $next($request);
    }
}