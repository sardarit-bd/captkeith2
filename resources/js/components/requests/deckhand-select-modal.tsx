import { useState } from 'react';
import { User, X, Send, Ban, RefreshCw, AlertTriangle } from 'lucide-react';
import type { AvailableDeckhand } from './requests-data';

interface DeckhandSelectModalProps {
    deckhands: AvailableDeckhand[];
    onSendRequest: (deckhandId: string) => void;
    onCancelRequest: (deckhandId: string) => void;
    onResendRequest: (deckhandId: string) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function DeckhandSelectModal({
    deckhands,
    onSendRequest,
    onCancelRequest,
    onResendRequest,
    onCancel,
    isSubmitting,
}: DeckhandSelectModalProps) {
    const [confirmResendId, setConfirmResendId] = useState<string | null>(null);

    const handleResendClick = (id: string) => {
        setConfirmResendId(id); 
    };

    const confirmResend = () => {
        if (confirmResendId) {
            onResendRequest(confirmResendId);
            setConfirmResendId(null);
        }
    };

    return (
        <>
         
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onCancel();
                }}
            >
                <div className="w-full max-w-lg rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#f3f4f6] px-6 py-4">
                        <div>
                            <h2 className="text-[16px] font-bold text-[#111827]">Available Deckhands</h2>
                            <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                Send a request to a deckhand. The first to accept will be hired.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#374151] disabled:cursor-not-allowed"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="max-h-85 overflow-y-auto px-6 py-4">
                        {deckhands.length === 0 ? (
                            <p className="py-6 text-center text-[13px] text-[#9ca3af]">
                                No available deckhands for this vessel.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {deckhands.map((d) => (
                                    <li key={d.id} className="rounded-xl border border-[#e5e7eb] p-4">
                                        <div className="flex items-center gap-3">
                                            {d.photo ? (
                                                <img src={d.photo} alt={d.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
                                                    <User className="h-5 w-5 text-[#9ca3af]" />
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[14px] font-semibold text-[#111827]">{d.name}</p>
                                                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                                    <span className="text-[12px] text-[#6b7280]">{d.experience}</span>
                                                    <span className="text-[#d1d5db]">·</span>
                                                    <span className="text-[12px] text-[#6b7280]">{d.rate}</span>
                                                </div>
                                                {(d.hasServer || d.hasBartend) && (
                                                    <div className="mt-1 flex flex-wrap gap-1">
                                                        {d.hasServer && (
                                                            <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-medium text-[#2563eb]">Server</span>
                                                        )}
                                                        {d.hasBartend && (
                                                            <span className="inline-flex items-center rounded-full bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-medium text-[#16a34a]">Bartender</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                        
                                            <div className="shrink-0">
                                                {d.requestStatus === 'pending' ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => onCancelRequest(d.id)}
                                                        disabled={isSubmitting}
                                                        className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <Ban className="h-3.5 w-3.5" />
                                                        Cancel Request
                                                    </button>
                                                ) : d.requestStatus === 'declined' ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleResendClick(d.id)}
                                                        disabled={isSubmitting}
                                                        className="inline-flex items-center gap-1.5 rounded-md bg-[#2563eb] px-3 py-1.5 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <RefreshCw className="h-3.5 w-3.5" />
                                                        Resend Request
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => onSendRequest(d.id)}
                                                        disabled={isSubmitting || d.requestStatus === 'accepted'}
                                                        className="inline-flex items-center gap-1.5 rounded-md bg-[#111827] px-3 py-1.5 text-[12px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <Send className="h-3.5 w-3.5" />
                                                        {d.requestStatus === 'accepted' ? 'Hired' : 'Send Request'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex items-center justify-end border-t border-[#f3f4f6] px-6 py-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

         
            {confirmResendId && (
                <div className="fixed inset-0 z-60   flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center gap-3 text-[#d97706]">
                            <AlertTriangle className="h-6 w-6" />
                            <h3 className="text-[16px] font-bold text-[#111827]">Resend Request?</h3>
                        </div>
                        <p className="mt-2 text-[13px] text-[#6b7280]">
                            This deckhand previously declined a request. Are you sure you want to send a new request?
                        </p>
                        <div className="mt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setConfirmResendId(null)}
                                className="rounded-md border border-[#e5e7eb] bg-white px-3 py-1.5 text-[13px] font-medium text-[#374151] hover:bg-[#f9fafb]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmResend}
                                className="rounded-md bg-[#2563eb] px-3 py-1.5 text-[13px] font-medium text-white hover:bg-[#1d4ed8]"
                            >
                                Yes, Resend
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}