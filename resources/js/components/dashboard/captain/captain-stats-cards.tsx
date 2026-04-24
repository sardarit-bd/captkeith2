import { captainStatCards } from './captain-dashboard-data';

export function CaptainStatsCards() {
    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {captainStatCards.map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] font-medium text-[#4A5565]">
                                {item.label}
                            </p>
                            <p className="mt-2 text-[30px] font-semibold text-[#0f172a]">
                                {item.value}
                            </p>
                        </div>
                        <span
                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                            style={{ backgroundColor: item.iconBg }}
                        >
                            <item.icon
                                className="h-6 w-6"
                                style={{ color: item.iconColor }}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}
