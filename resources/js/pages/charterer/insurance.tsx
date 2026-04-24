import { Head } from '@inertiajs/react';
import { ChartererInsurancePageContent } from '@/components/charterer-insurance/charterer-insurance-page-content';
import { insurance } from '@/routes/charterer';

export default function ChartererInsurancePage() {
    return (
        <>
            <Head title="Charterer Insurance" />
            <ChartererInsurancePageContent />
        </>
    );
}

ChartererInsurancePage.layout = {
    breadcrumbs: [
        {
            title: 'Insurance',
            href: insurance(),
        },
    ],
    pageHeader: {
        title: 'Charterer Insurance',
        description:
            'Final step: purchase insurance coverage for your charter.',
    },
};
