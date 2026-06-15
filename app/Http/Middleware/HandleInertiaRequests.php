<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user()?->load([
                    'ownerProfile',
                    'captainProfile',
                    'deckhandProfile',
                    'chartererProfile',
                ]),
                'role' => $request->user()?->getRoleNames()->first(),
                'permissions' => $request->user()?->getAllPermissions()->pluck('name')->values() ?? [],
            ],
            'notificationsUnreadCount' => fn () => $request->user() ? $request->user()->unreadNotifications()->count() : 0,
            
            // Added strict 'initiated_by' check here to prevent owner-sent invites from inflating the sidebar badge
            'pendingCaptainRequestsCount' => fn () => ($request->user() && $request->user()->hasRole('owner') && $request->user()->ownerProfile) 
                ? \App\Models\OwnerCaptainInvitation::where('owner_id', $request->user()->ownerProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'captain') 
                    ->count() 
                : 0,
                
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}