import { Star } from 'lucide-react';
import { chartererCompletedCharters } from './charterer-dashboard-data';

export function ChartererCompletedCharters() {
    return (
        <section className="rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-[17px] font-bold leading-tight text-[#111827]">
                Recent Completed Charters
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {chartererCompletedCharters.map((item) => (
                    <article
                        key={`${item.yachtName}-${item.date}`}
                        className="rounded-[12px] border border-[#f1f5f9] bg-white p-5 transition-colors hover:border-[#e5e7eb]"
                    >
                        <div className="mb-2 flex items-start justify-between">
                            <h4 className="text-[15px] font-bold text-[#111827]">
                                {item.yachtName}
                            </h4>
                            <span className="inline-flex items-center rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#15803d]">
                                Completed
                            </span>
                        </div>

                        <p className="text-[13px] text-[#6b7280]">{item.captain}</p>
                        <p className="mt-1 mb-4 text-[12px] text-[#9ca3af]">
                            {item.date}
                        </p>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: item.rating }).map((_, index) => (
                                <Star
                                    key={`${item.yachtName}-${index}`}
                                    className="h-4 w-4 fill-[#fb923c] text-[#fb923c]"
                                />
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
