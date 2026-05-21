import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { SecondaryButton, SettingsSection } from './charterer-settings-shared';

type CardBrand = 'visa' | 'mastercard';

type PaymentCard = {
    id: string;
    brand: CardBrand;
    last4: string;
    expMonth: number;
    expYear: number;
};

const MOCK_CARDS: PaymentCard[] = [
    { id: '1', brand: 'visa', last4: '4242', expMonth: 12, expYear: 2026 },
];

// ── Brand logos ───────────────────────────────────────────────────────────────

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
        <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded border border-[#e2e8f0] bg-white">
            {brand === 'visa' ? <VisaLogo /> : <MastercardLogo />}
        </span>
    );
}

// ── Add card form ─────────────────────────────────────────────────────────────

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
        'w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2.5 text-[13px] text-[#111827] placeholder:text-[#9ca3af] focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]/20 transition-colors';

    return (
        <div className="mb-6 rounded-xl border border-[#e8eef4] bg-[#f8fafc] p-5">
            <p className="mb-4 text-[13px] font-semibold text-[#111827]">
                New Card
            </p>
            <div className="space-y-3">
                {/* Card number */}
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

                {/* Expiry + CVV */}
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

                {/* Cardholder name */}
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

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className="flex-1 rounded-lg bg-[#0A273F] py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0d314d] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Add Card
                    </button>
                    <SecondaryButton onClick={onCancel} className="flex-1">
                        Cancel
                    </SecondaryButton>
                </div>
            </div>
        </div>
    );
}

// ── Main section ──────────────────────────────────────────────────────────────

export function ChartererSettingsPaymentSection() {
    const [cards, setCards] = useState<PaymentCard[]>(MOCK_CARDS);
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
        // TODO: router.delete(`/charterer-settings/payment-methods/${id}`)
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
            {/* Add card form */}
            {showForm && (
                <AddCardForm
                    onAdd={handleAdd}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Cards list */}
            {cards.length === 0 ? (
                <div className="mb-5 flex flex-col items-center justify-center rounded-xl border border-[#f1f5f9] bg-[#f8fafc] py-8 text-center">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9]">
                        <CreditCard className="h-4 w-4 text-[#9ca3af]" />
                    </span>
                    <p className="text-[13px] font-medium text-[#374151]">
                        No cards added yet
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#9ca3af]">
                        Add a Visa or Mastercard to get started.
                    </p>
                </div>
            ) : (
                <ul className="mb-5 divide-y divide-[#f1f5f9] rounded-xl border border-[#f1f5f9] bg-white">
                    {cards.map((card) => (
                        <li
                            key={card.id}
                            className={`flex items-center justify-between gap-4 p-4 transition-opacity sm:p-5 ${
                                removingId === card.id
                                    ? 'opacity-40'
                                    : 'opacity-100'
                            }`}
                        >
                            <div className="flex items-center gap-4">
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
                                        {String(card.expMonth).padStart(2, '0')}
                                        /{String(card.expYear).slice(-2)}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemove(card.id)}
                                disabled={removingId === card.id}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#e2e8f0] bg-white text-[#9ca3af] transition-colors hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#dc2626] disabled:cursor-not-allowed disabled:opacity-40"
                                aria-label="Remove card"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Add card button */}
            {!showForm && (
                <SecondaryButton
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5"
                >
                    <Plus className="h-4 w-4" />
                    Add Payment Method
                </SecondaryButton>
            )}
        </SettingsSection>
    );
}
