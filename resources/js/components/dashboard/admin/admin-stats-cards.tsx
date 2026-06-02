import {
    CalendarCheck2,
    FileWarning,
    Ship,
    Users,
} from 'lucide-react';
import { adminStatCards } from './admin-dashboard-data';
import type { AdminStatCard } from './admin-dashboard-data';

const iconMap = {
    'file-warning': FileWarning,
    ship: Ship,
    'calendar-check': CalendarCheck2,
    users: Users,
};

const toneMap: Record<
    AdminStatCard['tone'],
    { iconBg: string; iconColor: string; helperColor: string }
> = {
    warning: {
        iconBg: '#fff7ed',
        iconColor: '#f97316',
        helperColor: '#ea580c',
    },
    info: {
        iconBg: '#eff6ff',
        iconColor: '#3b82f6',
        helperColor: '#64748b',
    },
    accent: {
        iconBg: '#faf5ff',
        iconColor: '#8b5cf6',
        helperColor: '#059669',
    },
    success: {
        iconBg: '#ecfdf5',
        iconColor: '#10b981',
        helperColor: '#64748b',
    },
};

export function AdminStatsCards() {
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {adminStatCards.map((card) => {
                const Icon = iconMap[card.icon];
                const tone = toneMap[card.tone];

                return (
                    <article
                        key={card.id}
                        className="rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-[#64748b]">
                                {card.label}
                            </p>
                            <span
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                                style={{
                                    backgroundColor: tone.iconBg,
                                    color: tone.iconColor,
                                }}
                            >
                                <Icon className="h-5 w-5" />
                            </span>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-[#35ADD5]">
                                {card.value}
                            </h3>
                            <p
                                className="mt-1 text-xs font-medium"
                                style={{ color: tone.helperColor }}
                            >
                                {card.helper}
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
