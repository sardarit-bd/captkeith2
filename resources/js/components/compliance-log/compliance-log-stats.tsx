import { PenTool, ShieldCheck, Umbrella } from 'lucide-react';
import { complianceStats } from './compliance-log-data';

const statIconMap = {
    'fully-compliant': ShieldCheck,
    'pending-signatures': PenTool,
    'awaiting-insurance': Umbrella,
} as const;

export function ComplianceLogStats() {
    return (
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {complianceStats.map((stat) => {
                const Icon = statIconMap[stat.id];

                return (
                    <article
                        key={stat.id}
                        className="flex items-center justify-between rounded-2xl border border-[#e6ebf1] bg-white p-5 shadow-sm"
                    >
                        <div>
                            <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                                {stat.label}
                            </p>
                            <h3 className="mt-1 text-2xl font-bold text-[#35ADD5]">
                                {stat.value}
                            </h3>
                        </div>
                        <div
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${stat.colorClass}`}
                        >
                            <Icon className="h-6 w-6" />
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
