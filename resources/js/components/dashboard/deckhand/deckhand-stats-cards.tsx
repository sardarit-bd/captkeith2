import { usePage } from '@inertiajs/react';
import { CheckCircle2, Clock3, MessageSquare, User } from 'lucide-react';
import type { DeckhandDashboardData } from './deckhand-dashboard-types';

export function DeckhandStatsCards() {
    const { dashboard } = usePage<{ dashboard: DeckhandDashboardData }>().props;
    const stats = dashboard.stats;

    const cards = [
        {
            label: 'Pending Requests',
            value: String(stats.pendingRequests),
            valueClassName: 'text-[#0f172a]',
            icon: Clock3,
            hint: 'Awaiting response',
            hintClassName: 'text-orange-500',
            actionLabel: undefined,
        },
        {
            label: 'Accepted',
            value: String(stats.confirmedCharters),
            valueClassName: 'text-green-600',
            icon: CheckCircle2,
            hint: 'Confirmed charters',
            hintClassName: 'text-green-600',
            actionLabel: undefined,
        },
        {
            label: 'Messages',
            value: String(stats.unreadMessages),
            valueClassName: 'text-[#0f172a]',
            icon: MessageSquare,
            hint: 'Unread messages',
            hintClassName: 'text-[#6b7280]',
            actionLabel: undefined,
        },
        {
            label: 'Profile Status',
            value: stats.profileActive ? 'Active' : 'Inactive',
            valueClassName: stats.profileActive
                ? 'text-green-600 text-[16px]'
                : 'text-red-500 text-[16px]',
            icon: User,
            hint: undefined,
            hintClassName: 'text-[#0f172a]',
            actionLabel: 'Edit Profile',
        },
    ];

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((item) => (
                <article
                    key={item.label}
                    className="flex flex-col justify-between rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div>
                        <p className="mb-1 text-sm font-medium text-[#6b7280]">
                            {item.label}
                        </p>
                        <p
                            className={`text-[36px] leading-none font-bold ${item.valueClassName}`}
                        >
                            {item.value}
                        </p>
                    </div>

                    {item.actionLabel ? (
                        <button
                            type="button"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#0f172a] transition-colors hover:text-[#0A273F]"
                        >
                            {item.actionLabel}
                        </button>
                    ) : item.hint ? (
                        <div
                            className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${item.hintClassName}`}
                        >
                            {item.icon ? (
                                <item.icon className="h-4 w-4" />
                            ) : null}
                            <span>{item.hint}</span>
                        </div>
                    ) : null}
                </article>
            ))}
        </section>
    );
}
