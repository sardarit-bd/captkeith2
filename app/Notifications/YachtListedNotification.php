<?php

namespace App\Notifications;

use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class YachtListedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Vessel $vessel
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'yacht_listed',
            'title' => 'Yacht Listed Successfully',
            'message' => "Your yacht '{$this->vessel->name}' has been listed.",
            'icon' => 'yacht',
            'url' => route('my-yachts'),
            'vessel_id' => $this->vessel->id,
        ];
    }
}