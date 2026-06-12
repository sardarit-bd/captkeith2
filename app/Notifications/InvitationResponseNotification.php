<?php

namespace App\Notifications;

use App\Models\User;
use App\Models\Vessel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class InvitationResponseNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public User $responder,
        public Vessel $vessel,
        public string $status, // 'accepted' or 'declined'
        public string $role // 'captain' or 'deckhand'
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $statusText = $this->status === 'accepted' ? 'accepted' : 'declined';
        $roleTitle = ucfirst($this->role);
        
        return [
            'type' => 'invitation_response',
            'title' => "Invitation {$statusText}",
            'message' => "{$this->responder->name} {$statusText} your invitation for {$roleTitle} position on '{$this->vessel->name}'",
            'icon' => $this->status === 'accepted' ? 'check' : 'x',
            'url' => route('my-yachts'),
            'vessel_id' => $this->vessel->id,
            'responder_id' => $this->responder->id,
            'status' => $this->status,
            'role' => $this->role,
        ];
    }
}