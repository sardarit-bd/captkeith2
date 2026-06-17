import { useState } from 'react';
import { User, Calendar, Clock, MessageSquare, Check, X, FileSignature, Download } from 'lucide-react';
import { router } from '@inertiajs/react';
import type { CaptainRequestRecord } from './requests-data';
import { selectDeckhand } from '../../routes/requests';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log('request', request);
    
    // Check if deckhand has accepted
    const deckhandAccepted = request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available';
    console.log(deckhandAccepted,request?.deckhandInfo?.selectedDeckhand)
    // Check if agreement exists and is signed
    const deckhandAgreement = request?.agreements?.find(a => a.type === 'deckhand_hire');
    const agreementSigned = deckhandAgreement?.downloadUrl ?? false;
    console.log('deckhandAgreement', deckhandAgreement);
    console.log('deckhandAccepted', deckhandAccepted);
    console.log('agreementSigned', agreementSigned);
    // Captain can only accept if deckhand accepted AND agreement is signed (or no deckhand required)
    const canAcceptRequest = deckhandAccepted && agreementSigned
    const crewRole=request.crewRole
    const selectedDeckhand=request?.selectedDeckhand
    function handleAccept() {
        if(crewRole ==='captain' && !canAcceptRequest) return;

        setIsSubmitting(true);
        router.patch(`/requests/${request.id}/respond`, { response: 'available' }, {
            preserveScroll: true,
            onFinish: () => setIsSubmitting(false),
        });
    }
    console.log(deckhandAccepted,agreementSigned,crewRole)
console.log(deckhandAccepted && (agreementSigned == false) && crewRole == "captain");
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
const requestButtonDisabledForCaptian = crewRole === "captain" && !canAcceptRequest;
const requestButtonDisabledForDeckhand = crewRole === "deckhand" && (request.status === 'available' || request.status === 'unavailable');
  console.log('requestButtonDisabledForCaptian', requestButtonDisabledForCaptian);
    console.log('requestButtonDisabledForDeckhand', requestButtonDisabledForDeckhand );
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

            {/* Deckhand Status Section */}
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
                        {deckhandAccepted && !agreementSigned && (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-[11px] font-medium text-yellow-800">
                                Agreement Required
                            </span>
                        )}
                        {agreementSigned && (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-[11px] font-medium text-green-800">
                                Agreement Signed
                            </span>
                        )}
                    </div>
                </section>
            )}

            <footer className="flex flex-wrap items-center gap-4">
                {/* Select Deckhand Button */}
                {/* Shows if pending, user is captain, and NO deckhand is selected yet */}
                {isPending && crewRole === "captain" && !request.deckhandInfo?.selectedDeckhand && (
                    <button
                        type="button"
                        onClick={() => onSelectDeckhand?.(request.id, request.charterEventId)}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0]"
                    >
                        <User className="h-4 w-4" />
                        Select Deckhand
                    </button>
                )}

                {/* Sign Agreement Button */}
                {/* Shows ONLY for the captain who selected the deckhand, if agreement exists but is not fully signed */}
                {crewRole === "captain" && 
                 request.deckhandInfo?.selectedDeckhand?.selectedByMe && 
                 request.deckhandInfo?.selectedDeckhand?.responseStatus === 'available' &&
                 deckhandAgreement && 
                 !deckhandAgreement.isFullySigned && (
                    <button
                        type="button"
                        onClick={() => onSignDeckhandAgreement?.(deckhandAgreement.id)}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#35ADD5] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0]"
                    >
                        <FileSignature className="h-4 w-4" />
                        Sign Agreement
                    </button>
                )}
     
                {/* Download Agreement Button */}
                {/* Shows if agreement is fully signed */}
                {deckhandAgreement?.isFullySigned && (
                    <a
                        href={deckhandAgreement.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#14532d] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#166534]"
                    >
                        <Download className="h-4 w-4" />
                        Download Agreement
                    </a>
                )}

                {/* Accept Request Button */}
                {/* Logic: 
                    1. If Captain: Must have selected deckhand, deckhand must accept, agreement must be signed (if selected by me).
                    2. If Deckhand: Can accept if status is pending.
                */}
                <button
                    type="button"
                    disabled={
                        crewRole === "captain" 
                            ? (!request.deckhandInfo?.selectedDeckhand || // No deckhand selected
                               request.deckhandInfo.selectedDeckhand.responseStatus !== 'available' || // Deckhand hasn't accepted
                               (request.deckhandInfo.selectedDeckhand.selectedByMe && !deckhandAgreement?.isFullySigned)) // Selected by me but agreement not signed
                            : (request.status !== 'pending') // Deckhand can only accept if pending
                    }
                    onClick={handleAccept}
                    className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors ${
                        (crewRole === "captain" && 
                         (!request.deckhandInfo?.selectedDeckhand || 
                          request.deckhandInfo.selectedDeckhand.responseStatus !== 'available' || 
                          (request.deckhandInfo.selectedDeckhand.selectedByMe && !deckhandAgreement?.isFullySigned))) || 
                        (crewRole === "deckhand" && request.status !== 'pending')
                            ? 'cursor-not-allowed bg-gray-400 opacity-60' 
                            : 'bg-[#111827] hover:bg-[#1f2937]'
                    }`}
                    title={
                        crewRole === "captain"
                            ? !request.deckhandInfo?.selectedDeckhand
                                ? 'Please select a deckhand first'
                                : request.deckhandInfo.selectedDeckhand.responseStatus !== 'available'
                                    ? 'Waiting for deckhand to accept'
                                    : !deckhandAgreement?.isFullySigned
                                        ? 'Please sign the agreement'
                                        : ''
                            : ''
                    }
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