<?php

namespace App\Notifications;

use App\Models\CharterHireAgreement;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class AgreementSignedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public CharterHireAgreement $agreement,
        public User $signer
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'agreement_signed',
            'title' => 'Agreement Signed',
            'message' => "{$this->signer->name} signed the {$this->agreement->agreement_type} agreement",
            'icon' => 'document',
            'url' => route('charterers'),
            'agreement_id' => $this->agreement->id,
            'charter_event_id' => $this->agreement->charter_event_id,
        ];
    }
}