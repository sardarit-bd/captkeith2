import { Head } from '@inertiajs/react';
import { ChartererAgreementPageContent } from '@/components/charterer-agreement/charterer-agreement-page-content';
import { agreement } from '@/routes/charterer';

export default function ChartererAgreementPage() {
    return (
        <>
            <Head title="Sign Agreements" />
            <ChartererAgreementPageContent />
        </>
    );
}

ChartererAgreementPage.layout = {
    breadcrumbs: [
        {
            title: 'Agreement',
            href: agreement(),
        },
    ],
    pageHeader: {
        title: 'Sign Agreements',
        description:
            'Review and sign all required charter documents before proceeding.',
    },
};
