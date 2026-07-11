import { Head } from '@inertiajs/react';
import ChartererInsurancePageContent from '@/components/charterer-insurance/charterer-insurance-page-content';
import { insurance } from '@/routes/charterer';

export default function ChartererInsurancePage() {
    return (
        <>
            <Head title="Insurance" />
            <ChartererInsurancePageContent />
        </>
    );
}

ChartererInsurancePage.layout = {
    breadcrumbs: [
        {
            title: 'Insurance',
            href: insurance.url(),
        },
    ],
    pageHeader: {
        title: 'Insurance',
        description: 'Review and purchase required insurance coverage.',
    },
};
