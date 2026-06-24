<?php

namespace App\Notifications;

use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class VesselStatusUpdatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Vessel $vessel,
        public string $status
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'vessel_status_updated',
            'title' => 'Vessel Status Updated',
            'message' => "Your vessel '{$this->vessel->name}' has been {$this->status} by the admin.",
            'icon' => 'yacht',
            'url' => route('my-yachts'),
            'vessel_id' => $this->vessel->id,
        ];
    }
}