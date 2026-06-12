<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class ShareNotificationCount
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
           
            Inertia::share('notificationsUnreadCount', fn () => $request->user()->unreadNotifications()->count());
        }

        return $next($request);
    }
}   