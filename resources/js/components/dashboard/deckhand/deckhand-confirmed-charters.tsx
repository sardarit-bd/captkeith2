import { Calendar, CheckCircle2, Eye, MessageSquare, Ship } from 'lucide-react';
import { deckhandConfirmedCharters } from './deckhand-dashboard-data';

export function DeckhandConfirmedCharters() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6">
                <h3 className="text-[18px] font-bold text-[#111827]">
                    Confirmed Charters
                </h3>
                <p className="mt-1 text-[13px] text-[#6b7280]">
                    Your upcoming charter assignments
                </p>
            </header>

            <div className="space-y-4">
                {deckhandConfirmedCharters.map((charter) => (
                    <article
                        key={charter.id}
                        className="rounded-2xl border border-green-200 bg-[#F0FDF4] p-5 transition-all hover:shadow-sm sm:p-6"
                    >
                        <div className="flex flex-col justify-between gap-6 lg:flex-row">
                            <div className="flex w-full flex-col gap-4 sm:w-2/3 sm:flex-row sm:gap-6">
                                <img
                                    src={charter.avatar}
                                    alt={charter.ownerName}
                                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                                />

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-[16px] leading-tight font-bold text-[#111827]">
                                                {charter.yachtName}
                                            </h4>
                                            <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                                {charter.ownerName} (Owner)
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-white px-2.5 py-1 text-[10px] font-medium text-green-700 shadow-sm lg:hidden">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Confirmed
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#4b5563]">
                                        <div className="flex items-center gap-1.5">
                                            <Ship className="h-4 w-4 text-[#9ca3af]" />
                                            {charter.yachtSpec}
                                        </div>
                                    </div>

                                    <p className="text-[13px] text-[#4b5563]">
                                        {charter.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex w-full flex-col justify-between gap-4 border-t border-[#e5e7eb] pt-4 lg:w-1/3 lg:items-end lg:border-0 lg:pt-0">
                                <div className="flex w-full flex-col lg:items-end">
                                    <span className="mb-3 hidden items-center gap-1 rounded-md border border-green-200 bg-white px-2.5 py-1 text-[10px] font-medium text-green-700 shadow-sm lg:inline-flex">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Confirmed
                                    </span>

                                    <p className="mb-1.5 flex items-center gap-2 text-[13px] text-[#4b5563]">
                                        <Calendar className="h-4 w-4 text-[#9ca3af]" />
                                        {charter.dateTime}
                                    </p>
                                    <p className="text-[13px]">
                                        <span className="text-[#6b7280]">
                                            Rate:{' '}
                                        </span>
                                        <span className="font-bold text-green-600">
                                            {charter.rate}
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
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                                    >
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        Message Owner
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
