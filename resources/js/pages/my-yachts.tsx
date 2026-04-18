import { Head } from '@inertiajs/react';
import { MyYachtsPageContent } from '@/components/my-yachts/my-yachts-page-content';
import { myYachts } from '@/routes';

export default function MyYachtsPage() {
    return (
        <>
            <Head title="My Yachts" />
            <MyYachtsPageContent />
        </>
    );
}

MyYachtsPage.layout = {
    breadcrumbs: [
        {
            title: 'My Yachts',
            href: myYachts(),
        },
    ],
    pageHeader: {
        title: 'My Yachts',
        description: 'Manage your fleet of vessels.',
    },
};
