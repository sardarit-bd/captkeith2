import { useState } from 'react';
import { Check, User, X } from 'lucide-react';
import type { AvailableDeckhand } from './requests-data';

interface DeckhandSelectModalProps {
    deckhands: AvailableDeckhand[];
    onConfirm: (deckhandId: string) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

export function DeckhandSelectModal({
    deckhands,
    onConfirm,
    onCancel,
    isSubmitting,
}: DeckhandSelectModalProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onCancel();
            }}
        >
            <div className="w-full max-w-lg rounded-2xl border border-[#e5e7eb] bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-[#f3f4f6] px-6 py-4">
                    <div>
                        <h2 className="text-[16px] font-bold text-[#111827]">
                            Select a Deckhand
                        </h2>
                        <p className="mt-0.5 text-[12px] text-[#6b7280]">
                            Choose one deckhand for this charter before
                            accepting.
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

                <div className="max-h-[340px] overflow-y-auto px-6 py-4">
                    {deckhands.length === 0 ? (
                        <p className="py-6 text-center text-[13px] text-[#9ca3af]">
                            No available deckhands for this vessel.
                        </p>
                    ) : (
                        <ul className="space-y-3">
                            {deckhands.map((d) => {
                                const isSelected = selectedId === d.id;
                                return (
                                    <li key={d.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedId(d.id)}
                                            className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                                                isSelected
                                                    ? 'border-[#111827] bg-[#f9fafb] ring-1 ring-[#111827]'
                                                    : 'border-[#e5e7eb] hover:border-[#d1d5db] hover:bg-[#f9fafb]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {d.photo ? (
                                                    <img
                                                        src={d.photo}
                                                        alt={d.name}
                                                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
                                                        <User className="h-5 w-5 text-[#9ca3af]" />
                                                    </div>
                                                )}

                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-[14px] font-semibold text-[#111827]">
                                                        {d.name}
                                                    </p>
                                                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                                        <span className="text-[12px] text-[#6b7280]">
                                                            {d.experience}
                                                        </span>
                                                        <span className="text-[#d1d5db]">
                                                            ·
                                                        </span>
                                                        <span className="text-[12px] text-[#6b7280]">
                                                            {d.rate}
                                                        </span>
                                                    </div>
                                                    {(d.hasServer ||
                                                        d.hasBartend) && (
                                                        <div className="mt-1 flex flex-wrap gap-1">
                                                            {d.hasServer && (
                                                                <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-medium text-[#2563eb]">
                                                                    Server
                                                                </span>
                                                            )}
                                                            {d.hasBartend && (
                                                                <span className="inline-flex items-center rounded-full bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-medium text-[#16a34a]">
                                                                    Bartender
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {isSelected && (
                                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111827]">
                                                        <Check className="h-3.5 w-3.5 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[#f3f4f6] px-6 py-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={!selectedId || isSubmitting}
                        onClick={() => selectedId && onConfirm(selectedId)}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Check className="h-4 w-4" />
                        {isSubmitting
                            ? 'Submitting…'
                            : 'Confirm & Accept Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}
