import { Head } from '@inertiajs/react';
import { ChartererInformationPageContent } from '@/components/charterer-information/charterer-information-page-content';
import { information } from '@/routes/charterer';

export default function ChartererInformationPage() {
    return (
        <>
            <Head title="Create Your Profile" />
            <ChartererInformationPageContent />
        </>
    );
}

ChartererInformationPage.layout = {
    breadcrumbs: [
        {
            title: 'Information',
            href: information(),
        },
    ],
    pageHeader: {
        title: 'Create Your Profile',
        description: 'We need a few details to complete your charter booking.',
    },
};
