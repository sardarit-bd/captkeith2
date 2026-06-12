import { Head, Link, router, usePage } from '@inertiajs/react'; 
import {
    Check,
    ChevronDown,
    Loader2,
    MapPin,
    MessageSquare,
    Search,
    Send,
    Star,
    User,
    X,
    AlertTriangle,
    UtensilsCrossed,
    Wine,
} from 'lucide-react';
import { useState } from 'react';

interface Deckhand {
    id: string;
    user_id: string;
    name: string;
    location: string;
    hasServerExperience: boolean;
    hasBartendingExperience: boolean;
    experience: string;
    rate: string;
    availability: string;
    photo: string | null;
}

interface VesselOption {
    value: string;
    label: string;
}

interface Filters {
    min_experience?: string;
    has_server_experience?: string;
    has_bartending_experience?: string;
}

interface PageProps {
    deckhands: Deckhand[];
    filters: Filters;
    vessels: VesselOption[];
    invitations: Record<string, Record<string, string>>;
    acceptedDeckhandIds: string[];
    acceptedViaInterestIds: string[];
    interestedDeckhandIds: string[];
}

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'Any Experience' },
    { value: '1', label: '1+ Years' },
    { value: '2', label: '2+ Years' },
    { value: '3', label: '3+ Years' },
    { value: '5', label: '5+ Years' },
];

function InviteModal({
    deckhand,
    vessels,
    existingInvitations,
    onClose,
}: {
    deckhand: Deckhand;
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
            `/deckhands/${deckhand.id}/invite`,
            { vessel_id: selectedVessel },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/deckhands', {
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
                            Invite Deckhand
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500">
                            {deckhand.name}
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
                            This deckhand already accepted for this vessel.
                        </p>
                    )}
                    {currentStatus === 'declined' && (
                        <p className="mt-2 text-xs text-red-500">
                            This deckhand declined the invitation for this
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
    deckhand,
    vesselId,
    onClose,
}: {
    deckhand: Deckhand;
    vesselId: string;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleConfirmCancel() {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        router.delete(`/deckhands/${deckhand.id}/invite`, {
            data: vesselId ? { vessel_id: vesselId } : {},
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/deckhands', {
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
                                {deckhand.name}
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

function RevokeAcceptanceModal({
    deckhand,
    onClose,
}: {
    deckhand: Deckhand;
    onClose: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleRevoke() {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        router.delete(`/deckhands/${deckhand.id}/revoke-acceptance`, {
            preserveScroll: true,
            onSuccess: () => {
                router.visit('/deckhands', {
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
                                {deckhand.name}
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

function InviteButton({
    deckhand,
    invitations,
    acceptedDeckhandIds,
    acceptedViaInterestIds,
    interestedDeckhandIds,
    onOpenInvite,
    onOpenCancel,
    onOpenRevokeAcceptance,
}: {
    deckhand: Deckhand;
    invitations: Record<string, Record<string, string>>;
    acceptedDeckhandIds: string[];
    acceptedViaInterestIds: string[];
    interestedDeckhandIds: string[];
    onOpenInvite: () => void;
    onOpenCancel: () => void;
    onOpenRevokeAcceptance: () => void;
}) {
    const deckhandInvites = invitations[deckhand.id] ?? {};
    const statuses = Object.values(deckhandInvites);

    const isAcceptedViaInterest = acceptedViaInterestIds.includes(deckhand.id);
    const isAcceptedViaInvitation =
        statuses.includes('accepted') ||
        (acceptedDeckhandIds.includes(deckhand.id) && !isAcceptedViaInterest);
    const isAccepted = acceptedDeckhandIds.includes(deckhand.id);
    const hasPendingInterest =
        interestedDeckhandIds.includes(deckhand.id) && !isAccepted;

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
            <Link
                href="/deckhand-requests"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#35ADD5] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#35ADD5]/70"
            >
                <Check className="h-3.5 w-3.5" />
                Review Request
            </Link>
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

export default function DeckhandsPage() {
    const page = usePage<PageProps>();
    const {
        deckhands: initialDeckhands,
        filters,
        vessels,
        invitations,
        acceptedDeckhandIds,
        acceptedViaInterestIds,
        interestedDeckhandIds,
    } = page.props;

    const [minExperience, setMinExperience] = useState(
        filters.min_experience ?? '',
    );
    const [hasServerExperience, setHasServerExperience] = useState(
        filters.has_server_experience ?? '',
    );
    const [hasBartendingExperience, setHasBartendingExperience] = useState(
        filters.has_bartending_experience ?? '',
    );
    const [isSearching, setIsSearching] = useState(false);

    const [inviteModalDeckhand, setInviteModalDeckhand] =
        useState<Deckhand | null>(null);
    const [cancelModalDeckhand, setCancelModalDeckhand] =
        useState<Deckhand | null>(null);
    const [revokeModalDeckhand, setRevokeModalDeckhand] =
        useState<Deckhand | null>(null);

    const cancelVesselId = cancelModalDeckhand
        ? (Object.entries(invitations[cancelModalDeckhand.id] ?? {}).find(
              ([, status]) => status === 'pending' || status === 'accepted',
          )?.[0] ?? '')
        : '';

    const handleSearch = () => {
        setIsSearching(true);
        router.get(
            '/deckhands',
            {
                ...(minExperience ? { min_experience: minExperience } : {}),
                ...(hasServerExperience ? { has_server_experience: hasServerExperience } : {}),
                ...(hasBartendingExperience ? { has_bartending_experience: hasBartendingExperience } : {}),
            },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => setIsSearching(false),
            },
        );
    };

    const handleClearFilters = () => {
        setMinExperience('');
        setHasServerExperience('');
        setHasBartendingExperience('');
        router.get('/deckhands', {}, { preserveState: false });
    };

    const hasActiveFilters = minExperience !== '' || hasServerExperience !== '' || hasBartendingExperience !== '';

    return (
        <>
            <Head title="Deckhands" />

            {inviteModalDeckhand && (
                <InviteModal
                    deckhand={inviteModalDeckhand}
                    vessels={vessels}
                    existingInvitations={
                        invitations[inviteModalDeckhand.id] ?? {}
                    }
                    onClose={() => setInviteModalDeckhand(null)}
                />
            )}

            {cancelModalDeckhand && (
                <CancelConfirmModal
                    deckhand={cancelModalDeckhand}
                    vesselId={cancelVesselId}
                    onClose={() => setCancelModalDeckhand(null)}
                />
            )}
            {revokeModalDeckhand && (
                <RevokeAcceptanceModal
                    deckhand={revokeModalDeckhand}
                    onClose={() => setRevokeModalDeckhand(null)}
                />
            )}
            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl space-y-8">
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Server Experience
                                </label>
                                <div className="relative">
                                    <select
                                        value={hasServerExperience}
                                        onChange={(e) =>
                                            setHasServerExperience(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#35ADD5] focus:outline-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Bartending Experience
                                </label>
                                <div className="relative">
                                    <select
                                        value={hasBartendingExperience}
                                        onChange={(e) =>
                                            setHasBartendingExperience(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#35ADD5] focus:outline-none"
                                    >
                                        <option value="">Any</option>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

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
                                {hasServerExperience && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1d4ed8]">
                                        Server: {hasServerExperience === '1' ? 'Yes' : 'No'}
                                        <button
                                            type="button"
                                            onClick={() => setHasServerExperience('')}
                                            className="cursor-pointer"
                                        >
                                            ×
                                        </button>
                                    </span>
                                )}
                                {hasBartendingExperience && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-medium text-[#1d4ed8]">
                                        Bartending: {hasBartendingExperience === '1' ? 'Yes' : 'No'}
                                        <button
                                            type="button"
                                            onClick={() => setHasBartendingExperience('')}
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
                            {initialDeckhands.length > 0
                                ? `${initialDeckhands.length} Deckhand${initialDeckhands.length !== 1 ? 's' : ''} Found`
                                : 'No Deckhands Found'}
                        </h2>
                    </section>

                    {initialDeckhands.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                            <User className="mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-sm font-semibold text-gray-700">
                                No deckhands match your filters
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                                Try adjusting the experience or skill requirements.
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
                            {initialDeckhands.map((deckhand) => (
                                <article
                                    key={deckhand.id}
                                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div className="flex flex-row items-start gap-4 sm:items-center">
                                            <div className="relative h-16 w-16 shrink-0">
                                                {deckhand.photo ? (
                                                    <img
                                                        src={deckhand.photo}
                                                        alt={deckhand.name}
                                                        className="h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                        <User className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl leading-tight font-bold text-gray-900">
                                                    {deckhand.name}
                                                </h3>
                                                <div className="mt-2 space-y-1">
                                                    {deckhand.location && (
                                                        <p className="flex items-center gap-2 text-sm text-gray-500">
                                                            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                            {deckhand.location}
                                                        </p>
                                                    )}
                                                    {deckhand.experience &&
                                                        deckhand.experience !==
                                                            '—' && (
                                                            <p className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Star className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                                                                {
                                                                    deckhand.experience
                                                                }
                                                            </p>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {deckhand.hasServerExperience && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                                                <UtensilsCrossed className="h-3 w-3" />
                                                Server Experience
                                            </span>
                                        )}
                                        {deckhand.hasBartendingExperience && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                                                <Wine className="h-3 w-3" />
                                                Bartending Experience
                                            </span>
                                        )}
                                    </div>

                                    <footer className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
                                        <div>
                                            <p className="text-lg leading-none font-bold text-gray-900">
                                                {deckhand.rate}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                {deckhand.availability}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <InviteButton
                                                deckhand={deckhand}
                                                invitations={invitations}
                                                acceptedDeckhandIds={
                                                    acceptedDeckhandIds
                                                }
                                                acceptedViaInterestIds={
                                                    acceptedViaInterestIds
                                                }
                                                interestedDeckhandIds={
                                                    interestedDeckhandIds
                                                }
                                                onOpenInvite={() =>
                                                    setInviteModalDeckhand(
                                                        deckhand,
                                                    )
                                                }
                                                onOpenCancel={() =>
                                                    setCancelModalDeckhand(
                                                        deckhand,
                                                    )
                                                }
                                                onOpenRevokeAcceptance={() =>
                                                    setRevokeModalDeckhand(
                                                        deckhand,
                                                    )
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    router.get('/messages', {
                                                        with: deckhand.user_id,
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

DeckhandsPage.layout = {
    breadcrumbs: [{ title: 'Deckhands', href: '/deckhands' }],
    pageHeader: {
        title: 'Find Deckhands',
        description: 'Browse and filter qualified deckhands for your vessels.',
    },
};