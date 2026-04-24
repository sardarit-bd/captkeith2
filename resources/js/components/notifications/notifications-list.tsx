import { NotificationCard } from './notification-card';
import type { NotificationRecord } from './notifications-data';

export function NotificationsList({
    notifications,
}: {
    notifications: NotificationRecord[];
}) {
    return (
        <section className="space-y-4">
            {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
            ))}
        </section>
    );
}
