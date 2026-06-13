<?php

namespace App\Notifications;

use App\Models\OwnerCaptainInvitation;
use Illuminate\Notifications\Notification;

class OwnerResponseNotification extends Notification
{
    public function __construct(
        public OwnerCaptainInvitation $invitation
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $status = $this->invitation->status; // 'accepted' or 'declined'
        $statusText = ucfirst($status);
        $vesselName = $this->invitation->vessel?->name ?? 'a vessel';
        
        return [
            'type' => 'owner_response',
            'title' => "Request {$statusText}",
            'message' => "Your request for the vessel '{$vesselName}' has been {$status}.",
            'icon' => $status === 'accepted' ? 'check-circle' : 'x-circle',
            'url' => url('/invitations'), // Directs to the captain's invitations page
            'invitation_id' => $this->invitation->id,
            'status' => $status,
        ];
    }
}