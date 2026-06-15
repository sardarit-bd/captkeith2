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
            'unreadNotificationsCount' => fn () => $request->user() 
                ? $request->user()->unreadNotifications()->count() 
                : 0,
            
            'pendingOwnerInvitationsCount' => fn () => ($request->user() && $request->user()->hasRole('captain') && $request->user()->captainProfile) 
                ? \App\Models\OwnerCaptainInvitation::where('captain_id', $request->user()->captainProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'owner') 
                    ->count() 
                : 0,
                
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}