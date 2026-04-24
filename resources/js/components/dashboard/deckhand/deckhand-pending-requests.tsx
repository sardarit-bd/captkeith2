import { Calendar, Check, Clock3, Eye, Ship, X } from 'lucide-react';
import { deckhandPendingRequests } from './deckhand-dashboard-data';

export function DeckhandPendingRequests() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-[18px] font-bold text-[#111827]">
                        Pending Requests
                    </h3>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                        Review and respond to charter requests
                    </p>
                </div>
                <span className="inline-flex self-start rounded-md border border-[#FFEDD5] bg-[#FFF7ED] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#EA580C] sm:self-auto">
                    {deckhandPendingRequests.length} Pending
                </span>
            </header>

            <div className="space-y-4">
                {deckhandPendingRequests.map((request) => (
                    <article
                        key={request.id}
                        className="rounded-2xl border border-orange-200 bg-[#FFFAF5] p-5 transition-all hover:shadow-sm sm:p-6"
                    >
                        <div className="flex flex-col justify-between gap-6 lg:flex-row">
                            <div className="flex w-full flex-col gap-4 sm:w-2/3 sm:flex-row sm:gap-6">
                                <img
                                    src={request.avatar}
                                    alt={request.requestedBy}
                                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                                />

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-[16px] leading-tight font-bold text-[#111827]">
                                                {request.yachtName}
                                            </h4>
                                            <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                                Requested by{' '}
                                                {request.requestedBy} (
                                                {request.requesterRole})
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 rounded-md border border-orange-200 bg-white px-2.5 py-1 text-[10px] font-medium text-orange-600 shadow-sm lg:hidden">
                                            <Clock3 className="h-3 w-3" />
                                            {request.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#4b5563]">
                                        <div className="flex items-center gap-1.5">
                                            <Ship className="h-4 w-4 text-[#9ca3af]" />
                                            {request.yachtSpec}
                                        </div>
                                        <div>{request.duration}</div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {request.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium text-[#4b5563]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full flex-col justify-between gap-4 border-t border-[#e5e7eb] pt-4 lg:w-1/3 lg:items-end lg:border-0 lg:pt-0">
                                <div className="flex w-full flex-col lg:items-end">
                                    <span className="mb-3 hidden items-center gap-1 rounded-md border border-orange-200 bg-white px-2.5 py-1 text-[10px] font-medium text-orange-600 shadow-sm lg:inline-flex">
                                        <Clock3 className="h-3 w-3" />
                                        {request.status}
                                    </span>

                                    <p className="mb-1.5 flex items-center gap-2 text-[13px] text-[#4b5563]">
                                        <Calendar className="h-4 w-4 text-[#9ca3af]" />
                                        {request.dateTime}
                                    </p>
                                    <p className="text-[13px]">
                                        <span className="text-[#6b7280]">
                                            Rate:{' '}
                                        </span>
                                        <span className="font-bold text-green-600">
                                            {request.rate}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex w-full flex-wrap gap-2 lg:justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        View Details
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#16A34A] px-4 py-2 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#15803d]"
                                    >
                                        <Check className="h-4 w-4" />
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-4 py-2 text-[12px] font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50"
                                    >
                                        <X className="h-4 w-4" />
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
