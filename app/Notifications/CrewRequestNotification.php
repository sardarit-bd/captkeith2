<?php

namespace App\Notifications;

use App\Models\User;
use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CrewRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public User $requester,
        public Vessel $vessel,
        public string $role 
    ) {}

    public function via(object $notifiable): array
    {   
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $roleName = ucfirst($this->role);
        $routeName = $this->role === 'captain' ? 'captain-requests' : 'deckhand-requests';

        $title = $this->role === 'captain' ? 'New Charter Request' : "New {$roleName} Request";
        $message = $this->role === 'captain'
            ? "You have received a new request to captain a charter on the vessel '{$this->vessel->name}'."
            : "You have been requested to join the vessel '{$this->vessel->name}' as a {$roleName}.";

        return [
            'type' => 'crew_request',
            'title' => $title,
            'message' => $message,
            'icon' => 'request',
            'url' => route($routeName),
            'vessel_id' => $this->vessel->id,
            'requester_id' => $this->requester->id,
            'role' => $this->role,
        ];
    }
}