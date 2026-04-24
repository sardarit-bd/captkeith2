import { Head } from '@inertiajs/react';
import { PlatformSettingsPageContent } from '@/components/platform-settings/platform-settings-page-content';
import { platformSettings } from '@/routes';

export default function PlatformSettingsPage() {
    return (
        <>
            <Head title="Platform Settings" />
            <PlatformSettingsPageContent />
        </>
    );
}

PlatformSettingsPage.layout = {
    breadcrumbs: [
        {
            title: 'Platform Settings',
            href: platformSettings(),
        },
    ],
    pageHeader: {
        title: 'Platform Settings',
        description:
            'Manage global taxonomies, API integrations, and platform rules.',
    },
};
