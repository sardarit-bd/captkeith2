<?php

namespace App\Notifications;

use App\Models\OwnerCaptainInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class CaptainRequestResponseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public OwnerCaptainInvitation $invitation,
        public string $status
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $statusText = $this->status === 'accepted' ? 'accepted' : 'declined';
        $vesselName = $this->invitation->vessel->name ?? 'the vessel';
        $ownerName = $this->invitation->vessel->owner->user->name ?? 'The owner';

        return [
            'type' => 'captain_request_response',
            'title' => "Request {$statusText}",
            'message' => "{$ownerName} has {$statusText} your request for '{$vesselName}'.",
            'icon' => 'request',
            'url' => route('requests'), 
            'invitation_id' => $this->invitation->id,
            'status' => $this->status,
        ];
    }
}