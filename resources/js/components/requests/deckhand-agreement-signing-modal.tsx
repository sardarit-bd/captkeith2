import { useState } from 'react';
import { router } from '@inertiajs/react';
import { X } from 'lucide-react';

interface DeckhandAgreementSigningModalProps {
    agreementId: string;
    onClose: () => void;
}

export function DeckhandAgreementSigningModal({ agreementId, onClose }: DeckhandAgreementSigningModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSign = () => {
        setIsSubmitting(true);
        

        router.post(`/requests/deckhand-agreement/${agreementId}/sign`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
            onError: () => {
                setIsSubmitting(false);
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-1 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="mb-4 text-xl font-bold text-[#111827]">Sign Deckhand Agreement</h2>
                
                <div className="mb-6 max-h-100 overflow-y-auto rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
                    <p className="text-sm leading-relaxed text-[#374151]">
                
                        Review the agreement details with the deckhand. By clicking "Sign Agreement", 
                        you acknowledge and agree to the terms outlined in this document.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSign}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-md bg-[#35ADD5] px-4 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#2a8fb0] disabled:opacity-50"
                    >
                        {isSubmitting ? 'Signing...' : 'Sign Agreement'}
                    </button>
                </div>
            </div>
        </div>
    );
}