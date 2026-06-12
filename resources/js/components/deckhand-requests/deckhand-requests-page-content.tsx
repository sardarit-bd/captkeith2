import { usePage } from '@inertiajs/react';

import type { DeckhandInterestRecord } from './deckhand-requests-data';
import { DeckhandRequestsList } from './deckhand-requests-list';

type PageProps = {
    interests: DeckhandInterestRecord[];
};

export function DeckhandRequestsPageContent() {
    const { interests } = usePage<PageProps>().props;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                    <DeckhandRequestsList interests={interests} />
                </div>
            </div>
        </div>
    );
}