import { Head, router, usePage } from '@inertiajs/react';
import {
    Award,
    Check,
    ChevronDown,
    Loader2,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    ShieldCheck,
    Star,
    User,
    Waves,
    X,
    Navigation,
} from 'lucide-react';
import { useState } from 'react';

import { captains } from '@/routes';

interface VesselOption {
    value: string;
    label: string;
}

interface CaptainDetail {
    id: string;
    user_id: string;
    name: string;
    photo: string | null;
    location: string;
    phone: string | null;
    license: string;
    endorsement: string;
    tonnage_rating: string;
    years_experience: string;
    boats_worked_on: string;
    bodies_of_water: string;
    geographic_area: string;
    hourly_rate: string;
    can_provide_deckhand: boolean;
    deckhand_hourly_rate: string | null;
    is_verified: boolean;
    travel_radius_miles: number | null;
    resume_url: string | null;
    license_doc_url: string | null;
}

interface PageProps {
    captain: CaptainDetail;
    vessels: VesselOption[];
    invitations: Record<string, string>;
    isAccepted: boolean;
    hasInterest: boolean;
}

function InviteModal({
    captain,
    vessels,
    invitations,
    onClose,
}: {
    captain: CaptainDetail;
    vessels: VesselOption[];
    invitations: Record<string, string>;
    onClose: () => void;
}) {
    const [selectedVessel, setSelectedVessel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const currentStatus = selectedVessel
        ? invitations[selectedVessel]
        : undefined;

    function handleSend() {
        if (!selectedVessel || isLoading) {
            return;
        }

        setIsLoading(true);
        router.post(
            `/captains/${captain.id}/invite`,
            { vessel_id: selectedVessel },
            {
                preserveScroll: true,
                onSuccess: onClose,
                onFinish: () => setIsLoading(false),
            },
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Invite Captain
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500">
                            {captain.name}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Select Vessel
                    </label>
                    <div className="relative">
                        <select
                            value={selectedVessel}
                            onChange={(e) => setSelectedVessel(e.target.value)}
                            className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#0A273F] focus:outline-none"
                        >
                            <option value="" disabled>
                                Choose a vessel…
                            </option>
                            {vessels.map((v) => (
                                <option key={v.value} value={v.value}>
                                    {v.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {currentStatus === 'accepted' && (
                        <p className="mt-2 text-xs text-emerald-600">
                            Already accepted for this vessel.
                        </p>
                    )}
                    {currentStatus === 'declined' && (
                        <p className="mt-2 text-xs text-red-500">
                            Captain declined for this vessel.
                        </p>
                    )}
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={
                            !selectedVessel ||
                            isLoading ||
                            currentStatus === 'accepted'
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                        Send Invitation
                    </button>
                </div>
            </div>
        </div>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 border-b border-gray-50 py-3 last:border-0">
            <span className="mt-0.5 text-gray-400">{icon}</span>
            <div>
                <p className="text-xs font-medium text-gray-400">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function CaptainShowPage() {
    const { captain, vessels, invitations, isAccepted, hasInterest } =
        usePage<PageProps>().props;

    const [showInviteModal, setShowInviteModal] = useState(false);

    const inviteStatuses = Object.values(invitations);
    const hasPendingInvite = inviteStatuses.includes('pending');

    function renderActionButton() {
        if (isAccepted) {
            return (
                <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700">
                    <Check className="h-4 w-4" /> Accepted
                </span>
            );
        }

        if (hasInterest && !hasPendingInvite) {
            return (
                <span className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-5 py-2.5 text-sm font-medium text-amber-700">
                    <Check className="h-4 w-4" /> Requested You
                </span>
            );
        }

        if (hasPendingInvite) {
            return (
                <span className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-2.5 text-sm font-medium text-blue-700">
                    <Send className="h-4 w-4" /> Invitation Sent
                </span>
            );
        }

        return (
            <button
                type="button"
                onClick={() => setShowInviteModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A273F] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#123651]"
            >
                <Send className="h-4 w-4" /> Send Invitation
            </button>
        );
    }

    return (
        <>
            <Head title={captain.name} />

            {showInviteModal && (
                <InviteModal
                    captain={captain}
                    vessels={vessels}
                    invitations={invitations}
                    onClose={() => setShowInviteModal(false)}
                />
            )}

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="relative shrink-0">
                                    {captain.photo ? (
                                        <img
                                            src={captain.photo}
                                            alt={captain.name}
                                            className="h-24 w-24 rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-100">
                                            <User className="h-10 w-10 text-gray-400" />
                                        </div>
                                    )}
                                    {captain.is_verified && (
                                        <span className="absolute -right-2 -bottom-2 rounded-full bg-white p-1 shadow">
                                            <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {captain.name}
                                        </h1>
                                        {captain.is_verified && (
                                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    {captain.location && (
                                        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4" />{' '}
                                            {captain.location}
                                        </p>
                                    )}
                                    <p className="mt-2 text-xl font-bold text-[#0A273F]">
                                        {captain.hourly_rate}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {renderActionButton()}
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.get('/messages', {
                                            with: captain.user_id,
                                        })
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <MessageSquare className="h-4 w-4" />{' '}
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-base font-semibold text-gray-900">
                                License & Qualifications
                            </h2>
                            <InfoRow
                                icon={<Award className="h-4 w-4" />}
                                label="License Type"
                                value={captain.license}
                            />
                            <InfoRow
                                icon={<ShieldCheck className="h-4 w-4" />}
                                label="Endorsement"
                                value={captain.endorsement}
                            />
                            <InfoRow
                                icon={<Star className="h-4 w-4" />}
                                label="Tonnage Rating"
                                value={captain.tonnage_rating}
                            />
                            <InfoRow
                                icon={<Star className="h-4 w-4" />}
                                label="Years Experience"
                                value={captain.years_experience}
                            />
                        </div>

                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-base font-semibold text-gray-900">
                                Operating Info
                            </h2>
                            <InfoRow
                                icon={<Waves className="h-4 w-4" />}
                                label="Bodies of Water"
                                value={captain.bodies_of_water}
                            />
                            <InfoRow
                                icon={<Navigation className="h-4 w-4" />}
                                label="Geographic Area"
                                value={captain.geographic_area}
                            />
                            {captain.travel_radius_miles && (
                                <InfoRow
                                    icon={<MapPin className="h-4 w-4" />}
                                    label="Travel Radius"
                                    value={`${captain.travel_radius_miles} miles`}
                                />
                            )}
                            <InfoRow
                                icon={<Star className="h-4 w-4" />}
                                label="Boats Worked On"
                                value={captain.boats_worked_on}
                            />
                        </div>

                        {captain.can_provide_deckhand && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Deckhand Service
                                </h2>
                                <p className="text-sm text-gray-600">
                                    This captain can provide a deckhand.
                                </p>
                                {captain.deckhand_hourly_rate && (
                                    <p className="mt-2 text-sm font-semibold text-gray-900">
                                        Rate: {captain.deckhand_hourly_rate}
                                    </p>
                                )}
                            </div>
                        )}
                        {captain.phone && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Contact
                                </h2>
                                <InfoRow
                                    icon={<Phone className="h-4 w-4" />}
                                    label="Phone"
                                    value={captain.phone}
                                />
                            </div>
                        )}
                        {(captain.resume_url || captain.license_doc_url) && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                                <h2 className="mb-4 text-base font-semibold text-gray-900">
                                    Documents
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {captain.license_doc_url && (
                                        <a
                                            href={captain.license_doc_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl border border-[#0A273F]/20 bg-[#0A273F]/5 px-4 py-2.5 text-sm font-medium text-[#0A273F] transition-colors hover:bg-[#0A273F]/10"
                                        >
                                            <Award className="h-4 w-4" />
                                            View License Document
                                        </a>
                                    )}
                                    {captain.resume_url && (
                                        <a
                                            href={captain.resume_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                        >
                                            <User className="h-4 w-4" />
                                            View Resume
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

CaptainShowPage.layout = {
    breadcrumbs: [
        { title: 'Captains', href: captains() },
        { title: 'Captain Profile' },
    ],
    pageHeader: {
        title: 'Captain Profile',
        description: 'View captain qualifications and details.',
    },
};
