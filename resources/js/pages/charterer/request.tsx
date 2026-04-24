import { Head } from '@inertiajs/react';
import { ChartererRequestPageContent } from '@/components/charterer-request/charterer-request-page-content';
import { request } from '@/routes/charterer';

export default function ChartererRequestPage() {
    return (
        <>
            <Head title="Request" />
            <ChartererRequestPageContent />
        </>
    );
}

ChartererRequestPage.layout = {
    breadcrumbs: [
        {
            title: 'Request',
            href: request(),
        },
    ],
    pageHeader: {
        title: 'Your Charterer Awaits',
        description: 'Complete your booking by selecting a qualified captain.',
    },
};
