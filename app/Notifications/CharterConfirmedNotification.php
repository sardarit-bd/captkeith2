    <?php

    namespace App\Notifications;

    use App\Models\CharterEvent;
    use Illuminate\Bus\Queueable;
    use Illuminate\Notifications\Notification;

    class CharterConfirmedNotification extends Notification
    {
        use Queueable;

        protected CharterEvent $event;

        public function __construct(CharterEvent $event)
        {
            $this->event = $event;
        }

        /**
         * Get the notification's delivery channels.
         */
        public function via(object $notifiable): array
        {
            return ['database']; // In-app only
        }

        /**
         * Get the database representation of the notification.
         */
        public function toDatabase(object $notifiable): array
        {
            $vesselName = $this->event->vessel?->name ?? 'the vessel';
            $date = $this->event->charter_date?->format('M d, Y') ?? 'the scheduled date';

            return [
                'title' => 'Charter Confirmed',
                'message' => "A charter for {$vesselName} on {$date} has been successfully confirmed.",
                'charter_event_id' => $this->event->id,
                'type' => 'charter_confirmed',
            ];
        }
    }