import { usePage, router } from '@inertiajs/react';
import { NotificationsList } from './notifications-list';
import { Button } from '@/components/ui/button';

type NotificationRecord = {
    id: string;
    type: string;
    title: string;
    message: string;
    icon: string;
    url: string;
    read_at: string | null;
    created_at: string;
};

export function NotificationsPageContent() {
    const { notifications } = usePage<{ notifications: NotificationRecord[] }>().props;

    const handleMarkAllAsRead = () => {
        router.post(route('notifications.read-all'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const unreadCount = notifications.filter((n) => !n.read_at).length;

    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-250 pb-10">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-[#6b7280]">
                            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
                        </p>
                        {unreadCount > 0 && (
                            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                                Mark all as read
                            </Button>
                        )}
                    </div>
                    <NotificationsList notifications={notifications} />
                </div>
            </div>
        </div>
    );
}