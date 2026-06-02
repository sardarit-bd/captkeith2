import { Link, router } from '@inertiajs/react';
import { CheckCircle2, Users } from 'lucide-react';
import { ChartererCaptainSelectCard } from './charterer-captain-select-card';
import type { Captain } from '@/pages/charterer/captain-select';
import { request as requestRoute, information } from '@/routes/charterer';

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
    const canProceed = acceptedCount >= 2;

    function refreshPage() {
        router.reload({ only: ['captains', 'acceptedCount', 'slotsNeeded'] });
    }

    if (captains.length === 0) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] px-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <Users className="h-8 w-8 text-gray-400" />
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

    return (
        <div className="flex h-full flex-1 flex-col bg-[#F6FDFF]">
            <div className="border-b border-[#e5e7eb] bg-white px-4 py-3 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-4xl items-center gap-3">
                    <Users className="h-4 w-4 shrink-0 text-[#35ADD5]" />
                    {canProceed ? (
                        <p className="text-[13px] font-semibold text-emerald-700">
                            ✓ 2 captains have accepted — you can proceed!
                        </p>
                    ) : (
                        <p className="text-[13px] text-[#374151]">
                            <span className="font-semibold">
                                {acceptedCount}/2
                            </span>{' '}
                            captains accepted. Send requests to at least{' '}
                            <span className="font-semibold">{slotsNeeded}</span>{' '}
                            more captain{slotsNeeded !== 1 ? 's' : ''} to
                            continue.
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {captains.map((captain) => (
                            <ChartererCaptainSelectCard
                                key={captain.id}
                                captain={captain}
                                onAction={refreshPage}
                            />
                        ))}
                    </div>
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

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
                            <CheckCircle2
                                className={`h-4 w-4 ${canProceed ? 'text-emerald-500' : 'text-gray-300'}`}
                            />
                            <span>
                                <span
                                    className={`font-semibold ${canProceed ? 'text-emerald-700' : 'text-[#111827]'}`}
                                >
                                    {acceptedCount}/2
                                </span>{' '}
                                accepted
                            </span>
                            {!canProceed && (
                                <span className="text-[12px] text-[#9ca3af]">
                                    · Need {slotsNeeded} more
                                </span>
                            )}
                        </div>

                        {canProceed ? (
                            <Link
                                href={information()}
                                className="rounded-lg bg-[#35ADD5] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70"
                            >
                                Continue
                            </Link>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className="cursor-not-allowed rounded-lg bg-[#35ADD5] px-5 py-2 text-sm font-medium text-white opacity-40"
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
