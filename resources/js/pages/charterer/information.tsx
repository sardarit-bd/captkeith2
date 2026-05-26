import { Head } from '@inertiajs/react';
import { ChartererInformationPageContent } from '@/components/charterer-information/charterer-information-page-content';
import { information } from '@/routes/charterer';

interface Profile {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    photo_path: string | null;
}

interface Props {
    profile: Profile;
}

export default function ChartererInformationPage({ profile }: Props) {
    return (
        <>
            <Head title="Create Your Profile" />
            <ChartererInformationPageContent profile={profile} />
        </>
    );
}

ChartererInformationPage.layout = {
    breadcrumbs: [
        {
            title: 'Information',
            href: information(),
        },
    ],
    pageHeader: {
        title: 'Create Your Profile',
        description: 'We need a few details to complete your charter booking.',
    },
};
