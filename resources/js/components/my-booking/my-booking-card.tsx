import {
    ArrowRight,
    Calendar,
    CheckCircle,
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
    XCircle,
    AlertCircle,
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import type { BookingCardRecord } from './my-booking-data';

const statusStyles: Record<string, string> = {
    pending: 'bg-orange-100 text-orange-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
};

export function MyBookingCard({ booking }: { booking: BookingCardRecord }) {
    const handleAgreementClick = (id: string) => {
        router.get(`/charterer/agreement/${id}`);
    };

    const handleCheckCharter = () => {
        if (booking.checkCharterUrl) {
            router.get(booking.checkCharterUrl);
        }
    };

    const handleConfirmCompletion = () => {
        if (
            confirm('Are you sure you want to mark this charter as complete?')
        ) {
            router.post(`/my-booking/${booking.id}/confirm-completion`);
        }
    };

    const handleDeclineCompletion = () => {
        if (
            confirm('Are you sure you want to decline this completion request?')
        ) {
            router.post(`/my-booking/${booking.id}/decline-completion`);
        }
    };

    const handleCancel = () => {
        if (
            confirm(
                'Are you sure you want to cancel this charter? This action cannot be undone.',
            )
        ) {
            router.post(`/my-booking/${booking.id}/cancel`);
        }
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header Section */}
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        {booking.yachtName}
                    </h3>
                    <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                        <span>{booking.vesselType}</span>
                        <span>•</span>
                        <span>{booking.vesselLength}</span>
                        <span>•</span>
                        <span className="font-mono text-xs text-gray-400">
                            {booking.confirmationCode}
                        </span>
                    </div>
                </div>
                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                        statusStyles[booking.status] ||
                        'bg-gray-100 text-gray-800'
                    }`}
                >
                    {booking.statusLabel}
                </span>
            </div>

            {/* Yacht Image */}
            {booking.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                        src={booking.image}
                        alt={booking.yachtName}
                        className="h-48 w-full object-cover"
                    />
                </div>
            )}

            {/* Date and Time */}
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.location}</span>
                </div>
            </div>

            {/* Action Buttons Row */}
            <div className="mb-6 flex flex-wrap gap-3">
                {booking.status === 'pending' ? (
                    <Link
                        href={`charterer/request/${booking.id}`}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#35AED5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#35AED5]/70"
                    >
                        continue Charter
                    </Link>
                ) : (
                    <button
                        onClick={handleCheckCharter}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#35AED5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#35AED5]/70"
                    >
                        <FileText className="h-4 w-4" />
                        check Charter
                    </button>
                )}

                {booking.canCancel && (
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                        <XCircle className="h-4 w-4" />
                        Cancel
                    </button>
                )}

                {booking.canComplete && (
                    <>
                        <button
                            onClick={handleConfirmCompletion}
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                        >
                            <CheckCircle className="h-4 w-4" />
                            Complete
                        </button>
                        <button
                            onClick={handleDeclineCompletion}
                            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <XCircle className="h-4 w-4" />
                            Decline
                        </button>
                    </>
                )}
            </div>

            {/* Completion Requested Banner */}
            {booking.canComplete && (
                <div className="mb-4 flex items-center gap-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p>
                        The owner has requested to mark this charter as
                        complete. Please confirm or decline.
                    </p>
                </div>
            )}

            {/* Assigned Crew Section */}
            {(booking.captains.length > 0 || booking.deckhand) && (
                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                        <Users className="h-4 w-4" />
                        Assigned Crew
                    </h4>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {booking.captains.map((captain, index) => (
                            <div
                                key={captain.id}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                            >
                                {captain.photo ? (
                                    <img
                                        src={captain.photo}
                                        alt={captain.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <User className="h-5 w-5 text-[#35AED5]" />
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-[#35AED5]">
                                        CAPTAIN {index + 1}
                                    </p>
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {captain.name}
                                    </p>
                                    {captain.licenseType && (
                                        <p className="text-xs text-gray-500">
                                            {captain.licenseType}
                                            {captain.yearsExperience
                                                ? ` · ${captain.yearsExperience} yrs exp`
                                                : ''}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                        {booking.deckhand && (
                            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                                {booking.deckhand.photo ? (
                                    <img
                                        src={booking.deckhand.photo}
                                        alt={booking.deckhand.name}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                        <User className="h-5 w-5 text-green-600" />
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs font-medium text-green-600">
                                        DECKHAND
                                    </p>
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {booking.deckhand.name}
                                    </p>
                                    {booking.deckhand.yearsExperience && (
                                        <p className="text-xs text-gray-500">
                                            {booking.deckhand.yearsExperience}{' '}
                                            yrs experience
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Agreements Section */}
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
                                <div className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium text-gray-700">
                                        {agreement.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {agreement.signStatus === 'fully_signed'
                                            ? 'Fully signed'
                                            : agreement.signedAt
                                              ? 'Partially signed'
                                              : 'Pending signature'}
                                    </span>
                                </div>
                                <a
                                    href={agreement.downloadUrl}
                                    className="ml-3 flex shrink-0 items-center gap-1 rounded-lg bg-[#35AED5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#35AED5]/70"
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
