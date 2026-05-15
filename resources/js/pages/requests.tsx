import { Head } from '@inertiajs/react';
import type { CaptainRequestRecord } from '@/components/requests/requests-data';
import { RequestsPageContent } from '@/components/requests/requests-page-content';

import { requests } from '@/routes';

interface RequestsPageProps {
    requests: CaptainRequestRecord[];
}

export default function RequestsPage({
    requests: requestRecords,
}: RequestsPageProps) {
    return (
        <>
            <Head title="Requests" />
            <RequestsPageContent requests={requestRecords} />
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
