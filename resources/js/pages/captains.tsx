import { Head, router, usePage } from '@inertiajs/react';
import {
    Award,
    Check,
    ChevronDown,
    Loader2,
    MapPin,
    MessageSquare,
    Search,
    Send,
    ShieldCheck,
    Star,
    User,
    X,
    AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import { captains } from '@/routes';

interface Captain {
    id: string;
    user_id: string;
    name: string;
    location: string;
    license: string;
    experience: string;
    endorsement: string[];
    bio: string;
    rate: string;
    availability: string;
    photo: string | null;
    is_verified: boolean;
}

interface VesselOption {
    value: string;
    label: string;
}

interface Filters {
    license_type?: string;
    min_experience?: string;
}

interface PageProps {
    captains: Captain[];
    filters: Filters;
    vessels: VesselOption[];
    invitations: Record<string, Record<string, string>>;
    acceptedCaptainIds: string[];
    acceptedViaInterestIds: string[];
    interestedCaptainIds: string[];
}

const LICENSE_OPTIONS = [
    { value: '', label: 'All Licenses' },
    { value: 'oupv', label: 'OUPV (6-Pack)' },
    { value: 'masters', label: 'Masters' },
];

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'Any Experience' },
    { value: '5', label: '5+ Years' },
    { value: '10', label: '10+ Years' },
    { value: '15', label: '15+ Years' },
];

const LICENSE_LABELS: Record<string, string> = {
    oupv: 'OUPV (Six-Pack)',
    masters: 'Master License',
};

function InviteModal({
    captain,
    vessels,
    existingInvitations,
    onClose,
}: {
    captain: Captain;
    vessels: VesselOption[];
    existingInvitations: Record<string, string>;
    onClose: () => void;
}) {
    const [selectedVessel, setSelectedVessel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const currentStatus = selectedVessel
        ? existingInvitations[selectedVessel]
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
                onSuccess: () => {
                    router.visit('/captains', {
                        preserveScroll: true,
                        onFinish: onClose,
                    });
                },
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
                        className="cursor-pointer rounded-md p-1 text-gray-400 hover:bg-gray-100"
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
                            className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#35ADD5] focus:outline-none"
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
                            This captain already accepted for this vessel.
                        </p>
                    )}
                    {currentStatus === 'declined' && (
                        <p className="mt-2 text-xs text-red-500">
                            This captain declined the invitation for this
                            vessel.
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#35ADD5] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#35ADD5]/70 disabled:cursor-not-allowed disabled:opacity-50"
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

function CancelConfirmModal({
    captain,
    vesselId,
    onClose,
}: {
    captain: Captain;
    vesselId: string;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleConfirmCancel() {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        router.delete(`/captains/${captain.id}/invite`, {
            data: vesselId ? { vessel_id: vesselId } : {},
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/captains', {
                    preserveScroll: true,
                    onFinish: onClose,
                });
            },
            onFinish: () => setIsLoading(false),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Cancel Invitation
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Are you sure you want to cancel the invitation sent
                            to{' '}
                            <span className="font-medium text-gray-700">
                                {captain.name}
                            </span>
                            ? This action cannot be undone.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Keep It
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirmCancel}
                        disabled={isLoading}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <X className="h-4 w-4" />
                        )}
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function InviteButton({
    captain,
    invitations,
    acceptedCaptainIds,
    acceptedViaInterestIds,
    interestedCaptainIds,
    onOpenInvite,
    onOpenCancel,
    onOpenRevokeAcceptance,
}: {
    captain: Captain;
    invitations: Record<string, Record<string, string>>;
    acceptedCaptainIds: string[];
    acceptedViaInterestIds: string[];
    interestedCaptainIds: string[];
    onOpenInvite: () => void;
    onOpenCancel: () => void;
    onOpenRevokeAcceptance: () => void;
}) {
    const captainInvites = invitations[captain.id] ?? {};
    const statuses = Object.values(captainInvites);

    const isAcceptedViaInterest = acceptedViaInterestIds.includes(captain.id);
    const isAcceptedViaInvitation =
        statuses.includes('accepted') ||
        (acceptedCaptainIds.includes(captain.id) && !isAcceptedViaInterest);
    const isAccepted = acceptedCaptainIds.includes(captain.id);
    const hasPendingInterest =
        interestedCaptainIds.includes(captain.id) && !isAccepted;

    if (isAccepted) {
        return (
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                    Accepted
                </span>
                <button
                    type="button"
                    onClick={
                        isAcceptedViaInterest
                            ? onOpenRevokeAcceptance
                            : onOpenCancel
                    }
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                </button>
            </div>
        );
    }

    if (statuses.includes('pending')) {
        return (
            <button
                type="button"
                onClick={onOpenCancel}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
                <X className="h-3.5 w-3.5" />
                Cancel Invitation
            </button>
        );
    }

    if (hasPendingInterest) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                <Check className="h-3.5 w-3.5" />
                Requested You
            </span>
        );
    }

    return (
        <button
            type="button"
            onClick={onOpenInvite}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#35ADD5] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#35ADD5]/70"
        >
            <Send className="h-3.5 w-3.5" />
            Send Invitation
        </button>
    );
}

export default function CaptainsPage() {
    const page = usePage<PageProps>();
    const {
        captains: initialCaptains,
        filters,
        vessels,
        invitations,
        acceptedCaptainIds,
        acceptedViaInterestIds,
        interestedCaptainIds,
    } = page.props;

    const [licenseType, setLicenseType] = useState(filters.license_type ?? '');
    const [minExperience, setMinExperience] = useState(
        filters.min_experience ?? '',
    );
    const [isSearching, setIsSearching] = useState(false);

    const [inviteModalCaptain, setInviteModalCaptain] =
        useState<Captain | null>(null);
    const [cancelModalCaptain, setCancelModalCaptain] =
        useState<Captain | null>(null);
    const [revokeModalCaptain, setRevokeModalCaptain] =
        useState<Captain | null>(null);

    const cancelVesselId = cancelModalCaptain
        ? (Object.entries(invitations[cancelModalCaptain.id] ?? {}).find(
              ([, status]) => status === 'pending' || status === 'accepted',
          )?.[0] ?? '')
        : '';

    const handleSearch = () => {
        setIsSearching(true);
        router.get(
            '/captains',
            {
                ...(licenseType ? { license_type: licenseType } : {}),
                ...(minExperience ? { min_experience: minExperience } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleClearFilters = () => {
        setLicenseType('');
        setMinExperience('');
        router.get('/captains', {}, { preserveState: false });
    };

    const hasActiveFilters = licenseType !== '' || minExperience !== '';

    return (
        <>
            <Head title="Captains" />

            {inviteModalCaptain && (
                <InviteModal
                    captain={inviteModalCaptain}
                    vessels={vessels}
                    existingInvitations={
                        invitations[inviteModalCaptain.id] ?? {}
                    }
                    onClose={() => setInviteModalCaptain(null)}
                />
            )}

            {cancelModalCaptain && (
                <CancelConfirmModal
                    captain={cancelModalCaptain}
                    vesselId={cancelVesselId}
                    onClose={() => setCancelModalCaptain(null)}
                />
            )}
            {revokeModalCaptain && (
                <RevokeAcceptanceModal
                    captain={revokeModalCaptain}
                    onClose={() => setRevokeModalCaptain(null)}
                />
            )}
            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl space-y-8">
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    License Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={licenseType}
                                        onChange={(e) =>
                                            setLicenseType(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700  focus:outline-none"
                                    >
                                        {LICENSE_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                                className={"hover:bg-red-500! cursor-pointer!"}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Min Experience
                                </label>
                                <div className="relative">
                                    <select
                                        value={minExperience}
                                        onChange={(e) =>
                                            setMinExperience(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#35ADD5] focus:outline-none"
                                    >
                                        {EXPERIENCE_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="hidden lg:block" />

                            <div className="flex flex-col gap-2">
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#35ADD5] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Search className="h-4 w-4" />
                                    {isSearching ? 'Searching…' : 'Search'}
                                </button>
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        className="w-full cursor-pointer text-center text-xs font-medium text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {licenseType && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1d4ed8]">
                                        {LICENSE_LABELS[licenseType] ??
                                            licenseType}
                                        <button
                                            type="button"
                                            onClick={() => setLicenseType('')}
                                            className="cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {minExperience && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1d4ed8]">
                                        {minExperience}+ years
                                        <button
                                            type="button"
                                            onClick={() => setMinExperience('')}
                                            className="cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                            </div>
                        )}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {initialCaptains.length > 0
                                ? `${initialCaptains.length} Captain${initialCaptains.length !== 1 ? 's' : ''} Found`
                                : 'No Captains Found'}
                        </h2>
                    </section>

                    {initialCaptains.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                            <User className="mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-sm font-semibold text-gray-700">
                                No captains match your filters
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                Try adjusting the license type or experience
                                requirements.
                            </p>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="mt-5 cursor-pointer rounded-lg bg-[#35ADD5] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#35ADD5]/70"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {initialCaptains.map((captain) => (
                                <article
                                    key={captain.id}
                                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div className="flex flex-row items-start gap-4  sm:items-center">
                                            <div className="relative h-16 w-16 shrink-0">
                                                {captain.photo ? (
                                                    <img
                                                        src={captain.photo}
                                                        alt={captain.name}
                                                        className="h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <User className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                )}
                                                {captain.is_verified && (
                                                    <span className="absolute -right-1 -bottom-1 rounded-full bg-white p-0.5 shadow-sm">
                                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h3
                                                    className="cursor-pointer text-xl leading-tight font-bold text-gray-900 hover:text-[#35ADD5] hover:underline"
                                                    onClick={() =>
                                                        router.get(
                                                            `/captains/${captain.id}`,
                                                        )
                                                    }
                                                >
                                                    {captain.name} 
                                                </h3>
                                                <div className="mt-2 space-y-1">
                                                    {captain.location && (
                                                        <p className="flex items-center gap-2 text-sm text-gray-500">
                                                            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                            {captain.location}
                                                        </p>
                                                    )}
                                                    {captain.license &&
                                                        captain.license !==
                                                            '—' && (
                                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Award className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                                {LICENSE_LABELS[
                                                                    captain
                                                                        .license
                                                                ] ??
                                                                    captain.license}
                                                            </p>
                                                        )}
                                                    {captain.experience &&
                                                        captain.experience !==
                                                            '—' && (
                                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Star className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                                {
                                                                    captain.experience
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        {captain.is_verified && (
                                            <span className="inline-flex shrink-0 items-center rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold whitespace-nowrap text-[#065F46]">
                                                Verified
                                            </span>
                                        )}
                                    </div>

                                    {captain.endorsement.length > 0 && (
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            {captain.endorsement.map((e) => (
                                                <span
                                                    key={e}
                                                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                                                >
                                                    {e}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {captain.bio && (
                                        <p className="mb-6 line-clamp-3 flex-1 text-sm text-gray-500">
                                            {captain.bio}
                                        </p>
                                    )}

                                    <footer className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                                        <div>
                                            <p className="text-lg leading-none font-bold text-gray-900">
                                                {captain.rate}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {captain.availability}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <InviteButton
                                                captain={captain}
                                                invitations={invitations}
                                                acceptedCaptainIds={
                                                    acceptedCaptainIds
                                                }
                                                acceptedViaInterestIds={
                                                    acceptedViaInterestIds
                                                }
                                                interestedCaptainIds={
                                                    interestedCaptainIds
                                                }
                                                onOpenInvite={() =>
                                                    setInviteModalCaptain(
                                                        captain,
                                                    )
                                                }
                                                onOpenCancel={() =>
                                                    setCancelModalCaptain(
                                                        captain,
                                                    )
                                                }
                                                onOpenRevokeAcceptance={() =>
                                                    setRevokeModalCaptain(
                                                        captain,
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.get('/messages', {
                                                        with: captain.user_id,
                                                    })
                                                }
                                                className="cursor-pointer rounded-lg border border-gray-200 bg-white p-2.5 text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </footer>
                                </article>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
function RevokeAcceptanceModal({
    captain,
    onClose,
}: {
    captain: Captain;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleRevoke() {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        router.delete(`/captains/${captain.id}/revoke-acceptance`, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/captains', {
                    preserveScroll: true,
                    onFinish: onClose,
                });
            },
            onFinish: () => setIsLoading(false),
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            Cancel Acceptance
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Are you sure you want to cancel the acceptance for{' '}
                            <span className="font-medium text-gray-700">
                                {captain.name}
                            </span>
                            ? Both sides can send requests again after this.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        Keep It
                    </button>
                    <button
                        type="button"
                        onClick={handleRevoke}
                        disabled={isLoading}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <X className="h-4 w-4" />
                        )}
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
CaptainsPage.layout = {
    breadcrumbs: [{ title: 'Captains', href: captains() }],
    pageHeader: {
        title: 'Find Captains',
        description: 'Browse and filter qualified captains for your vessels.',
    },
};
