import { type CaptainDashboardProps } from './captain-dashboard-data';
import { Link, usePage } from '@inertiajs/react';
import { CalendarDays, Clock3, Inbox } from 'lucide-react';
import { requests } from '@/routes';

export function CaptainCharterRequests() {
    const { dashboard } = usePage<{ dashboard: CaptainDashboardProps }>().props;
    const charterRequests = dashboard.charterRequests;

    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-4 shadow-sm">
            <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-[17px] font-semibold text-[#0f172a]">
                        Charter Requests
                    </h3>
                    <p className="text-[13px] text-[#6b7280]">
                        Pending availability requests
                    </p>
                </div>

                <div className="flex flex-col justify-between gap-4">
                    {charterRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Inbox className="mb-2 h-8 w-8 text-[#d1d5db]" />
                            <p className="text-[13px] text-[#6b7280]">
                                No pending requests.
                            </p>
                            <p className="text-[12px] text-[#9ca3af]">
                                New charter requests will appear here.
                            </p>
                        </div>
                    ) : (
                        charterRequests.map((item) => (
                            <article
                                key={item.id}
                                className="w-full rounded-xl border border-[#e5e7eb] bg-white p-4 transition-colors hover:border-[#d4dbe3]"
                            >
                                <div className="mb-3 flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-[15px] font-semibold text-[#111827]">
                                            {item.yachtName}
                                        </p>
                                        <p className="text-[12.5px] text-[#6b7280]">
                                            {item.yachtSpec}
                                        </p>
                                    </div>
                                    <span className="rounded-full bg-[#6b7280] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
                                        {item.status}
                                    </span>
                                </div>

                                <div className="mb-4 space-y-2">
                                    <p className="flex items-center gap-2 text-[13px] text-[#4b5563]">
                                        <CalendarDays className="h-4 w-4 text-[#9ca3af]" />
                                        {item.date}
                                    </p>
                                    <p className="flex items-center gap-2 text-[13px] text-[#4b5563]">
                                        <Clock3 className="h-4 w-4 text-[#9ca3af]" />
                                        {item.duration}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center rounded-lg bg-[#35ADD5] px-5 py-2 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex cursor-pointer items-center rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <Link
                    href={requests()}
                    className="mt-5 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-[#35ADD5] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#35ADD5]/70"
                >
                    View All Requests
                </Link>
            </div>
        </section>
    );
}
