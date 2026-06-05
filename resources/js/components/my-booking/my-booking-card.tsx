import { ArrowRight, Calendar, Clock, Download, MapPin, MessageSquare, RefreshCw, Shield, Star, User } from 'lucide-react';
import { Link } from '@inertiajs/react';
import type { BookingCardRecord } from './my-booking-data';

const statusStyles: Record<BookingCardRecord['status'], string> = {
    awaitingCaptainResponse: 'bg-orange-100 text-orange-800',
    pendingPayment: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
};

const actionIcons = {
    'messageSquare': MessageSquare,
    'arrowRight': ArrowRight,
    'download': Download,
    'refreshCw': RefreshCw,
};

export function MyBookingCard({ booking }: { booking: BookingCardRecord }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md md:flex-row">
            <div className="relative h-56 w-full shrink-0 md:h-auto md:w-80 lg:w-96">
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
                            <h3 className="text-xl leading-tight font-bold text-gray-900">
                                {booking.yachtName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Confirmation #{booking.confirmationCode}
                            </p>
                        </div>

                        <span
                            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${statusStyles[booking.status]}`}
                        >
                            {booking.statusLabel}
                        </span>
                    </header>

                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <img
                                    src={booking.captainAvatar || '/images/demoCaptain.png'}
                                    alt={booking.captainName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        Captain
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                        {booking.captainName}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Location
                                </p>
                                <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    {booking.location}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <p className="flex items-center gap-1.5">
                                    <User className="h-4 w-4 text-gray-400" />
                                    Charter: {booking.passengers}
                                </p>
                                <span className="text-gray-300">•</span>
                                <p className="flex items-center gap-1.5">
                                    <Shield className="h-4 w-4 text-gray-400" />
                                    Capacity: {booking.yachtCapacity}
                                </p>
                            </div>

                            {booking.rating ? (
                                <div className="flex items-center gap-2 pt-1">
                                    <p className="text-sm text-gray-600">
                                        Your Rating:
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {Array.from({
                                            length: booking.rating,
                                        }).map((item, index) => (
                                            <Star
                                                key={`${booking.id}-star-${index}`}
                                                className="h-4 w-4 fill-orange-400 text-orange-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="space-y-5">
                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Date & Time
                                </p>
                                <div className="space-y-1.5">
                                    <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                        {booking.date}
                                    </p>
                                    <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        {booking.time}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="mb-1 text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Total Paid
                                </p>
                                <p className="text-2xl font-bold text-cyan-500">
                                    {booking.totalPaid}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 flex items-center gap-3 border-t border-slate-100 pt-5">
                    <Link
                        href={`/my-booking/${booking.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-cyan-600"
                    >
                        <ArrowRight className="h-4 w-4" />
                        Learn More
                    </Link>
                    {booking.actions?.map((action) => {
                        const Icon = actionIcons[action.icon as keyof typeof actionIcons];

                        return (
                            <button
                                key={`${booking.id}-${action.id}`}
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
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