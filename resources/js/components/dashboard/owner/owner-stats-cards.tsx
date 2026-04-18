import { ownerStatCards } from './owner-dashboard-data';

export function OwnerStatsCards() {
    return (
        <div className="grid gap-4 lg:grid-cols-4">
            {ownerStatCards.map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl border border-[#d4dbe3] bg-white p-6"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] text-[#4A5565]">{item.label}</p>
                            <p className="mt-2 text-[30px] font-semibold text-[#0f172a]">
                                {item.value}
                            </p>
                        </div>
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#EFF6FF]">
                            <item.icon
                                className="h-6 w-6"
                                style={{ color: item.iconColor }}
                            />
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
