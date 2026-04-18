import { OWNER_ACCENT, ownerCaptainMatches } from './owner-dashboard-data';

export function OwnerCaptainMatches() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-4">
            <h3 className="text-[17px] font-semibold text-[#0f172a]">Matched Captains</h3>
            <p className="text-[13px] text-[#6b7280]">
                Top qualified captains for your yachts
            </p>

            <div className="mt-4 space-y-4">
                {ownerCaptainMatches.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-[13px] font-semibold text-[#111827]">
                                    {item.name}
                                </p>
                                <p className="text-[12.5px] text-[#6b7280]">
                                    {item.spec}
                                </p>
                            </div>
                        </div>

                        <span
                            className="rounded-full px-3 py-1 text-[11px] font-medium"
                            style={{
                                backgroundColor: '#e8f5ee',
                                color: OWNER_ACCENT,
                            }}
                        >
                            {item.match}
                        </span>
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0D314D] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#0a273f]"
            >
                View All Captains
            </button>
        </section>
    );
}
