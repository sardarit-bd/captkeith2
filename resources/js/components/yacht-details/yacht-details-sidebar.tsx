import { Check, DollarSign, Shield, Star, User } from 'lucide-react';
import { yachtDetailsData } from './yacht-details-data';
import { DetailsCard, LabeledValue, SectionHeading } from './yacht-details-shared';

export function YachtDetailsSidebar() {
    return (
        <aside className="space-y-6 lg:col-span-1">
            <ChartererCard />
            <PaymentCard />
            <InsuranceCard />
            <CancellationPolicyCard />
            <HelpCard />
        </aside>
    );
}

function ChartererCard() {
    return (
        <DetailsCard className="p-6">
            <h3 className="mb-4 text-[15px] font-bold text-[#111827]">
                Charterer Information
            </h3>

            <div className="mb-5 flex items-center gap-4">
                <img
                    src={yachtDetailsData.charterer.avatar}
                    alt={yachtDetailsData.charterer.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <div>
                    <h4 className="text-[14px] font-bold text-[#111827]">
                        {yachtDetailsData.charterer.name}
                    </h4>
                    <div className="mt-0.5 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-[#facc15] text-[#facc15]" />
                        <span className="text-[12px] font-semibold text-[#374151]">
                            {yachtDetailsData.charterer.rating}
                        </span>
                        <span className="text-[11px] text-[#6b7280]">
                            ({yachtDetailsData.charterer.totalCharters})
                        </span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
            >
                <User className="h-4 w-4" />
                View Full Profile
            </button>
        </DetailsCard>
    );
}

function PaymentCard() {
    return (
        <DetailsCard className="p-6">
            <SectionHeading
                title="Payment Details"
                icon={<DollarSign className="h-5 w-5 text-[#22c55e]" />}
            />

            <div className="mb-4 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-4">
                <p className="mb-1 text-[12px] text-[#15803d]">Total Payment</p>
                <p className="mb-1 text-[28px] leading-none font-bold text-[#16a34a]">
                    {yachtDetailsData.payment.total}
                </p>
                <p className="text-[12px] font-medium text-[#16a34a]">
                    {yachtDetailsData.payment.hourly}
                </p>
            </div>

            <ul className="space-y-2.5">
                {yachtDetailsData.payment.notes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-[#4b5563]">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </DetailsCard>
    );
}

function InsuranceCard() {
    return (
        <DetailsCard className="p-6">
            <SectionHeading
                title="Insurance Coverage"
                icon={<Shield className="h-5 w-5 text-[#3b82f6]" />}
            />

            <div className="space-y-4">
                <LabeledValue
                    label="Coverage Type"
                    value={yachtDetailsData.insurance.coverageType}
                />
                <LabeledValue
                    label="Coverage Amount"
                    value={yachtDetailsData.insurance.amount}
                />
                <LabeledValue
                    label="Provider"
                    value={yachtDetailsData.insurance.provider}
                />
            </div>
        </DetailsCard>
    );
}

function CancellationPolicyCard() {
    return (
        <DetailsCard className="p-6">
            <h3 className="mb-3 text-[15px] font-bold text-[#111827]">
                Cancellation Policy
            </h3>
            <p className="text-[13px] leading-relaxed text-[#4b5563]">
                {yachtDetailsData.cancellationPolicy}
            </p>
        </DetailsCard>
    );
}

function HelpCard() {
    return (
        <DetailsCard className="p-6">
            <h3 className="mb-2 text-[14px] font-bold text-[#111827]">Need Help?</h3>
            <p className="mb-4 text-[12px] leading-relaxed text-[#6b7280]">
                Contact our support team if you have questions about this charter.
            </p>
            <button
                type="button"
                className="w-full rounded-lg border border-[#e5e7eb] bg-white py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
            >
                Contact Support
            </button>
        </DetailsCard>
    );
}
