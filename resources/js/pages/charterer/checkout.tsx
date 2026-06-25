import { Head } from '@inertiajs/react';
import { ChartererCheckoutPageContent } from '@/components/charterer-checkout/charterer-checkout-page-content';
import { checkout } from '@/routes/charterer';

export default function ChartererCheckoutPage() {
    return (
        <>
            <Head title="Charter Checkout" />
            <ChartererCheckoutPageContent />
        </>
    );
}

ChartererCheckoutPage.layout = {
    breadcrumbs: [
        {
            title: 'Checkout',
            href: checkout(),
        },
    ],
    pageHeader: {
        title: 'Charter Checkout',
        description: 'Review your charter costs before completing payment.',
    },
};