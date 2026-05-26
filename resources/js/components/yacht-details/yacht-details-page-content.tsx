import { usePage } from '@inertiajs/react';
import type { VesselDetail } from '@/pages/yacht/details';
import { YachtDetailsHeader } from './yacht-details-header';
import { YachtDetailsMainColumn } from './yacht-details-main-column';
import { YachtDetailsSidebar } from './yacht-details-sidebar';

export function YachtDetailsPageContent() {
    const { vessel } = usePage<{ vessel: VesselDetail }>().props;

    return (
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <YachtDetailsHeader vessel={vessel} />

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="mx-auto max-w-350">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                        <YachtDetailsMainColumn vessel={vessel} />
                        <YachtDetailsSidebar vessel={vessel} />
                    </div>
                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
}
