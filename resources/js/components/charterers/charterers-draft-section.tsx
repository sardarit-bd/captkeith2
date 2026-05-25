import { router, Link } from '@inertiajs/react';
import {
    AlertTriangle,
    CalendarDays,
    Check,
    Clock,
    Copy,
    LinkIcon,
    Ship,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

import type { DraftCharter } from './charterers-data';

import { show as showVessel } from '@/routes/vessels';
interface Props {
    drafts: DraftCharter[];
}

export function DraftChartersSection({ drafts }: Props) {
    console.log('Draft charters:', drafts);

    return (
        <section>
            <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl leading-tight font-bold text-[#111827]">
                        Draft Charters
                    </h3>
                    <p className="mt-1 text-sm text-[#6b7280]">
                        Share the invite link with your client to begin the
                        booking
                    </p>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                    {drafts.length}
                </span>
            </header>

            <div className="space-y-4">
                {drafts.map((draft) => (
                    <DraftCharterCard key={draft.id} draft={draft} />
                ))}
            </div>
        </section>
    );
}

function DraftCharterCard({ draft }: { draft: DraftCharter }) {
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    function copyLink() {
        if (!draft.inviteLink) return;

        navigator.clipboard.writeText(draft.inviteLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    function handleConfirmDelete() {
        setDeleting(true);
        router.delete(`/charterers/${draft.id}`, {
            onFinish: () => {
                setDeleting(false);
                setShowModal(false);
            },
        });
    }

    return (
        <>
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => !deleting && setShowModal(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-[#111827]">
                                    Delete Draft Charter
                                </h3>
                                <p className="mt-1 text-sm text-[#6b7280]">
                                    Are you sure you want to delete the draft
                                    for{' '}
                                    <span className="font-semibold text-[#111827]">
                                        {draft.yachtName}
                                    </span>
                                    ? This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                disabled={deleting}
                                className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
                            >
                                Keep It
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deleting}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                                {deleting ? 'Deleting…' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm">
                <div className="flex gap-4 p-5">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        {draft.yachtImage ? (
                            <img
                                src={draft.yachtImage}
                                alt={draft.yachtName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <Ship className="h-6 w-6 text-gray-300" />
                            </div>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <Link
                                    className="hover:text-underline! text-xl leading-tight font-bold text-[#111827] transition-colors hover:underline"
                                    href={
                                        showVessel({ vessel: draft?.vesselId })
                                            .url
                                    }
                                >
                                    {draft.yachtName}
                                </Link>
                                <p className="text-xs text-[#6b7280]">
                                    {draft.yachtType}
                                    {draft.yachtLength !== '—'
                                        ? ` · ${draft.yachtLength}`
                                        : ''}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                                    Draft
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    title="Delete draft"
                                    className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-100"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6b7280]">
                            <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                {draft.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {draft.startTime} · {draft.duration}
                            </span>
                        </div>

                        {draft.specialNotes && (
                            <p className="mt-1 line-clamp-1 text-xs text-[#9ca3af]">
                                {draft.specialNotes}
                            </p>
                        )}
                    </div>
                </div>

                <div className="border-t border-amber-50 bg-[#FAFAFA] px-5 py-3">
                    {draft.inviteLink ? (
                        <div className="flex items-center gap-3">
                            <LinkIcon className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                            <p className="flex-1 truncate font-mono text-xs text-[#6b7280]">
                                {draft.inviteLink}
                            </p>
                            {draft.inviteExpires && (
                                <span className="shrink-0 text-[11px] text-[#9ca3af]">
                                    Expires {draft.inviteExpires}
                                </span>
                            )}
                            <button
                                type="button"
                                onClick={copyLink}
                                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-[#0A273F] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#123651]"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <p className="text-xs text-[#9ca3af]">
                            No invite link generated.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
