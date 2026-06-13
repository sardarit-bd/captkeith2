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
            <div className="h-6 w-11 rounded-full bg-[#e5e7eb] peer-checked:bg-[#35ADD5] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-[#d1d5db] after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
    );
}



type CardBrand = 'visa' | 'mastercard';

type PaymentCard = {
    id: string;
    brand: CardBrand;
    last4: string;
    expMonth: number;
    expYear: number;
};

function VisaLogo() {
    return (
        <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-label="Visa">
            <text
                x="0"
                y="13"
                fontFamily="Arial Black, sans-serif"
                fontWeight="900"
                fontSize="15"
                fill="#1A1F71"
                letterSpacing="-0.5"
            >
                VISA
            </text>
        </svg>
    );
}

function MastercardLogo() {
    return (
        <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard">
            <circle cx="13" cy="12" r="10" fill="#EB001B" />
            <circle cx="25" cy="12" r="10" fill="#F79E1B" />
            <path
                d="M19 4.8a10 10 0 0 1 0 14.4A10 10 0 0 1 19 4.8z"
                fill="#FF5F00"
            />
        </svg>
    );
}

function BrandBadge({ brand }: { brand: CardBrand }) {
    return (
        <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded border border-[#e5e7eb] bg-white">
            {brand === 'visa' ? <VisaLogo /> : <MastercardLogo />}
        </span>
    );
}

type AddCardFormProps = {
    onAdd: (card: Omit<PaymentCard, 'id'>) => void;
    onCancel: () => void;
};

function AddCardForm({ onAdd, onCancel }: AddCardFormProps) {
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');

    const rawNumber = number.replace(/\s/g, '');
    const detectedBrand: CardBrand | null = rawNumber.startsWith('4')
        ? 'visa'
        : rawNumber.startsWith('5')
          ? 'mastercard'
          : null;

    function formatNumber(val: string) {
        const digits = val.replace(/\D/g, '').slice(0, 16);
        return digits.replace(/(.{4})/g, '$1 ').trim();
    }

    function formatExpiry(val: string) {
        const digits = val.replace(/\D/g, '').slice(0, 4);
        if (digits.length >= 3)
            return digits.slice(0, 2) + '/' + digits.slice(2);
        return digits;
    }

    function handleSubmit() {
        if (!detectedBrand || rawNumber.length < 16 || !expiry || !name) return;
        const [mm, yy] = expiry.split('/');
        onAdd({
            brand: detectedBrand,
            last4: rawNumber.slice(-4),
            expMonth: parseInt(mm, 10),
            expYear: 2000 + parseInt(yy, 10),
        });
    }

    const isValid =
        detectedBrand !== null &&
        rawNumber.length === 16 &&
        expiry.length === 5 &&
        name.trim().length > 0;

    const inputClass =
        'w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2.5 text-[13px] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#35ADD5] focus:outline-none focus:ring-1 focus:ring-[#35ADD5]/20 transition-colors';

    return (
        <div className="mb-5 rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-5">
            <p className="mb-4 text-[13px] font-semibold text-[#111827]">
                New Card
            </p>
            <div className="space-y-3">
                <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                        Card Number
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="1234 5678 9012 3456"
                            value={number}
                            onChange={(e) =>
                                setNumber(formatNumber(e.target.value))
                            }
                            className={inputClass + ' pr-12'}
                        />
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            {detectedBrand === 'visa' && <VisaLogo />}
                            {detectedBrand === 'mastercard' && (
                                <MastercardLogo />
                            )}
                            {!detectedBrand && (
                                <CreditCard className="h-4 w-4 text-[#d1d5db]" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-1.5 block text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                            Expiry
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) =>
                                setExpiry(formatExpiry(e.target.value))
                            }
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                            CVV
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="•••"
                            maxLength={4}
                            value={cvv}
                            onChange={(e) =>
                                setCvv(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 4),
                                )
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                        Cardholder Name
                    </label>
                    <input
                        type="text"
                        placeholder="As shown on card"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                    />
                </div>

                <div className="flex gap-2 pt-1">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className="flex-1 rounded-lg bg-[#35ADD5] py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70 cursor-pointer! disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Add Card
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 rounded-lg border border-[#e5e7eb] bg-white py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

function PaymentMethodsSection() {
    const [cards, setCards] = useState<PaymentCard[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [removingId, setRemovingId] = useState<string | null>(null);

    function handleAdd(card: Omit<PaymentCard, 'id'>) {
        setCards((prev) => [
            ...prev,
            { ...card, id: Math.random().toString(36).slice(2) },
        ]);
        setShowForm(false);
    }

    function handleRemove(id: string) {
        setRemovingId(id);

        setTimeout(() => {
            setCards((prev) => prev.filter((c) => c.id !== id));
            setRemovingId(null);
        }, 300);
    }

    return (
        <SettingsSection
            title="Payment Methods"
            icon={<CreditCard className="h-5 w-5 text-[#3b82f6]" />}
        >
            {showForm && (
                <AddCardForm
                    onAdd={handleAdd}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {cards.length === 0 && !showForm ? (
                <p className="mb-5 text-[13px] text-[#6b7280]">
                    No payment methods added yet.
                </p>
            ) : (
                cards.length > 0 && (
                    <ul className="mb-5 divide-y divide-[#f1f5f9] rounded-xl border border-[#f1f5f9]">
                        {cards.map((card) => (
                            <li
                                key={card.id}
                                className={`flex items-center justify-between gap-4 p-4 transition-opacity ${
                                    removingId === card.id
                                        ? 'opacity-40'
                                        : 'opacity-100'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <BrandBadge brand={card.brand} />
                                    <div>
                                        <p className="text-[14px] font-semibold text-[#111827]">
                                            <span className="capitalize">
                                                {card.brand}
                                            </span>{' '}
                                            <span className="font-mono font-normal text-[#6b7280]">
                                                •••• {card.last4}
                                            </span>
                                        </p>
                                        <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                            Expires{' '}
                                            {String(card.expMonth).padStart(
                                                2,
                                                '0',
                                            )}
                                            /{String(card.expYear).slice(-2)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(card.id)}
                                    disabled={removingId === card.id}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[#9ca3af] transition-colors hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#dc2626] disabled:cursor-not-allowed disabled:opacity-40"
                                    aria-label="Remove card"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            )}

            {!showForm && (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] cursor-pointer shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <Plus className="h-4 w-4" />
                    Add Payment Method
                </button>
            )}
        </SettingsSection>
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
        if (deactivating) return;
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
        if (deleting) return;
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
                                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer! disabled:cursor-not-allowed"
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
                                className="mt-6 rounded-lg bg-[#35ADD5]! px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70! cursor-pointer! disabled:opacity-50"
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

                        <PaymentMethodsSection />

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
    breadcrumbs: [
        {
            title: 'Settings',
            href: '/owner/settings',
        },
    ],
    pageHeader: {
        title: 'Settings',
        description: 'Manage your account preferences.',
    },
};