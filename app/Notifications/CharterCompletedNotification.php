<?php
namespace App\Notifications;

use App\Models\CharterEvent;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class CharterCompletedNotification extends Notification
{
    use Queueable;
    protected CharterEvent $event;

    public function __construct(CharterEvent $event) { $this->event = $event; }
    public function via(object $notifiable): array { return ['database']; }
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'Charter Completed',
            'message' => "The charter for {$this->event->vessel?->name} has been completed. Your earnings are now available for withdrawal.",
            'charter_event_id' => $this->event->id,
            'type' => 'charter_completed',
        ];
    }
}