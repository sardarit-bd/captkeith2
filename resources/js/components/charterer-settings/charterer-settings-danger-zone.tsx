import { router } from '@inertiajs/react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { SecondaryButton, SettingsSection } from './charterer-settings-shared';

export function ChartererSettingsDangerZone() {
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    function handleDeactivate() {
        setProcessing(true);
        router.patch(
            route('charterer-settings.deactivate'),
            {},
            {
                onFinish: () => {
                    setProcessing(false);
                    setShowDeactivateModal(false);
                },
            },
        );
    }

    function handleDelete() {
        setProcessing(true);
        router.delete(route('charterer-settings.destroy'), {
            onFinish: () => {
                setProcessing(false);
                setShowDeleteModal(false);
            },
        });
    }

    return (
        <>
            {/* Deactivate Modal */}
            {showDeactivateModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => !processing && setShowDeactivateModal(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-[#111827]">
                                    Deactivate Account
                                </h3>
                                <p className="mt-1 text-sm text-[#6b7280]">
                                    Your account will be temporarily disabled.
                                    You can reactivate it by logging in again.
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeactivateModal(false)}
                                disabled={processing}
                                className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeactivate}
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                                {processing
                                    ? 'Deactivating…'
                                    : 'Yes, Deactivate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => !processing && setShowDeleteModal(false)}
                >
                    <div
                        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-[#111827]">
                                    Delete Account
                                </h3>
                                <p className="mt-1 text-sm text-[#6b7280]">
                                    This will permanently delete your account
                                    and all associated data. This action{' '}
                                    <span className="font-semibold text-[#111827]">
                                        cannot be undone
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={processing}
                                className="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#374151] transition-colors hover:bg-[#f9fafb] disabled:opacity-50"
                            >
                                Keep It
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                                <X className="h-4 w-4" />
                                {processing ? 'Deleting…' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <SettingsSection
                title="Danger Zone"
                icon={<Trash2 className="h-5 w-5" />}
                danger
            >
                <div className="space-y-4 sm:space-y-0">
                    <div className="flex flex-col justify-between gap-4 border-b border-[#f8fafc] pb-5 sm:flex-row sm:items-center">
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                Deactivate Account
                            </h4>
                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                Temporarily disable your account
                            </p>
                        </div>
                        <SecondaryButton
                            onClick={() => setShowDeactivateModal(true)}
                            className="w-full sm:w-auto"
                        >
                            Deactivate
                        </SecondaryButton>
                    </div>

                    <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#dc2626]">
                                Delete Account
                            </h4>
                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                Permanently delete your account and all data
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full rounded-lg bg-[#dc2626] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#b91c1c] sm:w-auto"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </SettingsSection>
        </>
    );
}
