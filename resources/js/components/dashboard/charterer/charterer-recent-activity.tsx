import { usePage } from '@inertiajs/react';
import type { ChartererDashboardData } from './charterer-dashboard-types';

const dotColor: Record<string, string> = {
    completed: 'bg-green-500',
    cancelled: 'bg-red-400',
    confirmed: 'bg-blue-400',
    booked: 'bg-blue-400',
    pending: 'bg-amber-400',
    draft: 'bg-gray-400',
};

export function ChartererRecentActivity() {
    const { dashboard } = usePage<{ dashboard: ChartererDashboardData }>()
        .props;
    const items = dashboard.recentActivity;

    return (
        <section className="flex h-full flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[17px] leading-tight font-bold text-[#111827]">
                    Recent Activity
                </h3>
            </div>

            {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                    <p className="text-[14px] text-[#9ca3af]">
                        No recent activity yet.
                    </p>
                </div>
            ) : (
                <div className="flex-1 space-y-4">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="flex gap-4 rounded-[12px] border border-[#f1f5f9] bg-[#fafafa] p-4"
                        >
                            <span
                                className={`mt-2 inline-flex h-2 w-2 shrink-0 self-start rounded-full ${dotColor[item.status] ?? 'bg-gray-400'}`}
                            />
                            <div>
                                <h4 className="text-[14px] font-semibold text-[#111827]">
                                    {item.title}
                                </h4>
                                <p className="mt-0.5 text-[13px] text-[#4b5563]">
                                    {item.description}
                                </p>
                                <p className="mt-1.5 text-[11px] text-[#9ca3af]">
                                    {item.timestamp}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
