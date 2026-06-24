import { Head } from '@inertiajs/react';
import { PlatformSettingsPageContent } from '@/components/platform-settings/platform-settings-page-content';
import { platformSettings } from '@/routes';

export default function PlatformSettingsPage({ settings }: { settings: any }) {
    return (
        <div className="pt-10">
            <Head title="Platform Settings" />
            <PlatformSettingsPageContent initialSettings={settings} />
        </div>
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