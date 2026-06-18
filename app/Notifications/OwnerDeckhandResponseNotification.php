<?php

namespace App\Notifications;

use App\Models\OwnerDeckhandInvitation;
use Illuminate\Notifications\Notification;

class OwnerDeckhandResponseNotification extends Notification
{
    public function __construct(
        public OwnerDeckhandInvitation $invitation
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $status     = $this->invitation->status;
        $statusText = ucfirst($status);
        $vesselName = $this->invitation->vessel?->name ?? 'a vessel';

        return [
            'type'          => 'owner_response',
            'title'         => "Request {$statusText}",
            'message'       => "Your request for the vessel '{$vesselName}' has been {$status}.",
            'icon'          => $status === 'accepted' ? 'check-circle' : 'x-circle',
            'url'           => url('/invitations'),
            'invitation_id' => $this->invitation->id,
            'status'        => $status,
        ];
    }
}