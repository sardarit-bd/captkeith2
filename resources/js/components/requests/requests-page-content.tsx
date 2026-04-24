import { RequestsList } from './requests-list';

export function RequestsPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-[1400px] py-2 sm:py-4">
                    <RequestsList />
                </div>
            </div>
        </div>
    );
}
