import { router } from '@inertiajs/react';
import {
    Check,
    Loader2,
    MapPin,
    MessageSquare,
    Ship,
    UserRoundCheck,
    X,
} from 'lucide-react';
import { useState } from 'react';

import type { CaptainInterestRecord } from './captain-requests-data';

const statusStyles: Record<CaptainInterestRecord['status'], string> = {
    pending: 'bg-[#fef9c3] text-[#854d0e]',
    accepted: 'bg-[#dcfce7] text-[#166534]',
    declined: 'bg-[#fee2e2] text-[#991b1b]',
};

const statusLabels: Record<CaptainInterestRecord['status'], string> = {
    pending: 'Pending',
    accepted: 'Accepted',
    declined: 'Declined',
};

export function CaptainRequestCard({
    interest,
}: {
    interest: CaptainInterestRecord;
}) {
    const [isLoading, setIsLoading] = useState<'accept' | 'decline' | null>(
        null,
    );

    function handleRespond(status: 'accepted' | 'declined') {
        if (isLoading) {
            return;
        }

        setIsLoading(status === 'accepted' ? 'accept' : 'decline');

        router.patch(
            `/captain-requests/${interest.id}/respond`,
            { status },
            {
                preserveScroll: true,
                onFinish: () => setIsLoading(null),
            },
        );
    }

    const isPending = interest.status === 'pending';

    return (
        <article className="rounded-2xl border border-[#d4dbe3] bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                    {interest.captainPhoto ? (
                        <img
                            src={interest.captainPhoto}
                            alt={interest.captainName}
                            className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-[#e5e7eb]"
                        />
                    ) : (
                        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF]">
                            <UserRoundCheck className="h-7 w-7 text-[#2563eb]" />
                        </span>
                    )}

                    <div>
                        <h3 className="text-[15px] font-bold text-[#111827]">
                            {interest.captainName}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#6b7280]">
                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                            {interest.location}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] font-medium tracking-wide text-[#4b5563]">
                        {interest.requestedAt}
                    </span>
                    <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${statusStyles[interest.status]}`}
                    >
                        {statusLabels[interest.status]}
                    </span>
                </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {[
                    interest.licenseType,
                    interest.endorsement,
                    interest.yearsExperience,
                    interest.hourlyRate,
                ].map((tag) =>
                    tag && tag !== '—' ? (
                        <span
                            key={tag}
                            className="rounded-md border border-[#f3f4f6] bg-[#f9fafb] px-2.5 py-1.5 text-[11px] font-medium text-[#374151]"
                        >
                            {tag}
                        </span>
                    ) : null,
                )}
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-[#eef2f6] bg-[#f8fafc] p-4">
                {interest.vesselImage ? (
                    <img
                        src={interest.vesselImage}
                        alt={interest.vesselName}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                ) : (
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#e5e7eb]">
                        <Ship className="h-7 w-7 text-[#9ca3af]" />
                    </span>
                )}

                <div>
                    <p className="text-[13px] font-semibold text-[#111827]">
                        {interest.vesselName}
                    </p>
                    <p className="text-[12px] text-[#6b7280]">
                        {interest.vesselSpec}
                    </p>
                    <p className="text-[12px] text-[#9ca3af]">
                        {interest.marina}
                    </p>
                </div>
            </div>

            <footer className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    disabled={!isPending || isLoading !== null}
                    onClick={() => handleRespond('accepted')}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0D314D] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0a273f] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {isLoading === 'accept' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Check className="h-4 w-4" />
                    )}
                    Accept
                </button>

                <button
                    type="button"
                    disabled={!isPending || isLoading !== null}
                    onClick={() => handleRespond('declined')}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {isLoading === 'decline' ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <X className="h-4 w-4" />
                    )}
                    Decline
                </button>

                <button
                    type="button"
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <MessageSquare className="h-4 w-4" />
                    Message
                </button>
            </footer>
        </article>
    );
}
