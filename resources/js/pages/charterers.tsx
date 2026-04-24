import { Head } from '@inertiajs/react';
import { CharterersPageContent } from '@/components/charterers/charterers-page-content';
import { charterers } from '@/routes';

export default function CharterersPage() {
    return (
        <>
            <Head title="Invite Charterers" />
            <CharterersPageContent />
        </>
    );
}

CharterersPage.layout = {
    breadcrumbs: [
        {
            title: 'Charterers',
            href: charterers(),
        },
    ],
    pageHeader: {
        title: 'Charterers',
        description: 'Create and manage charter plans for your vessels.',
    },
};
