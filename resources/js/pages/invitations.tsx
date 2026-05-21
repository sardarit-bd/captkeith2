import { Head } from '@inertiajs/react';
import { InvitationsPageContent } from '@/components/invitations/invitations-page-content';

export default function InvitationsPage() {
    return (
        <>
            <Head title="Owner Invitations" />
            <InvitationsPageContent />
        </>
    );
}

InvitationsPage.layout = {
    breadcrumbs: [
        {
            title: 'Invitations',
            href: '/invitations',
        },
    ],
    pageHeader: {
        title: 'Owner Invitations',
        description:
            'Vessel owners who have invited you to captain their vessel.',
    },
};
