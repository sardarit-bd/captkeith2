import { Head } from '@inertiajs/react';
import { YachtsMatchPageContent } from '@/components/yachts-match/yachts-match-page-content';
import { yachtsMatch } from '@/routes';

export default function YachtsMatchPage() {
    return (
        <>
            <Head title="Yachts Match" />
            <YachtsMatchPageContent />
        </>
    );
}

YachtsMatchPage.layout = {
    breadcrumbs: [
        {
            title: 'Yachts Match',
            href: yachtsMatch(),
        },
    ],
    pageHeader: {
        title: 'Yacht Matches',
        description:
            'Browse and connect with vessels matching your qualifications.',
    },
};
