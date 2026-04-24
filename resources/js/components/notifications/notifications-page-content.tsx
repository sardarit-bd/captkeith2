import { usePage } from '@inertiajs/react';
import { getNotificationFeed } from './notifications-data';
import { NotificationsList } from './notifications-list';

export function NotificationsPageContent() {
    const page = usePage<{ auth?: { role?: string | null } }>();
    const feed = getNotificationFeed(page.props.auth?.role);

    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-[1000px] pb-10">
                    <p className="mb-4 text-sm text-[#6b7280]">{feed.helperText}</p>
                    <NotificationsList notifications={feed.records} />
                </div>
            </div>
        </div>
    );
}
