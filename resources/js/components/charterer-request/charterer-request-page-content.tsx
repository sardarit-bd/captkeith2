import { ChartererRequestAvailableCaptainsCard } from './charterer-request-available-captains-card';
import { ChartererRequestCharterInfoCard } from './charterer-request-charter-info-card';
import { ChartererRequestNextStepsCard } from './charterer-request-next-steps-card';
import { ChartererRequestYachtCard } from './charterer-request-yacht-card';
import type { CharterEvent } from './charterer-request-data';

type Props = {
    charterEvent: CharterEvent;
};

export function ChartererRequestPageContent({ charterEvent }: Props) {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-[1000px] space-y-6">
                    <ChartererRequestYachtCard yacht={charterEvent.yacht} />
                    <ChartererRequestCharterInfoCard
                        date={charterEvent.date}
                        time={charterEvent.time}
                        duration={charterEvent.duration}
                        specialNotes={charterEvent.specialNotes}
                    />
                    <ChartererRequestAvailableCaptainsCard
                        availableCaptainCount={
                            charterEvent.availableCaptainCount
                        }
                    />
                    <ChartererRequestNextStepsCard />
                </div>
            </div>
        </div>
    );
}
