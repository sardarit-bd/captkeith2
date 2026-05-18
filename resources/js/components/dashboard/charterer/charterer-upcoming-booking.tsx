import { usePage } from '@inertiajs/react';
import { Anchor, Calendar, Clock, MapPin } from 'lucide-react';
import type { ChartererDashboardData } from './charterer-dashboard-types';

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    pending: 'bg-[#fff7ed] text-[#ea580c]',
    confirmed: 'bg-[#eff6ff] text-[#2563eb]',
    booked: 'bg-[#f0fdf4] text-[#16a34a]',
    completed: 'bg-[#dcfce7] text-[#15803d]',
    cancelled: 'bg-[#fee2e2] text-[#991b1b]',
};

export function ChartererUpcomingBooking() {
    const { dashboard } = usePage<{ dashboard: ChartererDashboardData }>()
        .props;
    const booking = dashboard.upcomingBooking;

    return (
        <section className="flex h-full flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[17px] leading-tight font-bold text-[#111827]">
                    Upcoming Booking
                </h3>
            </div>

            {!booking ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                    <Anchor className="mb-3 h-10 w-10 text-[#e5e7eb]" />
                    <p className="text-[14px] font-medium text-[#9ca3af]">
                        No upcoming bookings
                    </p>
                    <p className="mt-1 text-[12px] text-[#d1d5db]">
                        Your next charter will appear here once confirmed.
                    </p>
                </div>
            ) : (
                <article className="flex flex-1 flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h4 className="text-[16px] font-bold text-[#111827]">
                                {booking.yachtName}
                            </h4>
                            {booking.captainName && (
                                <p className="mt-1 text-[13px] text-[#6b7280]">
                                    Captain: {booking.captainName}
                                </p>
                            )}
                        </div>
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide capitalize ${statusColors[booking.status] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                            {booking.status}
                        </span>
                    </div>

                    <div className="my-6 space-y-3">
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <Calendar className="h-4 w-4 text-[#9ca3af]" />
                            {booking.date}
                        </p>
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <Clock className="h-4 w-4 text-[#9ca3af]" />
                            {booking.startTime} &middot; {booking.duration}
                        </p>
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <MapPin className="h-4 w-4 text-[#9ca3af]" />
                            {booking.marina}
                        </p>
                    </div>
                </article>
            )}
        </section>
    );
}
