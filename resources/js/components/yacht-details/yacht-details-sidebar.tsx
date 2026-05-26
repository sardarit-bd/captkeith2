import type { VesselDetail } from '@/pages/yacht/details';
import { DetailsCard } from './yacht-details-shared';

export function YachtDetailsSidebar({ vessel }: { vessel: VesselDetail }) {
    return (
        <aside className="space-y-6 lg:col-span-1">
            <RegistrationCard vessel={vessel} />
            <HelpCard />
        </aside>
    );
}

function RegistrationCard({ vessel }: { vessel: VesselDetail }) {
    return (
        <DetailsCard className="p-6">
            <h3 className="mb-4 text-[15px] font-bold text-[#111827]">
                Registration Info
            </h3>
            <div className="space-y-4">
                <div>
                    <p className="mb-1 text-[12px] text-[#6b7280]">
                        Official Number
                    </p>
                    <p className="text-[14px] font-semibold text-[#111827]">
                        {vessel.registrationNo ?? '—'}
                    </p>
                </div>
                <div>
                    <p className="mb-1 text-[12px] text-[#6b7280]">
                        Vessel Name
                    </p>
                    <p className="text-[14px] font-semibold text-[#111827]">
                        {vessel.name}
                    </p>
                </div>
            </div>
        </DetailsCard>
    );
}

function HelpCard() {
    return (
        <DetailsCard className="p-6">
            <h3 className="mb-2 text-[14px] font-bold text-[#111827]">
                Need Help?
            </h3>
            <p className="mb-4 text-[12px] leading-relaxed text-[#6b7280]">
                Contact our support team if you have questions about this
                vessel.
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
