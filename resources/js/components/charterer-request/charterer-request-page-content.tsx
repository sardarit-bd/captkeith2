import { ChartererRequestAvailableCaptainsCard } from './charterer-request-available-captains-card';
import { ChartererRequestCharterInfoCard } from './charterer-request-charter-info-card';
import { ChartererRequestNextStepsCard } from './charterer-request-next-steps-card';
import { ChartererRequestYachtCard } from './charterer-request-yacht-card';

export function ChartererRequestPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-[1000px] space-y-6">
                    <ChartererRequestYachtCard />
                    <ChartererRequestCharterInfoCard />
                    <ChartererRequestAvailableCaptainsCard />
                    <ChartererRequestNextStepsCard />
                </div>
            </div>
        </div>
    );
}
