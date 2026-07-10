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
    Users,
    FileText,
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import type { BookingCardRecord } from './my-booking-data';

const statusStyles: Record<BookingCardRecord['status'], string> = {
    awaitingCaptainResponse: 'bg-orange-100 text-orange-800',
    pendingPayment: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
};

const actionIcons = {
    messageSquare: MessageSquare,
    arrowRight: ArrowRight,
    download: Download,
    refreshCw: RefreshCw,
};

export function MyBookingCard({ booking }: { booking: BookingCardRecord }) {
    // Handler for existing Agreement button
    const handleAgreementClick = (id: string) => {
        // Add your existing logic here, e.g., router.get(...)
        console.log('Agreement clicked for:', id);
    };

    const handleConfirmCompletion = (id: string) => {
        if (
            confirm('Are you sure you want to mark this charter as complete?')
        ) {
            // Pass the URL directly instead of using a route() helper
            router.post(`/my-booking/${id}/confirm-completion`);
        }
    };

    // Handler for Charterer to Decline Completion
    const handleDeclineCompletion = (id: string) => {
        if (
            confirm('Are you sure you want to decline this completion request?')
        ) {
            // Pass the URL directly
            router.post(`/my-booking/${id}/decline-completion`);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header Section */}
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {booking.vessel_name || 'Maiores autem numquaaaaaaaaa'}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                        <span>{booking.vessel_type || 'Sailing'}</span>
                        <span>•</span>
                        <span>{booking.vessel_length || '85.00'} ft</span>
                    </div>
                </div>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        statusStyles[booking.status] ||
                        'bg-gray-100 text-gray-800'
                    }`}
                >
                    {booking.statusLabel || 'Pending'}
                </span>
            </div>

            {/* Date and Time */}
            <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{booking.start_date || 'Jul 17, 2026'}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                        {booking.start_time || '18:17:00'} (
                        {booking.duration || '6'} hrs)
                    </span>
                </div>
            </div>

            {/* Charterer Section */}
            <div className="mb-4 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs tracking-wide text-gray-500 uppercase">
                                Charterer
                            </p>
                            <p className="font-medium text-gray-900">
                                {booking.charterer_name || 'Pending'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleAgreementClick(booking.id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Agreement
                    </button>
                </div>
            </div>

            {/* Assigned Crew Section */}
            <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <Users className="h-4 w-4" />
                    Assigned Crew
                </h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {booking.captains?.map((captain: any, index: number) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-blue-600">
                                    CAPTAIN {index + 1}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {captain.name}
                                </p>
                            </div>
                        </div>
                    ))}
                    {booking.deckhands?.map((deckhand: any, index: number) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <User className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-green-600">
                                    DECKHAND
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {deckhand.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {booking.agreements && booking.agreements.length > 0 ? (
                <div className="mb-4 rounded-lg border border-gray-200 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <FileText className="h-4 w-4" />
                        Signed Agreements ({booking.agreements.length})
                    </h4>
                    <div className="space-y-2">
                        {booking.agreements.map((agreement) => (
                            <div
                                key={agreement.id}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                            >
                                <span className="text-sm font-medium text-gray-700">
                                    {agreement.name}
                                </span>
                                <a
                                    href={agreement.downloadUrl}
                                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    <Download className="h-3 w-3" />
                                    Download
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mb-4 rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">
                        No signed agreements available yet.
                    </p>
                </div>
            )}
        </div>
    );
}
