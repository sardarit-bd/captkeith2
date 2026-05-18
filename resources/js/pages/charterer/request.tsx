import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { CharterEvent } from '@/components/charterer-request/charterer-request-data';
import { ChartererRequestPageContent } from '@/components/charterer-request/charterer-request-page-content';
import { request } from '@/routes/charterer';

type Props = {
    charterEvent: CharterEvent;
};

export default function ChartererRequestPage() {
    const { charterEvent } = usePage<Props>().props;

    return (
        <>
            <Head title="Request" />
            <ChartererRequestPageContent charterEvent={charterEvent} />
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
