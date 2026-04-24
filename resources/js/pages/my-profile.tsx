import { Head } from '@inertiajs/react';
import { MyProfilePageContent } from '@/components/my-profile/my-profile-page-content';
import { myProfile } from '@/routes';

export default function MyProfilePage() {
    return (
        <>
            <Head title="My Profile" />
            <MyProfilePageContent />
        </>
    );
}

MyProfilePage.layout = {
    breadcrumbs: [
        {
            title: 'My Profile',
            href: myProfile(),
        },
    ],
    pageHeader: {
        title: 'My Profile',
        description: 'Manage your professional information.',
    },
};
