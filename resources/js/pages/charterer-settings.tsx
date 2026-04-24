import { Head } from '@inertiajs/react';
import { ChartererSettingsPageContent } from '@/components/charterer-settings/charterer-settings-page-content';
import { chartererSettings } from '@/routes';

export default function ChartererSettingsPage() {
    return (
        <>
            <Head title="Settings" />
            <ChartererSettingsPageContent />
        </>
    );
}

ChartererSettingsPage.layout = {
    breadcrumbs: [
        {
            title: 'Settings',
            href: chartererSettings(),
        },
    ],
    pageHeader: {
        title: 'Settings',
        description: 'Manage your account preferences.',
    },
};
