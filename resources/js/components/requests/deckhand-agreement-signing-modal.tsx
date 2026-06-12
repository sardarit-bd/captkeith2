import { useState } from 'react';
import { router } from '@inertiajs/react';
import { X, FileText, Download, CheckCircle2, Circle } from 'lucide-react';

interface DeckhandAgreementSigningModalProps {
    agreementId: string;
    onClose: () => void;
}

export function DeckhandAgreementSigningModal({ agreementId, onClose }: DeckhandAgreementSigningModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = () => {
        setIsSubmitting(true);
        
        router.post(`/requests/deckhand-agreement/${agreementId}/sign`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSigned(true);
            },
            onError: () => {
                setIsSubmitting(false);
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleDownload = () => {
        window.open(`/requests/agreement/${agreementId}/download`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e5e7eb] bg-[#f8fbff] px-6 py-4">
                    <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-[#35ADD5]" />
                        <h3 className="text-lg font-bold text-[#111827]">
                            Deckhand Hire Agreement
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-[#6b7280] transition-colors hover:bg-[#e5e7eb] hover:text-[#111827]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto p-6">
                    <div className="space-y-4 text-sm leading-relaxed text-[#374151]">
                        <p className="text-center font-bold tracking-wide text-[#35ADD5] uppercase">
                            Independent Deckhand For Hire Agreement
                        </p>
                        
                        <p>
                            This agreement is entered into between the Charterer and the Deckhand 
                            for services rendered during the charter period. The Deckhand shall 
                            work under the direct supervision of the Captain and assist with all 
                            vessel operations and guest services.
                        </p>

                        <div className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-4">
                            <h4 className="mb-2 font-semibold text-[#111827]">Key Terms:</h4>
                            <ul className="list-inside list-disc space-y-1 text-[#374151]">
                                <li>Deckhand serves as an independent contractor</li>
                                <li>Works under Captain's direct supervision</li>
                                <li>Responsible for vessel safety and guest services</li>
                                <li>Compensation as agreed in booking arrangement</li>
                                <li>Must comply with all maritime laws and safety regulations</li>
                            </ul>
                        </div>

                        <p className="text-xs text-[#6b7280]">
                            By signing this agreement, you acknowledge that you have read, understood, 
                            and agree to all terms and conditions outlined in the full document. 
                            A complete PDF version will be available for download after signing.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t border-[#e5e7eb] bg-[#f8fbff] px-6 py-4 sm:flex-row sm:justify-end">
                    {isSigned ? (
                        <>
                            <div className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white">
                                <CheckCircle2 className="h-4 w-4" />
                                Agreement Signed
                            </div>
                            <button
                                onClick={handleDownload}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#35ADD5]/70 hover:shadow-md"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onClose}
                                className="inline-flex items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-semibold text-[#4b5563] shadow-sm transition-all hover:bg-[#f3f4f6]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSign}
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#35ADD5]/70 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Signing...
                                    </>
                                ) : (
                                    <>
                                        <Circle className="h-4 w-4" />
                                        Sign Agreement
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}