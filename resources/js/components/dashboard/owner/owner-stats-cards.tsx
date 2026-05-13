import { usePage } from '@inertiajs/react';
import { ownerStatCardConfigs } from './owner-dashboard-data';
import type { OwnerDashboardProps } from '@/types';

type DashboardPageProps = {
    dashboard?: OwnerDashboardProps;
};

export function OwnerStatsCards() {
    const { props } = usePage<DashboardPageProps>();
    const stats = props.dashboard?.stats;

    return (
        <div className="grid gap-4 lg:grid-cols-4">
            {ownerStatCardConfigs.map((config) => (
                <div
                    key={config.key}
                    className="rounded-2xl border border-[#d4dbe3] bg-white p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] text-[#4A5565]">
                                {config.label}
                            </p>
                            <p className="mt-2 text-[30px] font-semibold text-[#0f172a]">
                                {stats ? stats[config.key] : '—'}
                            </p>
                        </div>
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EFF6FF]">
                            <config.icon
                                className="h-6 w-6"
                                style={{ color: config.iconColor }}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
