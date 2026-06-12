<?php

namespace App\Notifications;

use App\Models\Vessel;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class VesselInterestNotification extends Notification implements ShouldQueue
{
    use Queueable;

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
        
        return [
            'type' => 'vessel_interest',
            'title' => "New {$roleTitle} Interest",
            'message' => "{$this->interestedUser->name} is interested in your vessel '{$this->vessel->name}'",
            'icon' => 'interest',
            'url' => route('my-yachts'),
            'vessel_id' => $this->vessel->id,
            'interested_user_id' => $this->interestedUser->id,
            'role' => $this->role,
        ];
    }
}