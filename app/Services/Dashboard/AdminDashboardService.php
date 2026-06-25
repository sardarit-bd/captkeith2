<?php

namespace App\Services\Dashboard;

use App\Models\CaptainProfile;
use App\Models\CharterEvent;
use App\Models\DeckhandProfile;
use App\Models\User;
use App\Models\Vessel;

class AdminDashboardService
{
    /**
     * Get overview data for the admin dashboard.
     *
     * @return array<string, mixed>
     */
    public function getOverviewData(): array
    {

        $pendingCaptains = CaptainProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(fn(CaptainProfile $profile) => [
                'id'           => $profile->user_id,
                'type'         => 'captain',
                'user_name'    => $profile->full_name,
                'user_role'    => 'Captain',
                'document_type' => 'Captain License',
                'submitted_at' => $profile->created_at->format('M d, Y'),
                'initials'     => $this->initials($profile->full_name),
                'is_verified'  => $profile->is_verified,
            ])
             ->values();

        $pendingDeckhands = DeckhandProfile::where('is_verified', 'pending')
            ->with('user')
            ->get()
            ->map(fn(DeckhandProfile $profile) => [
         
                'id'           => $profile->user_id, 
                'type'         => 'deckhand',
                'user_name'    => $profile->full_name,
                'user_role'    => 'Deckhand',
                'document_type' => 'Deckhand Application',
                'submitted_at' => $profile->created_at->format('M d, Y'),
                'initials'     => $this->initials($profile->full_name),
            ])
            ->values();

        $pendingVerifications = collect($pendingCaptains->all())
        ->merge($pendingDeckhands->all())
        ->values()
        ->all();


        $pendingVessels = Vessel::where('status', 'pending')
            ->with('ownerProfile')
            ->whereNull('deleted_at')
            ->latest()
            ->get()
            ->map(fn(Vessel $vessel) => [
                'id'               => $vessel->id,
                'name'             => $vessel->name,
                'type'             => ucfirst($vessel->vessel_type ?? 'Unknown'),
                'owner_name'       => $vessel->ownerProfile?->full_name ?? 'Unknown',
                'location'         => trim(collect([
                    $vessel->marina_city,
                    $vessel->marina_state,
                ])->filter()->implode(', ')) ?: 'N/A',
                'requires_deckhand' => $vessel->requires_deckhand,
            ])
            ->all();


        $activeChartersThisWeek = CharterEvent::whereBetween(
            'created_at',
            [now()->startOfWeek(), now()->endOfWeek()]
        )->count();
        // dd($pendingCaptains);
        return [
            'stats' => [
                'pending_verifications' => count($pendingVerifications),
                'vessel_approvals'      => count($pendingVessels),
                'active_charters_week'  => $activeChartersThisWeek,
                'total_users'           => User::count(),
            ],
            'pending_verifications' => $pendingVerifications,
            'pending_vessels'       => $pendingVessels,
            'compliance_events'     => [],
        ];
    }

    private function initials(string $fullName): string
    {
        return collect(explode(' ', $fullName))
            ->filter()
            ->map(fn($word) => strtoupper($word[0]))
            ->take(2)
            ->implode('');
    }
}