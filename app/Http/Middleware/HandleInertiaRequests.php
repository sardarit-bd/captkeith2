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


            // pending owner invitations for captain prifile
            'pendingOwnerInvitationsCount' => fn () => ($request->user() && $request->user()->hasRole('captain') && $request->user()->captainProfile)
                ? \App\Models\OwnerCaptainInvitation::where('captain_id', $request->user()->captainProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'owner')
                    ->count()
                : 0,
                // pending charter invitations for captain prifile
                'pendingCharterInvitationsCount' => fn () => ($request->user() && $request->user()->hasRole('captain') && $request->user()->captainProfile)
                    ? \App\Models\CharterCrewResponse::where('profile_id', $request->user()->captainProfile->id)
                        ->where('crew_role', 'captain')
                        ->where('response', 'pending')
                        ->count()
                    : 5,

            // pending captain requests for owner prifile
            'pendingCaptainRequestsCount' => fn () => ($request->user() && $request->user()->hasRole('owner') && $request->user()->ownerProfile)
                ? \App\Models\OwnerCaptainInvitation::where('owner_id', $request->user()->ownerProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'captain')
                    ->count()
                : 0,
                

                // pending deckhand requests for owner prifile
                'pendingDeckhandRequestsCount' => fn () => ($request->user() && $request->user()->hasRole('owner') && $request->user()->ownerProfile)
                ? \App\Models\OwnerDeckhandInvitation::where('owner_id', $request->user()->ownerProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'deckhand')
                    ->count()
                : 0,

                // pending charterer requests for captain prifile
                'pendingChartererRequestsCount' => fn () => ($request->user() && $request->user()->hasRole('owner') && $request->user()->ownerProfile)
                ? \App\Models\OwnerDeckhandInvitation::where('owner_id', $request->user()->ownerProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'deckhand')
                    ->count()
                : 0,
                // pending charterer requests for captain prifile
                'pendingownerRequestsCount' => fn () => ($request->user() && $request->user()->hasRole('owner') && $request->user()->ownerProfile)
                ? \App\Models\OwnerDeckhandInvitation::where('owner_id', $request->user()->ownerProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'deckhand')
                    ->count()
                : 0,
                // pending charterer requests for captain prifile
                'pendingOwnerInvitationsCountForDeckhand' => fn () => ($request->user() && $request->user()->hasRole('deckhand') && $request->user()->deckhandProfile)
                ? \App\Models\OwnerDeckhandInvitation::where('deckhand_id', $request->user()->deckhandProfile->id)
                    ->where('status', 'pending')
                    ->where('initiated_by', 'owner')
                    ->count()
                : 0,
                // pending charterer requests for captain prifile
                'pendingCaptainInvitationsCountForDeckhand' => fn () => ($request->user() && $request->user()->hasRole('deckhand') && $request->user()->deckhandProfile)
                ? \App\Models\CharterCrewResponse::where('profile_id', $request->user()->deckhandProfile->id)
            ->where('crew_role', 'deckhand')
            ->where('response', 'pending')
            ->count()
                : 3,

            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'downloadUrl' => fn () => $request->session()->get('downloadUrl'),
            ],
        ];
    }
}