import { Head } from '@inertiajs/react';
import { NotificationsPageContent } from '@/components/notifications/notifications-page-content';
import { notifications } from '@/routes';

export default function NotificationsPage() {
    return (
        <>
            <Head title="Notifications" />
            <NotificationsPageContent />
        </>
    );
}

NotificationsPage.layout = {
    breadcrumbs: [
        {
            title: 'Notifications',
            href: notifications(),
        },
    ],
    pageHeader: {
        title: 'Notification',
        description: 'Stay updated with your latest activities.',
    },
};
