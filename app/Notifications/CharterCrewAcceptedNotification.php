<?php

namespace App\Notifications;

use App\Models\CharterCrewResponse;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CharterCrewAcceptedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public CharterCrewResponse $crewResponse
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $role = $this->crewResponse->crew_role;
        $roleName = ucfirst($role);
        

        $profile = $role === 'captain' ? $this->crewResponse->captainProfile : $this->crewResponse->deckhandProfile;
        $name = $profile?->full_name ?? ($profile?->user?->name ?? 'A crew member');
        $vesselName = $this->crewResponse->charterEvent?->vessel?->name ?? 'your vessel';

        return [
            'type' => 'charter_crew_accepted',
            'title' => "{$roleName} Accepted Request",
            'message' => "{$name} has accepted your charter request for the vessel '{$vesselName}'.",
            'icon' => 'check',
            'url' => route('charterer.captain-request-status'),
            'crew_response_id' => $this->crewResponse->id,
            'role' => $role,
        ];
    }
}