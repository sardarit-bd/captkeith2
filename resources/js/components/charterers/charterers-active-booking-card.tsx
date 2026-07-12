import { router } from '@inertiajs/react';
import {
    Calendar,
    Clock,
    Send,
    X,
    CheckCircle2,
    Ship,
    User,
} from 'lucide-react';

interface Captain {
    name: string;
    avatar: string | null;
}

interface Booking {
    id: string;
    yachtName: string;
    yachtType: string;
    yachtLength: string;
    date: string;
    startTime: string;
    duration: string;
    yachtImage: string | null;
    chartererName: string;
    status: string;
    completionRequestedAt?: string | null;
    captains?: Captain[];
    deckhand?: Captain | null;
}

export function CharterersActiveBookingCard({ booking }: { booking: Booking }) {
    const handleRequestCompletion = (id: string) => {
        if (
            confirm(
                'Are you sure you want to request completion for this charter?',
            )
        ) {
            router.post(`/charterers/${id}/request-completion`);
        }
    };

    const handleCancelCompletion = (id: string) => {
        if (
            confirm('Are you sure you want to cancel this completion request?')
        ) {
            router.post(`/charterers/${id}/cancel-completion`);
        }
    };

    const isCompleted = booking.status === 'Completed';
    const isRequested = !!booking.completionRequestedAt;

    return (
        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-[#f0f0f0] bg-[#f8fbff] px-5 py-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Ship className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-[#111827]">
                        {booking.yachtName}
                    </h3>
                    <p className="text-xs text-[#6b7280]">
                        {booking.yachtType} • {booking.yachtLength}
                    </p>
                </div>
                <span
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
                        isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-blue-100 text-blue-700'
                    }`}
                >
                    {booking.status}
                </span>
            </div>

            {/* Details */}
            <div className="space-y-3 px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-[#374151]">
                    <Calendar className="h-4 w-4 text-[#35ADD5]" />
                    <span>
                        {booking.date} at {booking.startTime} (
                        {booking.duration})
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#374151]">
                    <User className="h-4 w-4 text-[#35ADD5]" />
                    <span>
                        Charterer: <strong>{booking.chartererName}</strong>
                    </span>
                </div>
            </div>

            {/* Action Button Section */}
            <div className="border-t border-[#f0f0f0] bg-[#f8fbff] px-5 py-4">
                {isCompleted ? (
                    // Hide button if already completed
                    <div className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-emerald-600">
                        <CheckCircle2 className="h-5 w-5" />
                        Charter Successfully Completed
                    </div>
                ) : isRequested ? (
                    // Show Cancel button if request was sent
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-medium text-amber-600">
                            <Clock className="h-4 w-4" />
                            Awaiting Charterer Confirmation
                        </div>
                        <button
                            onClick={() => handleCancelCompletion(booking.id)}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                        >
                            <X className="h-4 w-4" />
                            Cancel Request
                        </button>
                    </div>
                ) : (
                    // Show Request button initially
                    <button
                        onClick={() => handleRequestCompletion(booking.id)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#35ADD5] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#35ADD5]/70"
                    >
                        <Send className="h-4 w-4" />
                        Request Completion
                    </button>
                )}
            </div>
        </div>
    );
}
