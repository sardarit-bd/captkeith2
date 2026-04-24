import { chartererStats } from './charterer-dashboard-data';

export function ChartererStatsCards() {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {chartererStats.map((item) => (
                <article
                    key={item.label}
                    className="flex items-center justify-between rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm"
                >
                    <div>
                        <p className="text-[13px] font-medium text-[#6b7280]">
                            {item.label}
                        </p>
                        <p className="mt-2 text-[32px] leading-none font-bold text-[#111827]">
                            {item.value}
                        </p>
                    </div>

                    <span
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                        style={{
                            backgroundColor: item.iconBg,
                            color: item.iconColor,
                        }}
                    >
                        <item.icon className="h-6 w-6" />
                    </span>
                </article>
            ))}
        </section>
    );
}
