import { usePage } from '@inertiajs/react';

import type { DeckhandInvitationRecord } from './deckhand-invitations-data';
import { DeckhandInvitationsList } from './deckhand-invitations-list';

type PageProps = {
    invitations: DeckhandInvitationRecord[];
};

export function DeckhandInvitationsPageContent() {
    const { invitations } = usePage<PageProps>().props;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                    <DeckhandInvitationsList invitations={invitations} />
                </div>
            </div>
        </div>
    );
}