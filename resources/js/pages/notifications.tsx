import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { notifications } from '@/routes'; // Wayfinder import

interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    icon?: string;
    url?: string;
    read_at: string | null;
    created_at: string;
    data?: {
        title?: string;
        message?: string;
        icon?: string;
        url?: string;
    };
}

interface NotificationsProps {
    notifications: Notification[];
    unreadCount: number;
}

export default function Notifications({ notifications, unreadCount }: NotificationsProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    const handleMarkAsRead = (notificationId: string) => {
        // Using direct URL matching your web.php route: Route::post('/notifications/{id}/read'...)
        router.post(`/notifications/${notificationId}/read`, {}, {
            preserveScroll: true,
        });
    };

    const handleMarkAllAsRead = () => {
        // Using direct URL matching your web.php route: Route::post('/notifications/read-all'...)
        router.post('/notifications/read-all', {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (notificationId: string) => {
        // Note: You don't have a 'notifications.destroy' route defined in web.php!
        // If you want this to work, you must add: Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
        router.delete(`/notifications/${notificationId}`, {
            preserveScroll: true,
        });
    };

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => !n.read_at)
        : notifications;

    const getNotificationIcon = (type: string) => {
        const iconMap: Record<string, string> = {
            'owner_invitation': '📨',
            'vessel_interest': '🛥️',
            'charter_request': '📋',
            'message': '💬',
            'payment': '💰',
        };
        return iconMap[type] || '🔔';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <>
            <Head title="Notifications" />

            {/* Full-width container */}
            <div className="w-full p-4 sm:p-6 lg:p-8">
                {/* Top Bar: Tabs + Mark all as read button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 border-b pb-2 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors",
                                activeTab === 'all'
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab('unread')}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-t-lg transition-colors flex items-center gap-2",
                                activeTab === 'unread'
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            Unread
                            {unreadCount > 0 && (
                                <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 flex items-center justify-center text-[10px]">
                                    {unreadCount}
                                </Badge>
                            )}
                        </button>
                    </div>
                    
                    {unreadCount > 0 && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            className="gap-2"
                        >
                            <CheckCheck className="h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Notifications List - Full Width */}
                <div className="space-y-3 w-full max-w-none">
                    {filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center bg-card border rounded-lg shadow-sm">
                            <div className="p-3 bg-muted rounded-full mb-4">
                                <Bell className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">
                                {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                {activeTab === 'unread'
                                    ? "You're all caught up! Check back later for updates."
                                    : "When you receive notifications, they'll appear here."}
                            </p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={cn(
                                    "group relative flex items-start gap-4 p-4 rounded-lg border transition-all hover:shadow-md w-full bg-card",
                                    !notification.read_at
                                        ? 'border-primary/20 bg-primary/5'
                                        : 'border-border bg-card'
                                )}
                            >
                                {/* Icon */}
                                <div className={cn(
                                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg",
                                    !notification.read_at ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                                )}>
                                    {getNotificationIcon(notification.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className={cn(
                                                "font-semibold text-sm leading-tight",
                                                !notification.read_at ? "text-foreground" : "text-muted-foreground"
                                            )}>
                                                {notification.data?.title || notification.title}
                                            </h4>
                                            {(notification.data?.message || notification.message) && (
                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {notification.data?.message || notification.message}
                                                </p>
                                            )}
                                        </div>
                                        
                                        {/* Unread indicator */}
                                        {!notification.read_at && (
                                            <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-primary mt-1.5" />
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-muted-foreground">
                                            {formatDate(notification.created_at)}
                                        </span>
                                        {!notification.read_at && (
                                            <Badge variant="default" className="h-4 px-1.5 text-[10px]">
                                                New
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!notification.read_at && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => handleMarkAsRead(notification.id)}
                                            title="Mark as read"
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

// ✅ Define the layout configuration exactly like MyYachtsPage
Notifications.layout = {
    breadcrumbs: [
        {
            title: 'Notifications',
            href: notifications(),
        },
    ],
    pageHeader: {
        title: 'Notifications',
        description: 'Stay updated with your recent activities.',
    },
};