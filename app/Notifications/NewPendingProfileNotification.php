<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewPendingProfileNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public User $user,
        public string $role
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_pending_profile',
            'title' => 'New ' . ucfirst($this->role) . ' Pending Review',
            'message' => "A new {$this->role} ({$this->user->email}) has registered and is pending approval.",
            'icon' => 'user',
            'url' => route('admin.verifications'),
            'user_id' => $this->user->id,
        ];
    }
}