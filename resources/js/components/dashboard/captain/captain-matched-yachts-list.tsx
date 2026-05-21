import { type CaptainDashboardProps } from './captain-dashboard-data';
import { Link, usePage } from '@inertiajs/react';
import { Ship } from 'lucide-react';
import { yachtsMatch } from '@/routes';

export function CaptainMatchedYachtsList() {
    const { dashboard } = usePage<{ dashboard: CaptainDashboardProps }>().props;
    const yachts = dashboard.matchedYachts;

    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-4 shadow-sm">
            <div className="flex h-full w-full flex-col items-center justify-between">
                <div className="w-full">
                    <h3 className="text-[17px] font-semibold text-[#0f172a]">
                        Matched Yachts
                    </h3>
                    <p className="text-[13px] text-[#6b7280]">
                        Vessels matching your qualifications
                    </p>

                    <div className="mt-4 space-y-4">
                        {yachts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <Ship className="mb-2 h-8 w-8 text-[#d1d5db]" />
                                <p className="text-[13px] text-[#6b7280]">
                                    No matched yachts yet.
                                </p>
                                <p className="text-[12px] text-[#9ca3af]">
                                    Complete your profile to get matched.
                                </p>
                            </div>
                        ) : (
                            yachts.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex items-center gap-3"
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-12 w-12 shrink-0 rounded-xl border border-[#e5e7eb] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f3f4f6]">
                                            <Ship className="h-5 w-5 text-[#9ca3af]" />
                                        </div>
                                    )}

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
                            ))
                        )}
                    </div>
                </div>

                <Link
                    href={yachtsMatch()}
                    className="mt-5 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#0D314D] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#0a273f]"
                >
                    View All Yachts
                </Link>
            </div>
        </section>
    );
}
