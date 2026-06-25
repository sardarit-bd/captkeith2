import { Link, usePage } from '@inertiajs/react';
import { CreditCard, Receipt, ShieldCheck, Ship } from 'lucide-react';
import { confirmed, insurance } from '@/routes/charterer';
import { checkoutHoldNotice } from './charterer-checkout-data';

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

export function ChartererCheckoutPageContent() {
    const {
        vessel,
        hours,
        rentalCost,
        rentalCostPending,
        captains,
        deckhand,
        total,
    } = usePage<PageProps>().props;

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

                        <Link
                            href={confirmed()}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#35ADD5]/70 hover:shadow-md sm:w-auto"
                        >
                            <CreditCard className="h-4 w-4" />
                            Proceed to Payment
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}