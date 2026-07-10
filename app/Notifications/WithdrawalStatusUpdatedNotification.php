<?php
namespace App\Notifications;

use App\Models\WithdrawalRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class WithdrawalStatusUpdatedNotification extends Notification
{
    use Queueable;
    protected WithdrawalRequest $request;
    protected string $status;

    public function __construct(WithdrawalRequest $request, string $status) { 
        $this->request = $request; 
        $this->status = $status;
    }
    public function via(object $notifiable): array { return ['database']; }
    public function toDatabase(object $notifiable): array
    {
        $messages = [
            'approved' => 'Your withdrawal request has been approved and is being processed.',
            'rejected' => 'Your withdrawal request has been rejected. Funds are returned to your balance.',
            'completed' => 'Your withdrawal has been successfully completed.',
        ];
        return [
            'title' => 'Withdrawal ' . ucfirst($this->status),
            'message' => $messages[$this->status] ?? 'Your withdrawal status has been updated.',
            'withdrawal_request_id' => $this->request->id,
            'type' => 'withdrawal_status_updated',
        ];
    }
}