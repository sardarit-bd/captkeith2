<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ProfileApprovedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $profileType
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'profile_approved',
            'title' => 'Profile Approved',
            'message' => "Your {$this->profileType} profile has been successfully approved by the admin.",
            'icon' => 'check-circle',
            'url' => route('dashboard'),
        ];
    }
}