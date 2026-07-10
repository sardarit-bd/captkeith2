<?php
namespace App\Notifications;

use App\Models\WithdrawalRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class WithdrawalRequestedNotification extends Notification
{
    use Queueable;
    protected WithdrawalRequest $request;

    public function __construct(WithdrawalRequest $request) { $this->request = $request; }
    public function via(object $notifiable): array { return ['database']; }
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'New Withdrawal Request',
            'message' => "{$this->request->user?->name} has requested a withdrawal of ${$this->request->amount}.",
            'withdrawal_request_id' => $this->request->id,
            'type' => 'withdrawal_requested',
        ];
    }
}