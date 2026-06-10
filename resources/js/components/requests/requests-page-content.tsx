import { useState } from 'react';
import { router } from '@inertiajs/react';
import { RequestsList } from './requests-list';
import { DeckhandSelectModal } from './deckhand-select-modal';
import type { CaptainRequestRecord } from './requests-data';

interface RequestsPageContentProps {
    requests: CaptainRequestRecord[];
}

export function RequestsPageContent({ requests }: RequestsPageContentProps) {
    const [selectedRequest, setSelectedRequest] = useState<CaptainRequestRecord | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSelectDeckhand = (requestId: string, charterEventId: string) => {
        const request = requests.find((r) => r.id === requestId);
        if (request?.deckhandInfo?.availableDeckhands) {
            setSelectedRequest(request);
        }
    };

    // FIX: Updated payload keys to match backend validation (charter_event_id & deckhand_profile_id)
    const handleSendRequest = (deckhandId: string) => {
        if (!selectedRequest?.charterEventId) return;

        setIsSubmitting(true);
        router.post(
            '/requests/deckhand/send',
            {
                charter_event_id: selectedRequest.charterEventId,
                deckhand_profile_id: deckhandId,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsSubmitting(false);
                    setSelectedRequest(null);
                },
            },
        );
    };

    // FIX: Updated payload keys to match backend validation
    const handleCancelRequest = (deckhandId: string) => {
        if (!selectedRequest?.charterEventId) return;

        setIsSubmitting(true);
        router.post(
            '/requests/deckhand/cancel',
            {
                charter_event_id: selectedRequest.charterEventId,
                deckhand_profile_id: deckhandId,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsSubmitting(false);
                    setSelectedRequest(null);
                },
            },
        );
    };

    // FIX: Updated payload keys to match backend validation
    const handleResendRequest = (deckhandId: string) => {
        if (!selectedRequest?.charterEventId) return;

        setIsSubmitting(true);
        router.post(
            '/requests/deckhand/send',
            {
                charter_event_id: selectedRequest.charterEventId,
                deckhand_profile_id: deckhandId,
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsSubmitting(false);
                    setSelectedRequest(null);
                },
            },
        );
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
    };

    return (
        <>
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                        <RequestsList
                            requests={requests}
                            onSelectDeckhand={handleSelectDeckhand}
                        />
                    </div>
                </div>
            </div>

            {selectedRequest?.deckhandInfo?.availableDeckhands && (
                <DeckhandSelectModal
                    deckhands={selectedRequest.deckhandInfo.availableDeckhands}
                    onSendRequest={handleSendRequest}
                    onCancelRequest={handleCancelRequest}
                    onResendRequest={handleResendRequest}
                    onCancel={handleCloseModal}
                    isSubmitting={isSubmitting}
                />
            )}
        </>
    );
}