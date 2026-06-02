import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {
    Anchor,
    Briefcase,
    CheckCircle2,
    Clock,
    MapPin,
    RefreshCw,
    Send,
    ShieldCheck,
    User,
    Waves,
    X,
} from 'lucide-react';
import { useState } from 'react';
import type { Captain } from '@/pages/charterer/captain-select';
import { send as sendCaptainRequests } from '@/routes/charterer/captain-requests';

function RequestButton({
    captain,
    onAction,
}: {
    captain: Captain;
    onAction: () => void;
}) {
    const [loading, setLoading] = useState(false);

    function handleSend() {
        setLoading(true);
        router.post(
            sendCaptainRequests().url,
            { captain_ids: [captain.id] },
            { onFinish: () => setLoading(false), onSuccess: onAction },
        );
    }

    function handleCancel() {
        if (!captain.responseId) return;
        setLoading(true);
        router.post(
            `/charterer/captain-requests/${captain.responseId}/cancel`,
            {},
            { onFinish: () => setLoading(false), onSuccess: onAction },
        );
    }

    if (captain.requestStatus === 'available') {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-medium text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Accepted
            </span>
        );
    }

    if (captain.requestStatus === 'pending') {
        return (
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-[12px] font-medium text-amber-700">
                    <Clock className="h-3.5 w-3.5" />
                    Request Sent
                </span>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCancel();
                    }}
                    disabled={loading}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                    <X className="h-3 w-3" />
                    {loading ? 'Cancelling…' : 'Cancel Request'}
                </button>
            </div>
        );
    }

    if (captain.requestStatus === 'unavailable') {
        return (
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    handleSend();
                }}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#35ADD5] bg-white px-3 py-1 text-[12px] font-medium text-[#35ADD5] transition hover:bg-[#35ADD5] hover:text-white disabled:opacity-50"
            >
                <RefreshCw className="h-3 w-3" />
                {loading ? 'Sending…' : 'Send Request Again'}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={(e) => {
                e.stopPropagation();
                handleSend();
            }}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#35ADD5] px-3 py-1 text-[12px] font-medium text-white transition hover:bg-[#35ADD5]/70 disabled:opacity-50"
        >
            <Send className="h-3 w-3" />
            {loading ? 'Sending…' : 'Send Request'}
        </button>
    );
}

export function ChartererCaptainSelectCard({
    captain,
    onAction,
}: {
    captain: Captain;
    onAction: () => void;
}) {
    const isAccepted = captain.requestStatus === 'available';

    return (
        <div
            className={`w-full overflow-hidden rounded-2xl border bg-white text-left transition-all ${
                isAccepted
                    ? 'border-emerald-300 ring-1 ring-emerald-300'
                    : captain.requestStatus === 'pending'
                      ? 'border-amber-200'
                      : 'border-[#e5e7eb]'
            }`}
        >
            {captain.requestStatus && (
                <div
                    className={`flex items-center gap-1.5 px-3 py-1 ${
                        isAccepted
                            ? 'bg-emerald-600'
                            : captain.requestStatus === 'pending'
                              ? 'bg-amber-500'
                              : 'bg-gray-400'
                    }`}
                >
                    {isAccepted && (
                        <CheckCircle2 className="h-3 w-3 text-white" />
                    )}
                    {captain.requestStatus === 'pending' && (
                        <Clock className="h-3 w-3 text-white" />
                    )}
                    <span className="text-[11px] font-medium text-white">
                        {isAccepted
                            ? 'Accepted'
                            : captain.requestStatus === 'pending'
                              ? 'Request Sent — Awaiting Response'
                              : 'Declined / Expired'}
                    </span>
                </div>
            )}

            <div className="flex items-start gap-4 p-5">
                <div className="relative shrink-0">
                    {captain.photo ? (
                        <img
                            src={captain.photo}
                            alt={captain.name}
                            className="h-16 w-16 rounded-full border border-[#e5e7eb] object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#e5e7eb] bg-gray-100">
                            <User className="h-7 w-7 text-gray-400" />
                        </div>
                    )}
                    {captain.isVerified && (
                        <span className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-100">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        </span>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <Link
                                href={`/captains/${captain.id}`}
                                className="text-[15px] leading-tight font-semibold text-[#111827] hover:text-[#35ADD5] hover:underline"
                            >
                                {captain.name}
                            </Link>
                            {captain.license && captain.license !== '—' && (
                                <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                    {captain.license}
                                    {captain.tonnage &&
                                        captain.tonnage !== '—' && (
                                            <span className="ml-1.5 text-[#9ca3af]">
                                                · {captain.tonnage}
                                            </span>
                                        )}
                                </p>
                            )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            {captain.isVerified && (
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                                    Verified
                                </span>
                            )}
                            {captain.rate && captain.rate !== '—' && (
                                <span className="text-[15px] font-semibold text-[#111827]">
                                    {captain.rate}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-3">
                        {captain.location && captain.location !== '—' && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                {captain.location}
                            </span>
                        )}
                        {captain.experience && captain.experience !== '—' && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <Briefcase className="h-3.5 w-3.5 shrink-0" />
                                {captain.experience}
                            </span>
                        )}
                        {captain.geographicArea && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <Anchor className="h-3.5 w-3.5 shrink-0" />
                                {captain.geographicArea}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {(captain.bio ||
                captain.endorsements.length > 0 ||
                captain.bodiesOfWater) && (
                <div className="space-y-2.5 border-t border-[#f1f5f9] px-5 py-3.5">
                    {captain.bio && (
                        <p className="line-clamp-2 text-[12px] leading-relaxed text-[#6b7280]">
                            {captain.bio}
                        </p>
                    )}
                    {captain.bodiesOfWater && (
                        <p className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                            <Waves className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                            {captain.bodiesOfWater}
                        </p>
                    )}
                    {captain.endorsements.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {captain.endorsements.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-0.5 text-[11px] text-[#4b5563]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center justify-between gap-3 border-t border-[#f1f5f9] bg-[#f9fafb] px-5 py-3">
                <div>
                    {captain.canProvideDeckhand && (
                        <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Can provide deckhand
                        </span>
                    )}
                </div>
                <RequestButton captain={captain} onAction={onAction} />
            </div>
        </div>
    );
}
