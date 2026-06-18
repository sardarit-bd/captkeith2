import {
    CalendarCheck2,
    FileWarning,
    Ship,
    Users,
} from 'lucide-react';

interface AdminStatsCardsProps {
    stats: Record<string, number>;
}

const iconMap = {
    pending_verifications: FileWarning,
    vessel_approvals: Ship,
    active_charters_week: CalendarCheck2,
    total_users: Users,
};

const toneMap = {
    pending_verifications: {
        iconBg: '#fff7ed',
        iconColor: '#f97316',
        helperColor: '#ea580c',
        label: 'Pending Verifications',
        helper: 'Requires immediate review',
    },
    vessel_approvals: {
        iconBg: '#eff6ff',
        iconColor: '#3b82f6',
        helperColor: '#64748b',
        label: 'Vessel Approvals',
        helper: 'Awaiting listing approval',
    },
    active_charters_week: {
        iconBg: '#ecfdf5',
        iconColor: '#10b981',
        helperColor: '#059669',
        label: 'Active Charters (This Wk)',
        helper: 'Fully compliant and booked',
    },
    total_users: {
        iconBg: '#faf5ff',
        iconColor: '#8b5cf6',
        helperColor: '#64748b',
        label: 'Total Platform Users',
        helper: 'Owners, Captains and Charterers',
    },
};

export function AdminStatsCards({ stats }: AdminStatsCardsProps) {
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Object.keys(toneMap).map((key) => {
                const Icon = iconMap[key as keyof typeof iconMap];
                const tone = toneMap[key as keyof typeof toneMap];
                // Fallback to 0 if stat is missing
                const value = stats[key] ?? 0;

                return (
                    <article
                        key={key}
                        className="rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-[#64748b]">
                                {tone.label}
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
                                {value}
                            </h3>
                            <p
                                className="mt-1 text-xs font-medium"
                                style={{ color: tone.helperColor }}
                            >
                                {tone.helper}
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}