import { Head } from '@inertiajs/react';
import { ChartererCaptainSelectPageContent } from '@/components/charterer-captain-select/charterer-captain-select-page-content';
import { captainSelect } from '@/routes/charterer';

export default function ChartererCaptainSelectPage() {
    return (
        <>
            <Head title="Select Your Captain" />
            <ChartererCaptainSelectPageContent />
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
