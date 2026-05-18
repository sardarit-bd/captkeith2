import { Head, router, usePage } from '@inertiajs/react';
import { Bell, CreditCard, Plus, Shield, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Preferences {
    email_notifications: boolean;
    sms_notifications: boolean;
    booking_reminders: boolean;
    marketing_emails: boolean;
}

interface PageProps {
    preferences: Preferences;
    twoFactorEnabled: boolean;
}

function SettingsSection({
    title,
    icon,
    children,
    danger = false,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    danger?: boolean;
}) {
    return (
        <section
            className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
                danger ? 'border-[#fecaca]' : 'border-[#f1f5f9]'
            }`}
        >
            <div
                className={`mb-6 flex items-center gap-2 ${danger ? 'text-[#dc2626]' : 'text-[#111827]'}`}
            >
                {icon}
                <h3 className="text-[16px] font-bold">{title}</h3>
            </div>
            {children}
        </section>
    );
}

function ToggleSwitch({
    id,
    checked,
    onChange,
}: {
    id: string;
    checked: boolean;
    onChange: (val: boolean) => void;
}) {
    return (
        <label
            htmlFor={id}
            className="relative inline-flex cursor-pointer items-center"
        >
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-[#e5e7eb] peer-checked:bg-[#0A273F] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-[#d1d5db] after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
    );
}

export default function OwnerSettingsPage() {
    const { preferences: initialPrefs, twoFactorEnabled } =
        usePage<PageProps>().props;

    const [prefs, setPrefs] = useState<Preferences>(initialPrefs);
    const [savingPrefs, setSavingPrefs] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deactivating, setDeactivating] = useState(false);

    function togglePref(key: keyof Preferences) {
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    }

    function savePreferences() {
        setSavingPrefs(true);
        router.patch('/owner/settings/preferences', prefs, {
            preserveScroll: true,
            onFinish: () => setSavingPrefs(false),
        });
    }

    function handleDeactivate() {
        if (deactivating) {
            return;
        }

        setDeactivating(true);
        router.patch(
            '/owner/settings/deactivate',
            {},
            {
                onFinish: () => setDeactivating(false),
            },
        );
    }

    function handleDelete() {
        if (deleting) {
            return;
        }

        setDeleting(true);
        router.delete('/owner/settings', {
            onFinish: () => setDeleting(false),
        });
    }

    const notificationRows: {
        key: keyof Preferences;
        title: string;
        description: string;
    }[] = [
        {
            key: 'email_notifications',
            title: 'Email Notifications',
            description: 'Receive booking updates and important announcements',
        },
        {
            key: 'sms_notifications',
            title: 'SMS Notifications',
            description: 'Get text alerts for time-sensitive updates',
        },
        {
            key: 'booking_reminders',
            title: 'Booking Reminders',
            description: 'Reminders before your charter date',
        },
        {
            key: 'marketing_emails',
            title: 'Marketing Emails',
            description: 'Special offers and promotions',
        },
    ];

    const securityRows = [
        {
            title: 'Change Password',
            description: 'Update your account password',
            label: 'Change',
            href: '/settings/security',
        },
        {
            title: 'Two-Factor Authentication',
            description: twoFactorEnabled
                ? '2FA is currently enabled on your account'
                : 'Add an extra layer of security',
            label: twoFactorEnabled ? 'Manage' : 'Enable',
            href: '/settings/security',
        },
    ];

    return (
        <>
            <Head title="Settings" />

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Delete Account
                        </h3>
                        <p className="mb-6 text-sm text-gray-500">
                            This will permanently delete your account and all
                            vessels, charters, and data. This cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleting ? 'Deleting…' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-12 sm:px-6">
                    <div className="mx-auto mt-6 max-w-3xl space-y-6">
                        <SettingsSection
                            title="Notification Preferences"
                            icon={<Bell className="h-5 w-5 text-[#3b82f6]" />}
                        >
                            <div className="space-y-6">
                                {notificationRows.map((row, i) => (
                                    <div
                                        key={row.key}
                                        className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-center ${
                                            i > 0
                                                ? 'border-t border-[#f8fafc] pt-4'
                                                : ''
                                        }`}
                                    >
                                        <div>
                                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                                {row.title}
                                            </h4>
                                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                                {row.description}
                                            </p>
                                        </div>
                                        <div className="shrink-0 self-start sm:self-auto">
                                            <ToggleSwitch
                                                id={row.key}
                                                checked={prefs[row.key]}
                                                onChange={() =>
                                                    togglePref(row.key)
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={savePreferences}
                                disabled={savingPrefs}
                                className="mt-6 rounded-lg bg-[#0A273F] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:opacity-50"
                            >
                                {savingPrefs ? 'Saving…' : 'Save Preferences'}
                            </button>
                        </SettingsSection>

                        <SettingsSection
                            title="Security Settings"
                            icon={<Shield className="h-5 w-5 text-[#3b82f6]" />}
                        >
                            <div className="space-y-0">
                                {securityRows.map((item, i, arr) => (
                                    <div
                                        key={item.title}
                                        className={`flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center ${
                                            i < arr.length - 1
                                                ? 'border-b border-[#f8fafc]'
                                                : ''
                                        }`}
                                    >
                                        <div>
                                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                                {item.title}
                                            </h4>
                                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <a
                                            href={item.href}
                                            className="w-full rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-center text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] sm:w-auto"
                                        >
                                            {item.label}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>

                        <SettingsSection
                            title="Payment Methods"
                            icon={
                                <CreditCard className="h-5 w-5 text-[#3b82f6]" />
                            }
                        >
                            <p className="mb-5 text-sm text-[#6b7280]">
                                No payment methods added yet.
                            </p>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                            >
                                <Plus className="h-4 w-4" />
                                Add Payment Method
                            </button>
                        </SettingsSection>

                        <SettingsSection
                            title="Danger Zone"
                            icon={<Trash2 className="h-5 w-5" />}
                            danger
                        >
                            <div>
                                <div className="flex flex-col justify-between gap-4 border-b border-[#f8fafc] pb-5 sm:flex-row sm:items-center">
                                    <div>
                                        <h4 className="text-[14px] font-semibold text-[#111827]">
                                            Deactivate Account
                                        </h4>
                                        <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                            Temporarily disable your account
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleDeactivate}
                                        disabled={deactivating}
                                        className="w-full cursor-pointer rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:opacity-50 sm:w-auto"
                                    >
                                        {deactivating
                                            ? 'Deactivating…'
                                            : 'Deactivate'}
                                    </button>
                                </div>

                                <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
                                    <div>
                                        <h4 className="text-[14px] font-semibold text-[#dc2626]">
                                            Delete Account
                                        </h4>
                                        <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                            Permanently delete your account and
                                            all data
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowDeleteConfirm(true)
                                        }
                                        className="w-full cursor-pointer rounded-lg bg-[#dc2626] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#b91c1c] sm:w-auto"
                                    >
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </SettingsSection>
                    </div>
                </div>
            </div>
        </>
    );
}

OwnerSettingsPage.layout = {
    breadcrumbs: [{ title: 'Settings', href: '/owner/settings' }],
    pageHeader: {
        title: 'Settings',
        description: 'Manage your account preferences.',
    },
};
