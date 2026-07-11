import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    FileText,
    MapPin,
    User,
    Users,
    XCircle,
    AlertCircle,
} from 'lucide-react';

type CrewMember = {
    id: string;
    name: string;
    photo: string | null;
    role: string;
    licenseType?: string;
    yearsExperience?: number;
    hourlyRate?: number;
};

type Agreement = {
    id: string;
    name: string;
    role: 'captain' | 'deckhand' | 'owner';
    downloadUrl: string;
    signedAt?: string | null;
    fullySignedAt?: string | null;
    signStatus: string;
};

type CharterDetail = {
    id: string;
    yachtName: string;
    vesselType: string;
    vesselLength: string;
    image: string | null;
    status: string;
    statusLabel: string;
    date: string;
    startTime: string;
    duration: number;
    location: string;
    passengers: string;
    specialNotes: string;
    captains: CrewMember[];
    deckhand: CrewMember | null;
    agreements: Agreement[];
    canCancel: boolean;
    canComplete: boolean;
    completionRequestedAt?: string | null;
    completedAt?: string | null;
};

type Props = {
    charter: CharterDetail;
};

export default function CheckCharterPage() {
    const { charter } = usePage<Props>().props;

    const handleConfirmCompletion = () => {
        if (
            confirm('Are you sure you want to mark this charter as complete?')
        ) {
            router.post(`/my-booking/${charter.id}/confirm-completion`);
        }
    };

    const handleDeclineCompletion = () => {
        if (
            confirm('Are you sure you want to decline this completion request?')
        ) {
            router.post(`/my-booking/${charter.id}/decline-completion`);
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel this charter?')) {
            router.post(`/my-booking/${charter.id}/cancel`);
        }
    };

    const handleBack = () => {
        router.get('/my-booking');
    };

    return (
        <>
            <Head title={`Charter — ${charter.yachtName}`} />

            <div className="min-h-screen bg-[#F6FDFF]">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to My Bookings
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {charter.yachtName}
                        </h1>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span>{charter.vesselType}</span>
                            <span>•</span>
                            <span>{charter.vesselLength}</span>
                            <span>•</span>
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    charter.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : charter.status === 'completed'
                                          ? 'bg-blue-100 text-[#35AED5]'
                                          : charter.status === 'cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-orange-100 text-orange-800'
                                }`}
                            >
                                {charter.statusLabel}
                            </span>
                        </div>
                    </div>

                    {/* Yacht Image */}
                    {charter.image && (
                        <div className="mb-6 overflow-hidden rounded-xl">
                            <img
                                src={charter.image}
                                alt={charter.yachtName}
                                className="h-64 w-full object-cover"
                            />
                        </div>
                    )}

                    {/* Charter Details */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                            <Calendar className="h-5 w-5 text-[#35AED5]" />
                            <div>
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="font-medium text-gray-900">
                                    {charter.date}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                            <Clock className="h-5 w-5 text-[#35AED5]" />
                            <div>
                                <p className="text-xs text-gray-500">Time</p>
                                <p className="font-medium text-gray-900">
                                    {charter.startTime} ({charter.duration} hrs)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                            <MapPin className="h-5 w-5 text-[#35AED5]" />
                            <div>
                                <p className="text-xs text-gray-500">
                                    Location
                                </p>
                                <p className="font-medium text-gray-900">
                                    {charter.location}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
                            <Users className="h-5 w-5 text-[#35AED5]" />
                            <div>
                                <p className="text-xs text-gray-500">
                                    Passengers
                                </p>
                                <p className="font-medium text-gray-900">
                                    {charter.passengers}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Special Notes */}
                    {charter.specialNotes && (
                        <div className="mb-6 rounded-lg bg-amber-50 p-4">
                            <p className="text-sm font-medium text-amber-800">
                                Special Notes
                            </p>
                            <p className="mt-1 text-sm text-amber-700">
                                {charter.specialNotes}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mb-6 flex flex-wrap gap-3">
                        {charter.canCancel && (
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                                <XCircle className="h-4 w-4" />
                                Cancel Charter
                            </button>
                        )}
                        {charter.canComplete && (
                            <>
                                <button
                                    onClick={handleConfirmCompletion}
                                    className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    Mark as Complete
                                </button>
                                <button
                                    onClick={handleDeclineCompletion}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Decline Completion
                                </button>
                            </>
                        )}
                    </div>

                    {/* Completion Requested Banner */}
                    {charter.canComplete && (
                        <div className="mb-6 flex items-center gap-3 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>
                                The owner has requested to mark this charter as
                                complete. Please confirm or decline.
                            </p>
                        </div>
                    )}

                    {/* Assigned Crew */}
                    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <Users className="h-5 w-5" />
                            Assigned Crew
                        </h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {charter.captains.map((captain, index) => (
                                <div
                                    key={captain.id}
                                    className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
                                >
                                    {captain.photo ? (
                                        <img
                                            src={captain.photo}
                                            alt={captain.name}
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                                            <User className="h-7 w-7 text-[#35AED5]" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs font-bold tracking-wide text-[#35AED5] uppercase">
                                            Captain {index + 1}
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {captain.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {captain.licenseType}
                                            {captain.yearsExperience
                                                ? ` · ${captain.yearsExperience} years`
                                                : ''}
                                            {captain.hourlyRate
                                                ? ` · $${captain.hourlyRate}/hr`
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {charter.deckhand && (
                                <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                                    {charter.deckhand.photo ? (
                                        <img
                                            src={charter.deckhand.photo}
                                            alt={charter.deckhand.name}
                                            className="h-14 w-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                            <User className="h-7 w-7 text-green-600" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs font-bold tracking-wide text-green-600 uppercase">
                                            Deckhand
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {charter.deckhand.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {charter.deckhand.yearsExperience
                                                ? `${charter.deckhand.yearsExperience} years experience`
                                                : ''}
                                            {charter.deckhand.hourlyRate
                                                ? ` · $${charter.deckhand.hourlyRate}/hr`
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {charter.captains.length === 0 &&
                                !charter.deckhand && (
                                    <p className="col-span-full text-sm text-gray-500">
                                        No crew assigned yet.
                                    </p>
                                )}
                        </div>
                    </div>

                    {/* Agreements */}
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                            <FileText className="h-5 w-5" />
                            Charter Agreements
                        </h2>
                        {charter.agreements.length > 0 ? (
                            <div className="space-y-3">
                                {charter.agreements.map((agreement) => (
                                    <div
                                        key={agreement.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {agreement.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {agreement.signStatus ===
                                                'fully_signed'
                                                    ? `Fully signed on ${agreement.fullySignedAt ? new Date(agreement.fullySignedAt).toLocaleDateString() : '—'}`
                                                    : agreement.signedAt
                                                      ? 'Awaiting counter-signature'
                                                      : 'Awaiting your signature'}
                                            </p>
                                        </div>
                                        <a
                                            href={agreement.downloadUrl}
                                            className="flex items-center gap-2 rounded-lg bg-[#35AED5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#35AED5]/70"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                No agreements available yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

CheckCharterPage.layout = {
    breadcrumbs: [
        { title: 'My Bookings', href: '/my-booking' },
        { title: 'Charter Details', href: '#' },
    ],
    pageHeader: {
        title: 'Charter Details',
        description:
            'View your charter information, assigned crew, and agreements.',
    },
};
