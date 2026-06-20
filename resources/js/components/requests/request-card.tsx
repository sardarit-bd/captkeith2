import { useState } from 'react';
import { User, Calendar, Clock, MessageSquare, Check, X, FileSignature, Download } from 'lucide-react';
import { router } from '@inertiajs/react';
import type { CaptainRequestRecord } from './requests-data';

const statusStyles: Record<CaptainRequestRecord['status'], string> = {
    pending: 'bg-[#111827] text-white',
    available: 'bg-[#14532d] text-white',
    unavailable: 'bg-[#7f1d1d] text-white',
    accepted: 'bg-[#14532d] text-white',
    declined: 'bg-red-100 text-white',
};

const statusLabels: Record<CaptainRequestRecord['status'], string> = {
    pending: 'Pending',
    available: 'Accepted',
    unavailable: 'Declined',
    accepted: 'Accepted',
    declined: 'Declined',
};

interface RequestCardProps {
    request: CaptainRequestRecord;
    onSelectDeckhand?: (requestId: string, charterEventId: string) => void;
    onSignDeckhandAgreement?: (crewResponseId: string) => void;
}

export function RequestCard({ request, onSelectDeckhand, onSignDeckhandAgreement }: RequestCardProps) {
    const isPending = request.status === 'pending';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const crewRole = request.crewRole;

    // ── Deckhand state flags ──────────────────────────────────────────────────
    const hasSelectedDeckhand   = !!request.deckhandInfo?.selectedDeckhand;
    const deckhandIsPending     = hasSelectedDeckhand &&
                                  request.deckhandInfo?.selectedDeckhand?.responseStatus !== 'available';
    const deckhandAccepted      = hasSelectedDeckhand &&
                                  request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available';
    const selectedByMe          = request.deckhandInfo?.selectedDeckhand?.selectedByMe === true;
    const deckhandHireFullySigned = request.deckhandInfo?.deckhandHireFullySigned === true;

    // Agreement for THIS captain (only present when selectedByMe)
    const deckhandAgreement = request.agreements?.find(a => a.type === 'deckhand_hire');
    console.log('deckhandAgreement', deckhandAgreement);
    // ── State classification (captain only) ──────────────────────────────────
    // State 1: isPending && !hasSelectedDeckhand
    // State 2: isPending && hasSelectedDeckhand && deckhandIsPending
    // State 3: deckhandAccepted && !deckhandHireFullySigned
    // State 4: deckhandHireFullySigned

    const acceptDisabled =
        !isPending ||
        isSubmitting ||
        (crewRole === 'captain' && 
         !deckhandHireFullySigned && 
         !(request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available' && 
           request.deckhandInfo?.selectedDeckhand?.selectedByMe === false));

    const acceptTooltip = crewRole === 'captain'
        ? !hasSelectedDeckhand
            ? 'Please select a deckhand first'
            : deckhandIsPending
                ? 'Waiting for deckhand to accept'
                : !deckhandHireFullySigned && 
                  !(request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available' && 
                    request.deckhandInfo?.selectedDeckhand?.selectedByMe === false)
                    ? 'Please sign the deckhand agreement to enable acceptance'
                    : ''
        : '';

    // ── Handlers ─────────────────────────────────────────────────────────────
    function handleAccept() {
        if (acceptDisabled) return;
        setIsSubmitting(true);
        router.patch(`/requests/${request.id}/respond`, { response: 'available' }, {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
        });
    }

    function handleDecline() {
        setIsSubmitting(true);
        router.patch(`/requests/${request.id}/respond`, { response: 'unavailable' }, {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
        });
    }

    function handleMessage() {
        if (request.captainInfo?.userId) {
            router.visit(`/messages?with=${request.captainInfo.userId}`);
        }
    }
const [isSignModalOpen, setIsSignModalOpen] = useState(false);
    const fallbackImage = '/images/home/about3.jpg';
    console.log(request);
    return (
        <article className="rounded-xl border border-[#eef2f6] bg-white p-6 shadow-sm">
            {isSignModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-lg bg-white p-6 shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sign Deckhand Agreement</h3>
            <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to sign the Deckhand Hire Agreement? This will generate the PDF and finalize the process.
            </p>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => setIsSignModalOpen(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={() => {
                        // This runs ONLY when they click "Sign" inside the modal
                        router.post(`/requests/${request.id}/sign-deckhand-agreement`, {}, {
                            preserveScroll: true,
                            onSuccess: (page) => {
                                // 1. Get the URL from the backend flash data
                                const downloadUrl = page.props.flash?.downloadUrl;
                                
                                // 2. Trigger the browser download
                                if (downloadUrl) {
                                    const link = document.createElement('a');
                                    link.href = downloadUrl;
                                    link.setAttribute('download', 'deckhand-agreement.pdf');
                                    document.body.appendChild(link);
                                    link.click();
                                    link.remove();
                                }
                                
                                // 3. Close the modal
                                setIsSignModalOpen(false);
                            }
                        });
                    }}
                    className="rounded-md bg-[#35ADD5] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a8fb0]"
                >
                    Sign & Download
                </button>
            </div>
        </div>
    </div>
)}
            {/* ── Header ─────────────────────────────────────────────────────── */}
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={request.image ?? fallbackImage}
                        alt={request.yachtName}
                        className="h-16 w-16 shrink-0 rounded-lg border border-[#f3f4f6] object-cover"
                    />
                    <div>
                        <a
                            href={request.vesselId ? `/vessels/${request.vesselId}` : '#'}
                            className={`text-[15px] font-bold text-[#111827] ${request.vesselId ? 'cursor-pointer hover:text-[#35ADD5] hover:underline' : ''}`}
                            onClick={(e) => {
                                if (request.vesselId) {
                                    e.preventDefault();
                                    router.visit(`/vessels/${request.vesselId}`);
                                }
                            }}
                        >
                            {request.yachtName}
                        </a>
                        <p className="text-[13px] text-[#6b7280]">{request.yachtSpec}</p>
                        <p className="text-[13px] text-[#6b7280]">{request.marina}</p>
                    </div>
                </div>
                <span className={`inline-flex self-start rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${statusStyles[request.status]}`}>
                    {statusLabels[request.status]}
                </span>
            </header>

            {/* ── Captain Info ───────────────────────────────────────────────── */}
            {request.captainInfo && (
                <div className="mb-6 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {request.captainInfo.photo ? (
                                <img
                                    src={request.captainInfo.photo}
                                    alt={request.captainInfo.name}
                                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#e5e7eb]"
                                />
                            ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#35ADD5]">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <a
                                    href={`/captains/${request.captainInfo.id}`}
                                    className="text-[15px] font-semibold text-[#111827] hover:text-[#35ADD5] hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.visit(`/captains/${request?.captainInfo?.id}`);
                                    }}
                                >
                                    {request.captainInfo.name}
                                </a>
                                <p className="text-[12px] text-[#6b7280]">{request.captainInfo.role}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleMessage}
                            className="inline-flex items-center justify-center rounded-full bg-[#35ADD5] p-2.5 text-white transition-colors hover:bg-[#2a8fb0]"
                            title="Message Captain"
                        >
                            <MessageSquare className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Trip Details ───────────────────────────────────────────────── */}
            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                    <div className="mb-1 flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <p className="text-[12px] font-medium text-[#6b7280]">Date</p>
                    </div>
                    <p className="text-[15px] font-bold text-[#111827]">{request.date}</p>
                </div>
                <div>
                    <div className="mb-1 flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#9ca3af]" />
                        <p className="text-[12px] font-medium text-[#6b7280]">Time</p>
                    </div>
                    <p className="text-[15px] font-bold text-[#111827]">{request.time}</p>
                </div>
                <div>
                    <p className="mb-1 text-[12px] font-medium text-[#6b7280]">Duration</p>
                    <p className="text-[15px] font-bold text-[#111827]">{request.duration}</p>
                </div>
            </div>

            {/* ── Special Notes ──────────────────────────────────────────────── */}
            <section className="mb-6">
                <p className="mb-1 text-[12px] font-medium text-[#6b7280]">Special Notes</p>
                <p className="text-[14px] text-[#1f2937]">{request.specialNotes || '—'}</p>
            </section>

            {/* ── Deckhand Status Section ────────────────────────────────────── */}
            {request.deckhandInfo?.mustSelectDeckhand && (
                <section className="mb-6 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[14px] font-semibold text-[#111827]">Deckhand Status</p>
                            {request.deckhandInfo.selectedDeckhand ? (
                                <p className="text-[13px] text-[#6b7280]">
                                    {request.deckhandInfo.selectedDeckhand.name} -
                                    <span className={`ml-2 font-medium ${
                                        request.deckhandInfo.selectedDeckhand.responseStatus === 'available'
                                            ? 'text-green-600'
                                            : 'text-gray-600'
                                    }`}>
                                        {request.deckhandInfo.selectedDeckhand.responseStatus === 'available'
                                            ? 'Accepted'
                                            : 'Pending'}
                                    </span>
                                </p>
                            ) : (
                                <p className="text-[13px] text-[#6b7280]">No deckhand selected</p>
                            )}
                        </div>
                        {deckhandAccepted && !deckhandHireFullySigned && (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-medium text-yellow-800">
                                Agreement Required
                            </span>
                        )}
                        {deckhandHireFullySigned && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-800">
                                Agreement Signed
                            </span>
                        )}
                    </div>
                </section>
            )}

            {/* ── Footer ─────────────────────────────────────────────────────── */}
            <footer className="flex flex-col gap-3">

                {/*
                  State 2 guidance message:
                  Captain has sent deckhand invite but deckhand hasn't accepted yet.
                */}
                {isPending && crewRole === 'captain' && deckhandIsPending && (
                    <p className="rounded-md border border-yellow-200 bg-yellow-50 px-4 py-2 text-[13px] text-yellow-700">
                        Your deckhand invitation is pending. You can accept this charter once the deckhand confirms.
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-4">

                    {/*
                      Select Deckhand Button — captain only, States 1 & 2.
                      State 1 (!hasSelectedDeckhand)  → enabled
                      State 2 (deckhandIsPending)      → disabled
                      Hidden once deckhand has accepted (States 3 & 4).
                    */}
                    {isPending && crewRole === 'captain' && !deckhandAccepted && (
                        <button
                            type="button"
                            disabled={hasSelectedDeckhand}
                            onClick={() => {
                                if (!hasSelectedDeckhand) {
                                    onSelectDeckhand?.(request.id, request.charterEventId as string);
                                }
                            }}
                            title={deckhandIsPending ? 'Deckhand invitation already sent' : 'Select a deckhand for this charter'}
                            className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors ${
                                hasSelectedDeckhand
                                    ? 'cursor-not-allowed bg-gray-400 opacity-60'
                                    : 'cursor-pointer bg-[#35ADD5] hover:bg-[#2a8fb0]'
                            }`}
                        >
                            <User className="h-4 w-4" />
                            Select Deckhand
                        </button>
                    )}

                    {/*
                      Sign Agreement Button — State 3, only for THIS captain (selectedByMe).
                      Shows when: deckhand accepted + agreement not yet fully signed + I selected them
                                  + I have NOT already signed it.
                    */}
                    {crewRole === 'captain' &&
                     deckhandAccepted &&
                     selectedByMe &&
                      (
                        <>
                            {deckhandAgreement?.downloadUrl ? (
                                <a
                                    href={deckhandAgreement.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" cursor-pointer hidden items-center justify-center gap-2 rounded-md bg-[#14532d] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Agreement
                                </a>
                            ) : (
                                <button
                                type="button"
                                onClick={() => setIsSignModalOpen(true)} // <-- Opens local modal
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0]"
                            >
                                <FileSignature className="h-4 w-4" />
                                Sign Agreement
                            </button>
                            )}
                        </>
                    )}

                    {/*
                      Download Agreement Button — State 4, only for THIS captain.
                      Shows when: agreement is fully signed.
                    */}
                    {crewRole === 'captain' &&
                     deckhandHireFullySigned &&
                     deckhandAgreement?.isFullySigned && (
                        <a
                            href={deckhandAgreement.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                        >
                            <Download className="h-4 w-4" />
                            Download Agreement
                        </a>
                    )}

                    {/*
                      Accept Request Button.
                      Captain  → enabled only in State 4 (deckhandHireFullySigned).
                      Deckhand → enabled only when status is 'pending'.
                    */}
                    <button
                        type="button"
                        disabled={acceptDisabled}
                        onClick={handleAccept}
                        title={acceptTooltip}
                        className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors ${
                            acceptDisabled
                                ? 'cursor-not-allowed bg-gray-400 opacity-60'
                                : 'cursor-pointer bg-[#35ADD5] hover:bg-[#35ADD5]/70'
                        }`}
                    >
                        <Check className="h-4 w-4" />
                        Accept Request
                    </button>

                    {/*
                      Decline Button — enabled only while request is pending.
                    */}
                    <button
                        type="button"
                        disabled={!isPending || isSubmitting}
                        onClick={handleDecline}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <X className="h-4 w-4" />
                        Decline
                    </button>

                </div>
            </footer>
        </article>
    );
}