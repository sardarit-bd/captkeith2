import { Head } from '@inertiajs/react';
import { YachtDetailsPageContent } from '@/components/yacht-details/yacht-details-page-content';
import { yachtDetails } from '@/routes';

export default function YachtDetailsPage() {
    return (
        <>
            <Head title="Yacht Details" />
            <YachtDetailsPageContent />
        </>
    );
}

YachtDetailsPage.layout = {
    breadcrumbs: [
        {
            title: 'Yacht Details',
            href: yachtDetails(),
        },
    ],
    pageHeader: {
        title: 'Charter Request Details',
        description: 'Review charter information and requirements before accepting.',
    },
};
