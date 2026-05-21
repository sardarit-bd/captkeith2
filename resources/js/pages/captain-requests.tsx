import { Head } from '@inertiajs/react';

import { CaptainRequestsPageContent } from '@/components/captain-requests/captain-requests-page-content';

export default function CaptainRequestsPage() {
    return (
        <>
            <Head title="Captain Requests" />
            <CaptainRequestsPageContent />
        </>
    );
}

CaptainRequestsPage.layout = {
    breadcrumbs: [
        {
            title: 'Captain Requests',
            href: '/captain-requests',
        },
    ],
    pageHeader: {
        title: 'Captain Requests',
        description: 'Captains who have expressed interest in your vessels.',
    },
};
