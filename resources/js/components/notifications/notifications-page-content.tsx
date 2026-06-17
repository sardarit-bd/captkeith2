import { usePage, router } from '@inertiajs/react';
import { NotificationsList } from './notifications-list';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

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
        router.post(route('notifications.read-all'), {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const unreadCount = notifications.filter((n) => !n.read_at).length;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
            <div className="flex-1 overflow-y-auto w-full px-4 sm:px-6 lg:px-8">
                {/* ✅ FIX: Removed 'max-w-250' to ensure it takes up the full available width */}
                <div className="mx-auto mt-2 w-full pb-10">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                            <p className="text-sm text-muted-foreground">
                                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <Button variant="default" size="sm" onClick={handleMarkAllAsRead} className="gap-2">
                                <CheckCheck className="h-4 w-4" />
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