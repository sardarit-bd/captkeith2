import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Users, User } from 'lucide-react';
import { useState } from 'react';
import { ChartererCaptainSelectCard } from './charterer-captain-select-card';
import type { Captain } from '@/pages/charterer/captain-select';
import { request as requestRoute } from '@/routes/charterer';
import { send as sendCaptainRequests } from '@/routes/charterer/captain-requests';

interface Props {
    captains: Captain[];
    acceptedCount: number;
    slotsNeeded: number;
}

export function ChartererCaptainSelectPageContent({
    captains,
    acceptedCount,
    slotsNeeded,
}: Props) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxSelectable = slotsNeeded; // can only send as many requests as slots remaining

    function toggleCaptain(id: string) {
        setSelectedIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter((x) => x !== id);
            }

            if (prev.length >= maxSelectable) {
                return [...prev.slice(0, maxSelectable - 1), id];
            }

            return [...prev, id];
        });
    }

    function handleSubmit() {
        if (selectedIds.length < 1 || isSubmitting) return;

        setIsSubmitting(true);

        router.post(sendCaptainRequests().url, { captain_ids: selectedIds });
    }

    if (captains.length === 0) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] px-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                        No qualified captains available
                    </p>
                    <p className="text-xs text-gray-400">
                        Please contact the vessel owner for assistance.
                    </p>
                    <Link
                        href={requestRoute()}
                        className="mt-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                        Back to Request
                    </Link>
                </div>
            </div>
        );
    }

    const canSendRequests = selectedIds.length >= 1 && !isSubmitting;

    return (
        <div className="flex h-full flex-1 flex-col bg-[#F6FDFF]">
            {/* Info banner */}
            <div className="border-b border-[#e5e7eb] bg-white px-4 py-3 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-4xl items-center gap-3">
                    <Users className="h-4 w-4 shrink-0 text-[#0A273F]" />
                    <p className="text-[13px] text-[#374151]">
                        {acceptedCount >= 2 ? (
                            <span className="font-semibold text-emerald-700">
                                2 captains have accepted — you can proceed!
                            </span>
                        ) : (
                            <>
                                <span className="font-semibold">
                                    {acceptedCount}/2
                                </span>{' '}
                                captains accepted. You need{' '}
                                <span className="font-semibold">
                                    {slotsNeeded}
                                </span>{' '}
                                more acceptance{slotsNeeded !== 1 ? 's' : ''}.
                                Select up to{' '}
                                <span className="font-semibold">
                                    {maxSelectable}
                                </span>{' '}
                                captain{maxSelectable !== 1 ? 's' : ''} to send
                                requests.
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                        {captains.map((captain) => (
                            <ChartererCaptainSelectCard
                                key={captain.id}
                                captain={captain}
                                selected={selectedIds.includes(captain.id)}
                                onSelect={() => toggleCaptain(captain.id)}
                            />
                        ))}
                    </section>
                </div>
            </div>

            <div className="border-t border-[#e5e7eb] bg-white px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
                    <Link
                        href={requestRoute()}
                        className="rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-sm font-medium text-[#1f2937] shadow-sm transition-colors hover:bg-[#f9fafb]"
                    >
                        Back
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-[12px] text-[#6b7280]">
                            {selectedIds.length} of {maxSelectable} selected
                        </span>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!canSendRequests}
                            className="rounded-lg bg-[#0A273F] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? 'Sending…' : 'Send Requests'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
