import { DeckhandConfirmedCharters } from './deckhand-confirmed-charters';
import { DeckhandPendingRequests } from './deckhand-pending-requests';
import { DeckhandRecentMessages } from './deckhand-recent-messages';
import { DeckhandStatsCards } from './deckhand-stats-cards';

export function DeckhandDashboard() {
    return (
        <div className="flex h-full pt-10 flex-1 flex-col gap-6 overflow-x-auto bg-[#F6FDFF] p-5">
            <DeckhandStatsCards />
            <DeckhandPendingRequests />
            <DeckhandConfirmedCharters />
            <DeckhandRecentMessages />
        </div>
    );
}
