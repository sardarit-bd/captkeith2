<?php
namespace App\Notifications;

use App\Models\CharterEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CharterCompletionRequestedNotification extends Notification
{
    use Queueable;
    protected CharterEvent $event;

    public function __construct(CharterEvent $event) { $this->event = $event; }
    public function via(object $notifiable): array { return ['database']; }
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'Charter Completion Requested',
            'message' => "The owner has requested you to confirm the completion of the charter for {$this->event->vessel?->name}.",
            'charter_event_id' => $this->event->id,
            'type' => 'charter_completion_requested',
        ];
    }
}