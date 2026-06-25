import { Link } from '@inertiajs/react';
import { CheckCircle2, Shield } from 'lucide-react';
import { checkout } from '@/routes/charterer';
import {
    insuranceCoverageItems,
    insuranceSummary,
} from './charterer-insurance-data';

export function ChartererInsuranceMainCard() {
    return (
        <section className="mb-6 rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] sm:p-8 lg:p-10">
            <header className="mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-[#111827]" />
                <h3 className="text-lg font-bold text-[#111827]">
                    VQUIP Insurance Coverage
                </h3>
            </header>

            <p className="mb-8 text-sm leading-relaxed text-[#4b5563]">
                Your charter requires insurance coverage. We partner with VQUIP
                to provide comprehensive protection for your bareboat charter.
            </p>

            <div className="mb-8 rounded-xl border border-[#E1EBF5] bg-[#F4F7FB] p-5 sm:p-6">
                <h4 className="mb-4 text-sm font-bold text-[#111827]">
                    Coverage Includes:
                </h4>

                <ul className="space-y-3.5">
                    {insuranceCoverageItems.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                            <span className="text-sm font-medium text-[#374151]">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8 space-y-4">
                <SummaryRow
                    label="Coverage Amount:"
                    value={insuranceSummary.coverageAmount}
                />
                <SummaryRow
                    label="Charter Duration:"
                    value={insuranceSummary.charterDuration}
                />
                <SummaryRow
                    label="Premium:"
                    value={insuranceSummary.premium}
                    emphasized
                />
            </div>

            <Link
                href={checkout()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#35ADD5]/70"
            >
                <Shield className="h-4 w-4" />
                Purchase Insurance Coverage
            </Link>
        </section>
    );
}

function SummaryRow({
    label,
    value,
    emphasized = false,
}: {
    label: string;
    value: string;
    emphasized?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between ${emphasized ? 'pt-2' : ''}`}
        >
            <p
                className={`text-sm ${emphasized ? 'font-bold text-[#111827]' : 'font-semibold text-[#111827]'}`}
            >
                {label}
            </p>
            <p
                className={
                    emphasized
                        ? 'text-[22px] font-bold text-[#35ADD5]'
                        : 'text-sm font-medium text-[#1f2937]'
                }
            >
                {value}
            </p>
        </div>
    );
}
