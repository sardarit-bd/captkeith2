import { ClipboardList } from 'lucide-react';
import { ChartererRequestAvailableCaptainsCard } from './charterer-request-available-captains-card';
import { ChartererRequestCharterInfoCard } from './charterer-request-charter-info-card';
import type { CharterEvent } from './charterer-request-data';
import { ChartererRequestNextStepsCard } from './charterer-request-next-steps-card';
import { ChartererRequestYachtCard } from './charterer-request-yacht-card';

type Props = {
    charterEvent: CharterEvent | null;
};

export function ChartererRequestPageContent({ charterEvent }: Props) {
    if (!charterEvent) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] px-4 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <ClipboardList className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-700">
                    No Request Found
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                    You don't have any active charter requests yet. Please use
                    your invite link to join a charter.
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-250 space-y-6">
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
