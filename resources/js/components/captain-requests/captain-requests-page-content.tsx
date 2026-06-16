import { usePage } from '@inertiajs/react';

import type { CaptainInterestRecord } from './captain-requests-data';
import { CaptainRequestsList } from './captain-requests-list';

type PageProps = {
    interests: CaptainInterestRecord[];
};

export function CaptainRequestsPageContent() {
    const { interests } = usePage<PageProps>().props;
    console.log('interests', interests);
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                    <CaptainRequestsList interests={interests} />
                </div>
            </div>
        </div>
    );
}
