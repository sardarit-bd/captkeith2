<?php

namespace App\Notifications;

use App\Models\User;
use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\SerializesModels;
class InvitationResponseNotification extends Notification implements ShouldQueue
{
    use Queueable;
    use SerializesModels;
    public function __construct(
        public User $responder,
        public Vessel $vessel,
        public string $status,
        public string $role 
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $action = $this->status === 'accepted' ? 'accepted' : 'declined';
        $roleName = ucfirst($this->role);

        return [
            'type' => 'invitation_response',
            'title' => "Invitation {$action}",
            'message' => "{$this->responder->name} has {$action} your invitation for '{$this->vessel->name}'.",
            'icon' => 'invitation',
            'url' => route('invitations'), 
            'vessel_id' => $this->vessel->id,
            'status' => $this->status,
            'role' => $this->role,
        ];
    }
}