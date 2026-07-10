<?php

namespace App\Notifications;

use App\Models\CharterEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class CharterCompletionRequestNotification extends Notification
{
    use Queueable;

    public function __construct(
        private CharterEvent $charter
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Charter Completion Request')
            ->greeting('Hello ' . $notifiable->name)
            ->line('The owner has requested to mark your charter as complete.')
            ->line('Charter Details:')
            ->line('Vessel: ' . $this->charter->vessel->name)
            ->line('Date: ' . $this->charter->start_date->format('M d, Y'))
            ->action('View Charter', url('/charter/' . $this->charter->id))
            ->line('Please review and confirm the charter completion.');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'charter_id' => $this->charter->id,
            'vessel_name' => $this->charter->vessel->name,
            'message' => 'Owner requested charter completion',
            'type' => 'completion_request',
        ];
    }
}