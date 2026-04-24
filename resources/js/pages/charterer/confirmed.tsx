import { Head } from '@inertiajs/react';
import { ChartererConfirmedPageContent } from '@/components/charterer-confirmed/charterer-confirmed-page-content';
import { confirmed } from '@/routes/charterer';

export default function ChartererConfirmedPage() {
    return (
        <>
            <Head title="Charter Confirmed" />
            <ChartererConfirmedPageContent />
        </>
    );
}

ChartererConfirmedPage.layout = {
    breadcrumbs: [
        {
            title: 'Confirmed',
            href: confirmed(),
        },
    ],
    pageHeader: {
        title: 'Charter Confirmed',
        description: 'Your booking is complete and all documents are ready.',
    },
};
