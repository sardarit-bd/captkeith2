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
    ship: Ship,
    invitation: UserCheck,
    request: Briefcase,
    interest: UserCheck,
};

export function NotificationCard({ notification }: { notification: NotificationRecord }) {
    const IconComponent = iconMap[notification.icon] || Bell;
    const isUnread = !notification.read_at;

    const handleClick = () => {
        if (isUnread) {
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
                'flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all hover:shadow-md bg-card',
                isUnread ? 'border-primary/20 bg-primary/5' : 'border-border'
            )}
        >
            <div className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                isUnread ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
            )}>
                <IconComponent className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                    <p className={cn('text-sm font-semibold', isUnread ? 'text-foreground' : 'text-muted-foreground')}>
                        {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                        {new Date(notification.created_at).toLocaleDateString()}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
            </div>
            {isUnread && (
                <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary mt-1.5" />
            )}
        </button>
    );
}