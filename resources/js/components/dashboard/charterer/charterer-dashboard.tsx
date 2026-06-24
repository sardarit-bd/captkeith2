import { ChartererCompletedCharters } from './charterer-completed-charters';
import { ChartererRecentActivity } from './charterer-recent-activity';
import { ChartererStatsCards } from './charterer-stats-cards';
import { ChartererUpcomingBooking } from './charterer-upcoming-booking';

export function ChartererDashboard() {
    return (
        <div className="flex h-full pt-10 flex-1 flex-col gap-6 overflow-x-auto bg-[#F6FDFF] p-5 font-poppins">
            <ChartererStatsCards />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ChartererUpcomingBooking />
                <ChartererRecentActivity />
            </div>

            <ChartererCompletedCharters />

            <div className="h-1" />
        </div>
    );
}
