import { Head } from '@inertiajs/react';
import { ChartererSettingsPageContent } from '@/components/charterer-settings/charterer-settings-page-content';
import { ownerSettings } from '@/routes';

export default function OwnerSettingsPage() {
    return (
        <>
            <Head title="Settings" />
            <ChartererSettingsPageContent />
        </>
    );
}

OwnerSettingsPage.layout = {
    breadcrumbs: [
        {
            title: 'Settings',
            href: ownerSettings(),
        },
    ],
    pageHeader: {
        title: 'Settings',
        description: 'Manage your account preferences.',
    },
};
