import { OwnerCaptainMatches } from './owner-captain-matches';
import { OwnerQuickActions } from './owner-quick-actions';
import { OwnerStatsCards } from './owner-stats-cards';
import { OwnerYachtsList } from './owner-yachts-list';

export function OwnerDashboard() {
    return (
        <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto bg-[#F6FDFF] p-5">
            <OwnerStatsCards />
            <OwnerQuickActions />

            <div className="grid gap-4 lg:grid-cols-2">
                <OwnerYachtsList />
                <OwnerCaptainMatches />
            </div>
        </div>
    );
}
