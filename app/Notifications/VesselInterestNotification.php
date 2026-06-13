<?php

namespace App\Notifications;

use App\Models\Vessel;
use App\Models\User;
use Illuminate\Notifications\Notification;

class VesselInterestNotification extends Notification
{
    public function __construct(
        public Vessel $vessel,
        public User $interestedUser,
        public string $role // 'captain' or 'deckhand'
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $roleTitle = ucfirst($this->role);
        
        // Safely get the user's name from their specific profile, fallback to email
        $profileRelation = $this->role . 'Profile';
        $userName = $this->interestedUser->{$profileRelation}?->full_name ?? $this->interestedUser->email;
        
        return [
            'type' => 'vessel_interest',
            'title' => "New {$roleTitle} Interest",
            'message' => "{$userName} is interested in your vessel '{$this->vessel->name}'",
            'icon' => 'interest',
            'url' => url('/my-yachts'), // Changed from route() to prevent RouteNotFoundException
            'vessel_id' => $this->vessel->id,
            'interested_user_id' => $this->interestedUser->id,
            'role' => $this->role,
        ];
    }
}