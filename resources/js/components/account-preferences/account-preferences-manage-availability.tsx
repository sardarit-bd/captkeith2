import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import type { UnavailableDate } from './account-preferences-data';
import { PreferencesCard } from './account-preferences-shared';

interface Props {
    unavailableDates: UnavailableDate[];
}

function formatDateRange(from: string, to: string): string {
    const opts: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const f = new Date(from).toLocaleDateString('en-US', opts);
    const t = new Date(to).toLocaleDateString('en-US', opts);

    return f === t ? f : `${f} - ${t}`;
}

export function AccountPreferencesManageAvailability({
    unavailableDates,
}: Props) {
    const [showForm, setShowForm] = useState(false);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleAdd() {
        if (!dateFrom || !dateTo || !reason.trim()) {
            return;
        }

        setIsSubmitting(true);

        router.post(
            '/account-preferences/dates',
            { date_from: dateFrom, date_to: dateTo, reason: reason.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDateFrom('');
                    setDateTo('');
                    setReason('');
                    setShowForm(false);
                },
                onFinish: () => setIsSubmitting(false),
            },
        );
    }

    function handleDelete(id: string) {
        router.delete(`/account-preferences/dates/${id}`, {
            preserveScroll: true,
        });
    }

    return (
        <PreferencesCard
            title="Manage Availability"
            description="Mark dates when you're unavailable"
        >
            <div className="mb-6 space-y-4">
                {unavailableDates.length === 0 && (
                    <p className="text-[13px] text-[#6b7280]">
                        No unavailable dates added yet.
                    </p>
                )}

                {unavailableDates.map((item) => (
                    <article
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-[#f1f5f9] p-4 transition-colors hover:border-[#e5e7eb]"
                    >
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                {formatDateRange(item.date_from, item.date_to)}
                            </h4>
                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                {item.reason}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#4b5563]">
                                Unavailable
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                className="cursor-pointer rounded-full bg-red-100 p-2 text-[#f87171] transition-colors hover:bg-red-200 hover:text-red-500"
                                title="Remove Date"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {showForm && (
                <div className="mb-4 space-y-3 rounded-xl border border-[#e5e7eb] p-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-[12px] font-medium text-[#374151]">
                                From
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-[13px] text-[#111827] focus:border-[#35ADD5] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-[12px] font-medium text-[#374151]">
                                To
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                min={dateFrom}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-[13px] text-[#111827] focus:border-[#35ADD5] focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-[12px] font-medium text-[#374151]">
                            Reason
                        </label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Personal vacation"
                            className="w-full rounded-lg border border-[#e5e7eb] px-3 py-2 text-[13px] text-[#111827] focus:border-[#35ADD5] focus:outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={
                                isSubmitting ||
                                !dateFrom ||
                                !dateTo ||
                                !reason.trim()
                            }
                            onClick={handleAdd}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#35ADD5] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#35ADD5] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? 'Saving…' : 'Save Date'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-semibold text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!showForm && (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <Plus className="h-4 w-4" />
                    Add Unavailable Date
                </button>
            )}
        </PreferencesCard>
    );
}
