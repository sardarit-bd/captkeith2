import { useState } from 'react';
import { User, Calendar, Clock, MessageSquare, Check, X, AlertCircle, UserRoundCheck, Download, FileSignature } from 'lucide-react';
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
    onSignDeckhandAgreement?: (agreementId: string) => void;
}

export function RequestCard({ request, onSelectDeckhand, onSignDeckhandAgreement }: RequestCardProps) {
    const isPending = request.status === 'pending';
    const isAccepted = request.status === 'available' || request.status === 'accepted';
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleAccept() {
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

    const fallbackImage = '/images/home/about3.jpg';

    // Update the logic around line 70-80 where agreements are extracted
    const chartererAgreement = request.agreements?.find(a => a.type !== 'deckhand_hire');
    const deckhandAgreement = request.agreements?.find(a => a.type === 'deckhand_hire');

    // Check if deckhand has been selected and has accepted
    const deckhandSelected = request.deckhandInfo?.selectedDeckhand?.selectedByMe;
    const deckhandAccepted = request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available';

    // Check if agreement needs to be signed (deckhand accepted but agreement not fully signed)
    const needsDeckhandAgreement = deckhandSelected && deckhandAccepted && deckhandAgreement && !deckhandAgreement.isFullySigned;

    // Captain can only accept if:
    // 1. No deckhand is selected, OR
    // 2. Deckhand is selected AND accepted AND agreement is fully signed
    const canAcceptRequest = !deckhandSelected || (deckhandAccepted && (deckhandAgreement?.isFullySigned ?? false));

    // Check if we should show the sign agreement button
    const showSignAgreementButton = deckhandSelected && deckhandAccepted && deckhandAgreement && !deckhandAgreement.isFullySigned;
    return (
        <article className="rounded-xl border border-[#eef2f6] bg-white p-6 shadow-sm">
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

            <section className="mb-6">
                <p className="mb-1 text-[12px] font-medium text-[#6b7280]">Special Notes</p>
                <p className="text-[14px] text-[#1f2937]">{request.specialNotes || '—'}</p>
            </section>

            <footer className="flex flex-wrap items-center gap-4">
       
                {request.deckhandInfo?.mustSelectDeckhand && request.charterEventId && (
                    <button
                        type="button"
                        onClick={() => onSelectDeckhand?.(request.id, request.charterEventId)}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0]"
                    >
                        <UserRoundCheck className="h-4 w-4" />
                        Select Deckhand
                    </button>
                )}


                {chartererAgreement?.isSignedByCharterer && (
                    <a
                        href={chartererAgreement.downloadUrl}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#14532d] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                    >
                        <Download className="h-4 w-4" />
                        Download Agreement
                    </a>
                )}

                    {request.deckhandInfo?.selectedDeckhand?.selectedByMe && deckhandAgreement && (
                        <>
                            {!deckhandAgreement.isFullySigned ? (
                                <button
                                    type="button"
                                    onClick={() => onSignDeckhandAgreement?.(deckhandAgreement.id)}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0]"
                                >
                                    <FileSignature className="h-4 w-4" />
                                    Sign Deckhand Agreement
                                </button>
                            ) : (
                                <a
                                    href={deckhandAgreement.downloadUrl}
                                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#14532d] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                                >
                                    <Download className="h-4 w-4" />
                                    Download Agreement
                                </a>
                            )}
                        </>
                    )}

     
                {deckhandAgreement?.isSignedByCrew && !request.deckhandInfo?.selectedDeckhand?.selectedByMe && (
                    <a
                        href={deckhandAgreement.downloadUrl}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#14532d] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                    >
                        <Download className="h-4 w-4" />
                        Download Agreement
                    </a>
                )}

       

                    <button
                        type="button"
                        disabled={!isPending || isSubmitting || !canAcceptRequest}
                        onClick={handleAccept}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Check className="h-4 w-4" />
                        Accept Request
                    </button>

                <button
                    type="button"
                    disabled={!isPending || isSubmitting}
                    onClick={handleDecline}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <X className="h-4 w-4" />
                    Decline
                </button>
            </footer>
        </article>
    );
}