import { chartererRecentActivities } from './charterer-dashboard-data';

export function ChartererRecentActivity() {
    return (
        <section className="flex h-full flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[17px] font-bold leading-tight text-[#111827]">
                    Recent Activity
                </h3>
                <button
                    type="button"
                    className="text-[13px] font-semibold text-[#111827] transition-colors hover:text-[#0a273f]"
                >
                    View All
                </button>
            </div>

            <div className="flex-1 space-y-4">
                {chartererRecentActivities.map((item) => (
                    <article
                        key={item.title}
                        className="flex gap-4 rounded-[12px] border p-4"
                        style={{
                            backgroundColor: item.cardBg,
                            borderColor: item.cardBorder,
                        }}
                    >
                        <span
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-sm"
                            style={{
                                backgroundColor: item.iconBg,
                                borderColor: item.iconCircleBorder,
                                color: item.iconColor,
                            }}
                        >
                            <item.icon className="h-4 w-4" />
                        </span>

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
        </section>
    );
}
