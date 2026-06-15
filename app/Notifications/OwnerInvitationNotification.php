<?php

namespace App\Notifications;

use App\Models\OwnerCaptainInvitation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OwnerInvitationNotification extends Notification
{
    use Queueable;

    public function __construct(public OwnerCaptainInvitation $invitation)
    {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'owner_invitation',
            'title' => 'New Owner Invitation',
            'message' => 'You have received a new invitation from a vessel owner.',
            'icon' => 'ship',
            'url' => '/invitations',
            'invitation_id' => $this->invitation->id,
        ];
    }
}