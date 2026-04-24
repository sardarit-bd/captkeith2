import {
    ArrowRight,
    Calendar,
    Clock,
    Download,
    MapPin,
    MessageSquare,
    RefreshCw,
    Shield,
    Star,
    User,
} from 'lucide-react';
import type { BookingCardRecord } from './my-booking-data';

const statusStyles: Record<BookingCardRecord['status'], string> = {
    pending: 'bg-[#ffedd5] text-[#c2410c]',
    confirmed: 'bg-[#dcfce7] text-[#15803d]',
    completed: 'bg-[#dbeafe] text-[#1d4ed8]',
};

const actionIcons = {
    'message-square': MessageSquare,
    'arrow-right': ArrowRight,
    download: Download,
    'refresh-cw': RefreshCw,
};

export function MyBookingCard({ booking }: { booking: BookingCardRecord }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row">
            <div className="relative h-56 w-full shrink-0 md:h-auto md:w-[320px] lg:w-[380px]">
                <img
                    src={booking.image}
                    alt={booking.yachtName}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                    <header className="mb-6 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold leading-tight text-[#111827]">
                                {booking.yachtName}
                            </h3>
                            <p className="mt-1 text-[13px] text-[#6b7280]">
                                Confirmation #{booking.confirmationCode}
                            </p>
                        </div>

                        <span
                            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${statusStyles[booking.status]}`}
                        >
                            {booking.statusLabel}
                        </span>
                    </header>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={booking.captainAvatar}
                                    alt={booking.captainName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                                        Captain
                                    </p>
                                    <p className="text-[14px] font-bold text-[#111827]">
                                        {booking.captainName}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-1 text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                                    Location
                                </p>
                                <p className="flex items-center gap-2 text-[13px] font-medium text-[#111827]">
                                    <MapPin className="h-4 w-4 text-[#9ca3af]" />
                                    {booking.location}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 text-[13px] text-[#4b5563]">
                                <p className="flex items-center gap-1.5">
                                    <User className="h-4 w-4 text-[#9ca3af]" />
                                    {booking.passengers}
                                </p>
                                <span className="text-[#d1d5db]">•</span>
                                <p className="flex items-center gap-1.5">
                                    <Shield className="h-4 w-4 text-[#9ca3af]" />
                                    {booking.coverage}
                                </p>
                            </div>

                            {booking.rating ? (
                                <div className="flex items-center gap-2 pt-1">
                                    <p className="text-[13px] text-[#4b5563]">Your Rating:</p>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: booking.rating }).map((_, index) => (
                                            <Star
                                                key={`${booking.id}-star-${index}`}
                                                className="h-4 w-4 fill-[#fb923c] text-[#fb923c]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="mb-1 text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                                    Date & Time
                                </p>
                                <div className="space-y-1.5">
                                    <p className="flex items-center gap-2 text-[13px] font-medium text-[#111827]">
                                        <Calendar className="h-4 w-4 text-[#9ca3af]" />
                                        {booking.date}
                                    </p>
                                    <p className="flex items-center gap-2 text-[13px] font-medium text-[#111827]">
                                        <Clock className="h-4 w-4 text-[#9ca3af]" />
                                        {booking.time}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-1 text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                                    Total Paid
                                </p>
                                <p className="text-2xl font-bold text-[#06b6d4]">
                                    {booking.totalPaid}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 flex items-center gap-3 border-t border-[#f1f5f9] pt-5">
                    {booking.actions.map((action) => {
                        const Icon = actionIcons[action.icon];

                        return (
                            <button
                                key={`${booking.id}-${action.id}`}
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                            >
                                <Icon className="h-4 w-4" />
                                {action.label}
                            </button>
                        );
                    })}
                </footer>
            </div>
        </article>
    );
}
