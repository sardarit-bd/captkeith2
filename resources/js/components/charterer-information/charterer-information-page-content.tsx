import { ChartererInformationFormCard } from './charterer-information-form-card';

export function ChartererInformationPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-[850px]">
                    <ChartererInformationFormCard />
                </div>
            </div>
        </div>
    );
}
