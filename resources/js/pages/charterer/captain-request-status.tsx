import { Head, usePage } from '@inertiajs/react';
import { ChartererCaptainSelectWaitingPageContent } from '@/components/charterer-captain-select/charterer-captain-select-waiting-page-content';
import { captainRequestStatus } from '@/routes/charterer';

interface CaptainStatus {
    responseId: string;
    captainId: string | null;
    name: string;
    photo: string | null;
    status: 'pending' | 'available' | 'unavailable';
    expiresAt: string | null;
    respondedAt: string | null;
}

interface PageProps {
    captainStatuses: CaptainStatus[];
    acceptedCount: number;
    canProceed: boolean;
    slotsNeeded: number;
    charterEventId: string;
}

export default function CaptainRequestStatusPage() {
    const { captainStatuses, acceptedCount, canProceed, slotsNeeded } =
        usePage<PageProps>().props;

    return (
        <>
            <Head title="Captain Request Status" />
            <ChartererCaptainSelectWaitingPageContent
                captainStatuses={captainStatuses}
                acceptedCount={acceptedCount}
                canProceed={canProceed}
                slotsNeeded={slotsNeeded}
            />
        </>
    );
}

CaptainRequestStatusPage.layout = {
    breadcrumbs: [{ title: 'Captain Requests', href: captainRequestStatus() }],
    pageHeader: {
        title: 'Captain Request Status',
        description: 'Track which captains have accepted your charter request.',
    },
};
