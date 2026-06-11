<?php

namespace App\Notifications;

use App\Models\CharterPayment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class PaymentCompleteNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public CharterPayment $payment
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'payment_complete',
            'title' => 'Payment Completed',
            'message' => "Payment of {$this->payment->amount} {$this->payment->currency} has been completed",
            'icon' => 'payment',
            'url' => route('charterers'),
            'payment_id' => $this->payment->id,
            'charter_event_id' => $this->payment->charter_event_id,
        ];
    }
}