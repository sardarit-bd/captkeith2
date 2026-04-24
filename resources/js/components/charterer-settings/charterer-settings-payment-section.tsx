import { CreditCard, Plus } from 'lucide-react';
import { paymentMethod } from './charterer-settings-data';
import { SecondaryButton, SettingsSection } from './charterer-settings-shared';

export function ChartererSettingsPaymentSection() {
    return (
        <SettingsSection
            title="Payment Methods"
            icon={<CreditCard className="h-5 w-5 text-[#3b82f6]" />}
        >
            <div className="mb-5 flex flex-col justify-between gap-4 rounded-xl border border-[#f1f5f9] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex items-center gap-4">
                    <span className="inline-flex h-8 w-12 shrink-0 items-center justify-center rounded border border-[#dbeafe] bg-[#eff6ff] text-[12px] font-bold italic text-[#1e3a8a]">
                        {paymentMethod.brand}
                    </span>
                    <div>
                        <h4 className="text-[14px] font-semibold text-[#111827]">
                            {paymentMethod.title}
                        </h4>
                        <p className="mt-0.5 text-[12px] text-[#6b7280]">
                            {paymentMethod.subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                    <SecondaryButton className="flex-1 sm:flex-none px-4 py-1.5 text-[12px]">
                        Edit
                    </SecondaryButton>
                    <SecondaryButton className="flex-1 sm:flex-none px-4 py-1.5 text-[12px] hover:border-[#fecaca] hover:bg-[#fef2f2] hover:text-[#dc2626]">
                        Remove
                    </SecondaryButton>
                </div>
            </div>

            <SecondaryButton className="inline-flex items-center justify-center gap-2 px-5 py-2.5">
                <Plus className="h-4 w-4" />
                Add Payment Method
            </SecondaryButton>
        </SettingsSection>
    );
}
