import { Calendar, Clock, MapPin } from 'lucide-react';
import { chartererUpcomingBooking } from './charterer-dashboard-data';

export function ChartererUpcomingBooking() {
    return (
        <section className="flex h-full flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[17px] font-bold leading-tight text-[#111827]">
                    Upcoming Booking
                </h3>
                <button
                    type="button"
                    className="text-[13px] font-semibold text-[#111827] transition-colors hover:text-[#0a273f]"
                >
                    View All
                </button>
            </div>

            <article className="flex flex-1 flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-5 shadow-sm transition-colors hover:border-[#e5e7eb] sm:p-6">
                <div className="mb-2 flex items-start justify-between">
                    <div>
                        <h4 className="text-[16px] font-bold text-[#111827]">
                            {chartererUpcomingBooking.yachtName}
                        </h4>
                        <p className="mt-1 text-[13px] text-[#6b7280]">
                            {chartererUpcomingBooking.statusLabel}
                        </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#ea580c]">
                        {chartererUpcomingBooking.progressLabel}
                    </span>
                </div>

                <div className="my-6 space-y-3">
                    <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                        <Calendar className="h-4 w-4 text-[#9ca3af]" />
                        {chartererUpcomingBooking.date}
                    </p>
                    <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                        <Clock className="h-4 w-4 text-[#9ca3af]" />
                        {chartererUpcomingBooking.time}
                    </p>
                    <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                        <MapPin className="h-4 w-4 text-[#9ca3af]" />
                        {chartererUpcomingBooking.location}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-[#f8fafc] pt-6">
                    <button
                        type="button"
                        className="text-[13px] font-medium text-[#06b6d4] transition-colors hover:text-[#0891b2]"
                    >
                        {chartererUpcomingBooking.nextStep}
                    </button>

                    <button
                        type="button"
                        className="rounded-lg bg-[#111827] px-6 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937]"
                    >
                        Continue
                    </button>
                </div>
            </article>
        </section>
    );
}
