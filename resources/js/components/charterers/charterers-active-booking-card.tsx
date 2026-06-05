import { Calendar, Ship, User } from 'lucide-react';
import type { ActiveBooking } from './charterers-data';

const STATUS_STYLES: Record<string, string> = {
    'Booked':               'border-[#D1FAE5] bg-[#ECFDF5] text-[#059669]',
    'Confirmed':            'border-[#D1FAE5] bg-[#ECFDF5] text-[#059669]',
    'Pending':              'border-[#FEF3C7] bg-[#FFFBEB] text-[#D97706]',
    'Awaiting Responses':   'border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]',
    'Ready for Charterer':  'border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]',
    'Captain Selected':     'border-[#E9D5FF] bg-[#F5F3FF] text-[#7C3AED]',
    'Agreements Pending':   'border-[#FEF3C7] bg-[#FFFBEB] text-[#D97706]',
    'Agreements Signed':    'border-[#D1FAE5] bg-[#ECFDF5] text-[#059669]',
    'Insurance Pending':    'border-[#FEF3C7] bg-[#FFFBEB] text-[#D97706]',
    'Insurance Complete':   'border-[#D1FAE5] bg-[#ECFDF5] text-[#059669]',
    'Cancelled':            'border-[#FEE2E2] bg-[#FFF1F2] text-[#E11D48]',
};
export function CharterersActiveBookingCard({
    booking,
}: {
    booking: ActiveBooking;
}) {
    const statusCls =
        STATUS_STYLES[booking.status] ??
        'border-gray-200 bg-gray-50 text-gray-600';

    return (
        <article className="group flex flex-col justify-between gap-5 rounded-2xl border border-[#f1f5f9] bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-center gap-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[#f1f5f9] bg-gray-100 shadow-sm transition-shadow group-hover:shadow-md sm:h-20 sm:w-20">
                    {booking.yachtImage ? (
                        <img
                            src={booking.yachtImage}
                            alt={booking.yachtName}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Ship className="h-8 w-8 text-gray-300" />
                        </div>
                    )}
                </div>

                <div>
                    <h4 className="text-base font-bold text-[#111827] transition-colors group-hover:text-[#35ADD5]">
                        {booking.yachtName}
                    </h4>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-[#6b7280]">
                            {booking.yachtType}
                        </span>
                        {booking.yachtType && booking.yachtLength && (
                            <span className="h-1 w-1 rounded-full bg-[#d1d5db]" />
                        )}
                        <span className="text-sm text-[#6b7280]">
                            {booking.yachtLength}
                        </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#9ca3af]">
                        <Calendar className="h-3 w-3" />
                        {booking.date}
                    </p>
                </div>
            </div>

            <div className="flex w-full flex-row items-center justify-between gap-6 border-t border-[#f8fafc] pt-4 sm:w-auto sm:justify-end sm:gap-8 sm:border-0 sm:pt-0">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e5e7eb] bg-[#f9fafb] shadow-sm">
                        {booking.chartererAvatar ? (
                            <img
                                src={booking.chartererAvatar}
                                alt={booking.chartererName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <User className="h-5 w-5 text-gray-400" />
                        )}
                    </div>
                    <div className="text-left">
                        <p className="mb-0.5 text-[10px] font-bold tracking-wider text-[#9ca3af] uppercase">
                            Charterer
                        </p>
                        <p className="text-sm font-semibold text-[#111827]">
                            {booking.chartererName}
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-4 py-1.5 text-xs font-bold tracking-wide ${statusCls}`}
                >
                    {booking.status=="awaiting_responses" ? "awaiting responses" : booking.status}
                </span>
            </div>
        </article>
    );
}
