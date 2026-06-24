import { CaptainCharterRequests } from './captain-charter-requests';
import { CaptainMatchedYachtsList } from './captain-matched-yachts-list';
import { CaptainQuickActions } from './captain-quick-actions';
import { CaptainStatsCards } from './captain-stats-cards';

export function CaptainDashboard() {
    return (
        <div className="flex h-full flex-1 pt-10 flex-col gap-5 overflow-x-auto bg-[#F6FDFF] p-5">
            <CaptainStatsCards />
            <CaptainQuickActions />

            <div className="grid gap-4 lg:grid-cols-2">
                <CaptainMatchedYachtsList />
                <CaptainCharterRequests />
            </div>
        </div>
    );
}
