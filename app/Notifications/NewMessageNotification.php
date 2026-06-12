<?php

namespace App\Notifications;

use App\Models\Message;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewMessageNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Message $message,
        public User $sender
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_message',
            'title' => 'New Message',
            'message' => "{$this->sender->name} sent you a message",
            'icon' => 'message',
            'url' => route('messages', ['with' => $this->sender->id]),
            'sender_id' => $this->sender->id,
            'message_id' => $this->message->id,
        ];
    }
}