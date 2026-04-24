import { captainYachts } from './captain-dashboard-data';

export function CaptainMatchedYachtsList() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-4 shadow-sm">
            <h3 className="text-[17px] font-semibold text-[#0f172a]">Matched Yachts</h3>
            <p className="text-[13px] text-[#6b7280]">Recently added vessels</p>

            <div className="mt-4 space-y-4">
                {captainYachts.map((item) => (
                    <article
                        key={`${item.name}-${item.marina}`}
                        className="flex items-center gap-3"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 shrink-0 rounded-xl border border-[#e5e7eb] object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold text-[#111827]">
                                {item.name}
                            </p>
                            <p className="truncate text-[12.5px] text-[#6b7280]">
                                {item.spec}
                            </p>
                        </div>

                        <span className="rounded-md bg-[#eef2f5] px-2.5 py-1 text-[11px] font-medium text-[#334155]">
                            {item.marina}
                        </span>
                    </article>
                ))}
            </div>

            <button
                type="button"
                className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0D314D] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#0a273f]"
            >
                View All Yachts
            </button>
        </section>
    );
}
