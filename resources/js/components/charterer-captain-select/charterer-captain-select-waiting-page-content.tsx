import { router } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Link as LinkIcon,
    User,
    XCircle,
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { captainSelect, information } from '@/routes/charterer';

interface CaptainStatus {
    responseId: string;
    captainId: string | null;
    name: string;
    photo: string | null;
    status: 'pending' | 'available' | 'unavailable';
    expiresAt: string | null;
    respondedAt: string | null;
}

interface Props {
    captainStatuses: CaptainStatus[];
    acceptedCount: number;
    canProceed: boolean;
    slotsNeeded: number;
}

function StatusBadge({ status }: { status: CaptainStatus['status'] }) {
    if (status === 'available') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                <CheckCircle2 className="h-3 w-3" /> Accepted
            </span>
        );
    }
    if (status === 'unavailable') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-medium text-red-700">
                <XCircle className="h-3 w-3" /> Declined / Expired
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-medium text-amber-700">
            <Clock className="h-3 w-3" /> Pending (24 hr)
        </span>
    );
}

export function ChartererCaptainSelectWaitingPageContent({
    captainStatuses,
    acceptedCount,
    canProceed,
    slotsNeeded,
}: Props) {
    return (
        <div className="flex h-full flex-1 flex-col bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl space-y-5">
                    {/* Progress banner */}
                    <div
                        className={`rounded-2xl border px-5 py-4 ${canProceed ? 'border-emerald-200 bg-emerald-50' : 'border-[#e5e7eb] bg-white'}`}
                    >
                        <p
                            className={`text-[14px] font-semibold ${canProceed ? 'text-emerald-800' : 'text-[#111827]'}`}
                        >
                            {canProceed
                                ? '✓ 2 captains have accepted — you can proceed!'
                                : `Waiting for captains to respond — ${acceptedCount}/2 accepted`}
                        </p>
                        {!canProceed && (
                            <p className="mt-1 text-[12px] text-[#6b7280]">
                                You need {slotsNeeded} more captain acceptance
                                {slotsNeeded !== 1 ? 's' : ''} before you can
                                continue. Captains have 24 hours to respond.
                            </p>
                        )}
                    </div>

                    {/* Captain request cards */}
                    <div className="space-y-3">
                        {captainStatuses.map((c) => (
                            <div
                                key={c.responseId}
                                className="flex items-center gap-4 rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4"
                            >
                                <div className="shrink-0">
                                    {c.photo ? (
                                        <img
                                            src={c.photo}
                                            alt={c.name}
                                            className="h-12 w-12 rounded-full border border-[#e5e7eb] object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e5e7eb] bg-gray-100">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        {c.captainId ? (
                                            <Link
                                                href={`/captains/${c.captainId}`}
                                                className="text-[14px] font-semibold text-[#111827] hover:text-[#0A273F] hover:underline"
                                            >
                                                {c.name}
                                            </Link>
                                        ) : (
                                            <p className="text-[14px] font-semibold text-[#111827]">
                                                {c.name}
                                            </p>
                                        )}
                                        <StatusBadge status={c.status} />
                                    </div>
                                    {c.status === 'pending' && c.expiresAt && (
                                        <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                                            Expires{' '}
                                            {new Date(
                                                c.expiresAt,
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                    {c.respondedAt && (
                                        <p className="mt-0.5 text-[11px] text-[#9ca3af]">
                                            Responded {c.respondedAt}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Send more requests nudge */}
                    {!canProceed && slotsNeeded > 0 && (
                        <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-white px-5 py-4 text-center">
                            <p className="text-[13px] text-[#6b7280]">
                                Need more responses?{' '}
                                <Link
                                    href={captainSelect()}
                                    className="font-semibold text-[#0A273F] hover:underline"
                                >
                                    Send requests to more captains
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#e5e7eb] bg-white px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
                    <Link
                        href={captainSelect()}
                        className="rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-sm font-medium text-[#1f2937] shadow-sm transition-colors hover:bg-[#f9fafb]"
                    >
                        Back to Captains
                    </Link>
                    {canProceed ? (
                        <Link
                            href={information()}
                            className="rounded-lg bg-[#0A273F] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                        >
                            Continue
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-lg bg-[#0A273F] px-5 py-2 text-sm font-medium text-white opacity-40"
                        >
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
