import { Link, router, usePage } from '@inertiajs/react';
import { CreditCard, Receipt, ShieldCheck, Ship, Loader2 } from 'lucide-react';
import { confirmed, insurance } from '@/routes/charterer';
import { checkoutHoldNotice } from './charterer-checkout-data';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

interface CrewFeeLine {
    id: string | null;
    name: string;
    hourlyRate: number | null;
    hours: number;
    fee: number;
    ratePending: boolean;
}

interface VesselInfo {
    name: string;
    image: string | null;
}

interface PageProps {
    charterEventId: string;
    vessel: VesselInfo;
    hours: number;
    rentalCost: number;
    rentalCostPending: boolean;
    captains: CrewFeeLine[];
    deckhand: CrewFeeLine | null;
    total: number;
    stripeKey: string | null; // Updated to allow null
    errors?: { payment?: string };
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

function LineItem({
    label,
    sublabel,
    amount,
    pending,
}: {
    label: string;
    sublabel?: string;
    amount: number;
    pending?: boolean;
}) {
    return (
        <div className="flex items-center justify-between border-b border-[#f3f4f6] py-4 last:border-b-0">
            <div>
                <p className="text-sm font-semibold text-[#111827]">{label}</p>
                {sublabel && (
                    <p className="mt-0.5 text-xs text-[#6b7280]">{sublabel}</p>
                )}
            </div>
            {pending ? (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    Pending
                </span>
            ) : (
                <p className="text-sm font-semibold text-[#1f2937]">
                    {formatCurrency(amount)}
                </p>
            )}
        </div>
    );
}

function CheckoutForm({ total }: { total: number }) {
    const stripe = useStripe();
    const elements = useElements();
    const { errors } = usePage<{ errors: { payment?: string } }>().props;
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)!,
        });

        if (error) {
            console.error(error);
            setIsProcessing(false);
        } else {
            // Replace route('charterer.checkout.process') with the raw URL string:
            router.post(
                '/charterer/checkout/process',
                {
                    payment_method_id: paymentMethod.id,
                },
                {
                    onFinish: () => setIsProcessing(false),
                },
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
                <CardElement
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#42475e',
                                '::placeholder': { color: '#aab7c4' },
                            },
                        },
                    }}
                />
            </div>
            {errors?.payment && (
                <p className="text-sm text-red-500">{errors.payment}</p>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing || total <= 0}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#35ADD5]/70 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >
                {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <CreditCard className="h-4 w-4" />
                )}
                {isProcessing
                    ? 'Processing...'
                    : `Pay ${formatCurrency(total)}`}
            </button>
        </form>
    );
}

export function ChartererCheckoutPageContent() {
    const {
        vessel,
        hours,
        rentalCost,
        rentalCostPending,
        captains,
        deckhand,
        total,
        stripeKey,
    } = usePage<PageProps>().props;

    // 🛡️ SAFETY GUARD: Prevents page crash if STRIPE_KEY is missing in .env
    if (!stripeKey) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] p-6 font-poppins">
                <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
                    <ShieldCheck className="mx-auto h-10 w-10 text-red-500" />
                    <h3 className="mt-4 text-lg font-bold text-red-800">
                        Stripe Not Configured
                    </h3>
                    <p className="mt-2 text-sm text-red-600">
                        The Stripe publishable key is missing. Please add{' '}
                        <code className="rounded bg-red-100 px-1 font-mono font-bold">
                            STRIPE_KEY
                        </code>{' '}
                        to your{' '}
                        <code className="rounded bg-red-100 px-1 font-mono font-bold">
                            .env
                        </code>{' '}
                        file and run{' '}
                        <code className="rounded bg-red-100 px-1 font-mono font-bold">
                            php artisan config:clear
                        </code>
                        .
                    </p>
                </div>
            </div>
        );
    }

    const stripePromise = loadStripe(stripeKey);

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-[700px] space-y-6">
                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
                        <header className="flex items-center gap-3">
                            {vessel.image ? (
                                <img
                                    src={vessel.image}
                                    alt={vessel.name}
                                    className="h-12 w-12 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F4F7FB]">
                                    <Ship className="h-6 w-6 text-[#111827]" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-bold text-[#111827]">
                                    {vessel.name}
                                </h3>
                                <p className="text-xs text-[#6b7280]">
                                    Charter duration: {hours}{' '}
                                    {hours === 1 ? 'hour' : 'hours'}
                                </p>
                            </div>
                        </header>
                    </section>

                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
                        <header className="mb-2 flex items-center gap-3">
                            <Receipt className="h-5 w-5 text-[#35ADD5]" />
                            <h3 className="text-sm font-bold text-[#111827]">
                                Payment Breakdown
                            </h3>
                        </header>

                        <div>
                            <LineItem
                                label="Yacht Rental Cost"
                                sublabel={vessel.name}
                                amount={rentalCost}
                                pending={rentalCostPending}
                            />
                            {captains.map((captain, index) => (
                                <LineItem
                                    key={captain.id ?? index}
                                    label={`Captain ${index + 1} Fee`}
                                    sublabel={
                                        captain.ratePending
                                            ? captain.name
                                            : `${captain.name} • ${formatCurrency(
                                                  captain.hourlyRate ?? 0,
                                              )}/hr × ${captain.hours} hrs`
                                    }
                                    amount={captain.fee}
                                    pending={captain.ratePending}
                                />
                            ))}
                            {deckhand && (
                                <LineItem
                                    label="Deckhand Fee"
                                    sublabel={
                                        deckhand.ratePending
                                            ? deckhand.name
                                            : `${deckhand.name} • ${formatCurrency(
                                                  deckhand.hourlyRate ?? 0,
                                              )}/hr × ${deckhand.hours} hrs`
                                    }
                                    amount={deckhand.fee}
                                    pending={deckhand.ratePending}
                                />
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F4F7FB] px-5 py-4">
                            <p className="text-sm font-bold text-[#111827]">
                                Total Amount Due
                            </p>
                            <p className="text-[22px] font-bold text-[#35ADD5]">
                                {formatCurrency(total)}
                            </p>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
                        <h3 className="mb-4 text-sm font-bold text-[#111827]">
                            Payment Details
                        </h3>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm total={total} />
                        </Elements>
                    </section>

                    <section className="rounded-xl border border-[#E1EBF5] bg-[#F4F7FB] p-5">
                        <p className="flex items-start gap-2 text-sm leading-relaxed text-[#4b5563]">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#35ADD5]" />
                            <span>{checkoutHoldNotice}</span>
                        </p>
                    </section>

                    <footer className="flex flex-col-reverse items-center justify-between gap-4 pt-2 sm:flex-row">
                        <Link
                            href={insurance()}
                            className="w-full rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f9fafb] sm:w-auto"
                        >
                            Back
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
