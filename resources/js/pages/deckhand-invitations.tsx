import { Head } from '@inertiajs/react';
import { DeckhandInvitationsPageContent } from '@/components/deckhand-invitations/deckhand-invitations-page-content';

export default function DeckhandInvitationsPage() {
    return (
        <>
            <Head title="Deckhand Invitations" />
            <DeckhandInvitationsPageContent />
        </>
    );
}

DeckhandInvitationsPage.layout = {
    breadcrumbs: [
        {
            title: 'Deckhand Invitations',
            href: '/deckhand-invitations',
        },
    ],
    pageHeader: {
        title: 'Deckhand Invitations',
        description:
            'Vessel owners who have invited you to work as deckhand on their vessel.',
    },
};