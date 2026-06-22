<?php

namespace App\Notifications;

use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewPendingVesselNotification extends Notification implements ShouldQueue
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
            'type' => 'new_pending_vessel',
            'title' => 'New Vessel Pending Review',
            'message' => "A new vessel '{$this->vessel->name}' has been added and is pending approval.",
            'icon' => 'yacht',
            'url' => route('admin.dashboard'),
            'vessel_id' => $this->vessel->id,
        ];
    }
}