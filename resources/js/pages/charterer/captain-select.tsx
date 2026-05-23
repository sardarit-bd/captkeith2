import { Head, usePage } from '@inertiajs/react';
import { ChartererCaptainSelectPageContent } from '@/components/charterer-captain-select/charterer-captain-select-page-content';
import { captainSelect } from '@/routes/charterer';

export interface Captain {
    id: string;
    name: string;
    photo: string | null;
    location: string;
    license: string;
    tonnage: string;
    experience: string;
    rate: string;
    bio: string;
    endorsements: string[];
    geographicArea: string | null;
    bodiesOfWater: string | null;
    canProvideDeckhand: boolean;
    isVerified: boolean;
}

interface PageProps {
    captains: Captain[];
    acceptedCount: number;
    slotsNeeded: number;
}

export default function ChartererCaptainSelectPage() {
    const { captains, acceptedCount, slotsNeeded } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Select Your Captain" />
            <ChartererCaptainSelectPageContent
                captains={captains}
                acceptedCount={acceptedCount}
                slotsNeeded={slotsNeeded}
            />
        </>
    );
}

ChartererCaptainSelectPage.layout = {
    breadcrumbs: [
        {
            title: 'Captain Select',
            href: captainSelect(),
        },
    ],
    pageHeader: {
        title: 'Select Your Captain',
        description:
            'All captains are pre-qualified and licensed for your charter.',
    },
};
