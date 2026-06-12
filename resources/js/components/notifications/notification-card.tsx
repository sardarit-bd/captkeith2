import { router } from '@inertiajs/react';
import { Bell, Briefcase, MessageSquare, Ship, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const iconMap: Record<string, React.ElementType> = {
    bell: Bell,
    message: MessageSquare,
    yacht: Ship,
    invitation: UserCheck,
    request: Briefcase,
};

export function NotificationCard({ notification }: { notification: NotificationRecord }) {
    const IconComponent = iconMap[notification.icon] || Bell;
    const isUnread = !notification.read_at;

    const handleClick = () => {
        if (isUnread) {
            // Mark as read via backend, then navigate to the URL
            router.post(route('notifications.read', { id: notification.id }), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    if (notification.url && notification.url !== '#') {
                        router.visit(notification.url);
                    }
                },
            });
        } else {
            if (notification.url && notification.url !== '#') {
                router.visit(notification.url);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                'flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all hover:bg-gray-50',
                isUnread ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200 bg-white'
            )}
        >
            <div className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                isUnread ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
            )}>
                <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className={cn('text-sm font-semibold', isUnread ? 'text-gray-900' : 'text-gray-700')}>
                        {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                        {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
        </button>
    );
}