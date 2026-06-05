import { usePage } from '@inertiajs/react';
import { Anchor, Calendar, Clock, MapPin, User, Briefcase, DollarSign, UserCheck } from 'lucide-react';
import type { ChartererDashboardData } from './charterer-dashboard-types';

const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-600',
    awaiting_responses: 'bg-[#fff7ed] text-[#ea580c]',
    ready_for_charterer: 'bg-[#eff6ff] text-[#2563eb]',
    captain_selected: 'bg-[#f0fdf4] text-[#16a34a]',
    agreements_pending: 'bg-[#fefce8] text-[#ca8a04]',
    agreements_signed: 'bg-[#f0fdf4] text-[#16a34a]',
    insurance_pending: 'bg-[#fff7ed] text-[#ea580c]',
    insurance_complete: 'bg-[#dcfce7] text-[#15803d]',
    completed: 'bg-[#dcfce7] text-[#15803d]',
    cancelled: 'bg-[#fee2e2] text-[#991b1b]',
};

export function ChartererUpcomingBooking() {
    const { dashboard } = usePage<{ dashboard: ChartererDashboardData }>()
        .props;
    const booking = dashboard.upcomingBooking;
    console.log('Upcoming Booking:', booking);
    return (
        <section className="flex h-full flex-col rounded-[14px] border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
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
                <div className="flex flex-1 flex-col">
                    {booking.yachtImage && (
                        <img
                            src={booking.yachtImage}
                            alt={booking.yachtName}
                            className="mb-4 h-40 w-full rounded-[10px] object-cover"
                        />
                    )}

                    <div className="mb-3 flex items-start justify-between gap-2">
                        <h4 className="text-[16px] font-bold text-[#111827]">
                            {booking.yachtName}
                        </h4>
                        <span
                            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${statusColors[booking.status] ?? 'bg-gray-100 text-gray-600'}`}
                        >
                            {booking.statusLabel}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <Calendar className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            {booking.date}
                        </p>
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <Clock className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            {booking.startTime}&nbsp;&middot;&nbsp;
                            {booking.duration}
                        </p>
                        <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                            <MapPin className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            {booking.marina}
                        </p>
                        {booking.captainName && (
                            <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                <User className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                Captain: {booking.captainName}
                            </p>
                        )}

                        
                    </div>
                    {booking?.deckhand && (
                        <div className="mt-5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
                            <div className="mb-3 flex items-center gap-2">
                                <UserCheck className="h-4 w-4 text-[#16a34a]" />
                                <h5 className="text-[14px] font-bold text-[#111827]">Deckhand Selected</h5>
                            </div>
                            <div className="space-y-2.5">
                                <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                    <User className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                    <span className="font-semibold text-[#111827]">{booking.deckhand.name}</span>
                                </p>
                                <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                    <Briefcase className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                    {booking.deckhand.experience}
                                </p>
                                <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                    <DollarSign className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                    {booking.deckhand.rate}
                                </p>
                                <p className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                    <UserCheck className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                    Selected by: <span className="font-medium text-[#111827]">{booking.deckhand.selectedBy}</span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
