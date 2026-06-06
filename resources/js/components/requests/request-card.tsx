import { useState } from 'react';
import { router } from '@inertiajs/react';
import { AlertCircle, Check, MessageSquare, Ship, User, X } from 'lucide-react';
import { respond, selectDeckhand, sendDeckhand, cancelDeckhand } from '@/routes/requests'; 
import { DeckhandSelectModal } from './deckhand-select-modal';
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

function DeckhandStatusPill({
    name,
    status,
    selectedByMe,
}: {
    name: string;
    status: string;
    selectedByMe: boolean;
}) {
    const colours: Record<string, string> = {
        pending: 'bg-[#FEF3C7] text-[#92400e]',
        available: 'bg-[#DCFCE7] text-[#166534]',
        unavailable: 'bg-red-100 text-[#991b1b]',
    };
    const labels: Record<string, string> = {
        pending: 'Awaiting response',
        available: 'Accepted',
        unavailable: 'Declined',
    };

    return (
        <div className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2">
            <User className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
            <div className="min-w-0">
                <p className="text-[11px] font-medium text-[#6b7280]">
                    {selectedByMe
                        ? 'Your deckhand selection'
                        : 'Deckhand selected by co-captain'}
                </p>
                <p className="truncate text-[13px] font-semibold text-[#111827]">
                    {name}
                </p>
            </div>
            <span
                className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${colours[status] ?? 'bg-red-100! text-[#374151]'}`}
            >
                {labels[status] ?? status}
            </span>
        </div>
    );
}

export function RequestCard({ request }: { request: CaptainRequestRecord }) {
    const isPending = request.status === 'pending';
    const isAccepted =
        request.status === 'available' || request.status === 'accepted';
    const isInvitation = request.type === 'owner_invitation';
    const deckhandInfo = request.deckhandInfo;
    const [showDeckhandModal, setShowDeckhandModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const mustSelectDeckhand = deckhandInfo?.mustSelectDeckhand === true;
    const hasQualifiedDeckhands = deckhandInfo?.hasQualifiedDeckhands === true;
    const deckhandAlreadySelected = !!deckhandInfo?.selectedDeckhand;
    const isAcceptDisabled = !isPending || isSubmitting || (!isInvitation && mustSelectDeckhand && !deckhandAlreadySelected);
    const isSelectDeckhandDisabled = !isPending || isSubmitting || deckhandAlreadySelected || !hasQualifiedDeckhands || isInvitation;

    function handleAcceptClick() {
        submitAccept();
    }

function submitAccept() {
    setIsSubmitting(true);
    router.patch(respond({ crewResponse: request.id }).url, 
        { response: 'available' }, 
        {
            preserveScroll: true,
            onError: (errors) => {
                setIsSubmitting(false);
                // Handle specific errors
            },
            onFinish: () => setIsSubmitting(false),
        }
    );
}

    function submitSelectDeckhand(deckhandIds: string[]) {
        setIsSubmitting(true);
        router.patch(selectDeckhand({ crewResponse: request.id }).url, {
            deckhand_ids: deckhandIds,
        }, {
            preserveScroll: true,
            onFinish: () => {
                setIsSubmitting(false);
                setShowDeckhandModal(false);
            },
        });
    }

    function handleDecline() {
        router.patch(
            respond({ crewResponse: request.id }).url,
            { response: 'unavailable' },
            { preserveScroll: true },
        );
    }

    const fallbackImage = '/images/home/about3.jpg';

    return (
        <>
            <article className="rounded-xl border border-[#eef2f6] bg-white p-6 shadow-sm">
                {isInvitation && (
                    <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-3 py-1 text-[11px] font-semibold text-[#2563eb]">
                        <Ship className="h-3.5 w-3.5" />
                        Owner Invitation
                    </div>
                )}

                <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={request.image ?? fallbackImage}
                            alt={request.yachtName}
                            className="h-16 w-16 shrink-0 rounded-lg border border-[#f3f4f6] object-cover"
                        />
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827]">{request.yachtName}</h3>
                            <p className="text-[13px] text-[#6b7280]">{request.yachtSpec}</p>
                            <p className="text-[13px] text-[#6b7280]">{request.marina}</p>
                        </div>
                    </div>
                    <span
                        className={`inline-flex self-start rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${statusStyles[request.status]}`}
                    >
                        {statusLabels[request.status]}
                    </span>
                </header>

                {!isInvitation && (
                    <>
                        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <RequestInfoItem label="Date" value={request.date} />
                            <RequestInfoItem label="Time" value={request.time} />
                            <RequestInfoItem label="Duration" value={request.duration} />
                        </div>
                        <section className="mb-6">
                            <p className="mb-1 text-[12px] font-medium text-[#6b7280]">Special Notes</p>
                            <p className="text-[14px] text-[#1f2937]">{request.specialNotes || '—'}</p>
                        </section>
                    </>
                )}

                {!isInvitation && isAccepted && deckhandInfo?.selectedDeckhand && (
                    <div className="mb-6">
                        <DeckhandStatusPill
                            name={deckhandInfo.selectedDeckhand.name}
                            status={deckhandInfo.selectedDeckhand.responseStatus}
                            selectedByMe={deckhandInfo.selectedDeckhand.selectedByMe}
                        />
                    </div>
                )}

                <footer className="flex flex-wrap items-center gap-4">
   
                    {!isInvitation && (
                        <div className="flex flex-col items-start gap-1.5">
                            <button
                                type="button"
                                disabled={isSelectDeckhandDisabled}
                                onClick={() => setShowDeckhandModal(true)}
                                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#2563eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#2563eb] shadow-sm transition-colors hover:bg-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <User className="h-4 w-4" />
                                Select Deckhand
                            </button>
                            
                            {deckhandAlreadySelected && (
                                <span className="text-[11px] text-[#16a34a] font-medium flex items-center gap-1">
                                    <Check className="h-3 w-3" /> Deckhand is already selected
                                </span>
                            )}
                            
                            {!deckhandAlreadySelected && !hasQualifiedDeckhands && (
                                <span className="text-[11px] text-[#991b1b] font-medium flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" /> No qualified deckhands available
                                </span>
                            )}
                        </div>
                    )}


                    <button
                        type="button"
                        disabled={isAcceptDisabled}
                        onClick={handleAcceptClick}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-40"
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

                    {request.ownerUserId && (
                        <button
                            type="button"
                            onClick={() => router.get('/messages', { with: request.ownerUserId })}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                        >
                            <MessageSquare className="h-4 w-4" />
                            Message Owner
                        </button>
                    )}
                </footer>
            </article>
            
            {showDeckhandModal && deckhandInfo && (
                <DeckhandSelectModal
                    deckhands={deckhandInfo.availableDeckhands}
                    onSendRequest={(id) => router.post(sendDeckhand().url, { 
                        charter_event_id: request.charterEventId, 
                        deckhand_profile_id: id 
                    })}
                    onCancelRequest={(id) => router.post(cancelDeckhand().url, { 
                        charter_event_id: request.charterEventId, 
                        deckhand_profile_id: id 
                    })}
                    onResendRequest={(id) => router.post(sendDeckhand().url, { 
                        charter_event_id: request.charterEventId, 
                        deckhand_profile_id: id 
                    })}
                    onCancel={() => setShowDeckhandModal(false)}
                    isSubmitting={isSubmitting}
                />
            )}
        </>
    );
}

function RequestInfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="mb-1 text-[12px] font-medium text-[#6b7280]">{label}</p>
            <p className="text-[15px] font-bold text-[#111827]">{value}</p>
        </div>
    );
}