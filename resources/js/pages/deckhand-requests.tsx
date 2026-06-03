import { Head } from '@inertiajs/react';

import { DeckhandRequestsPageContent } from '@/components/deckhand-requests/deckhand-requests-page-content';

export default function DeckhandRequestsPage() {
    return (
        <>
            <Head title="Deckhand Requests" />
            <DeckhandRequestsPageContent />
        </>
    );
}

DeckhandRequestsPage.layout = {
    breadcrumbs: [
        {
            title: 'Deckhand Requests',
            href: '/deckhand-requests',
        },
    ],
    pageHeader: {
        title: 'Deckhand Requests',
        description: 'Deckhands who have expressed interest in your vessels.',
    },
};