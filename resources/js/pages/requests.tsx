import { Head } from '@inertiajs/react';
import { RequestsPageContent } from '@/components/requests/requests-page-content';
import { requests } from '@/routes';

export default function RequestsPage() {
    return (
        <>
            <Head title="Requests" />
            <RequestsPageContent />
        </>
    );
}

RequestsPage.layout = {
    breadcrumbs: [
        {
            title: 'Requests',
            href: requests(),
        },
    ],
    pageHeader: {
        title: 'Charterer Requests',
        description: 'Pending availability requests from yacht owners.',
    },
};
