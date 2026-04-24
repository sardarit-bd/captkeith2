import { Head } from '@inertiajs/react';
import { AdminProfilePageContent } from '@/components/admin-profile/admin-profile-page-content';
import { adminMyProfile } from '@/routes';

export default function AdminMyProfilePage() {
    return (
        <>
            <Head title="My Profile" />
            <AdminProfilePageContent />
        </>
    );
}

AdminMyProfilePage.layout = {
    breadcrumbs: [
        {
            title: 'My Profile',
            href: adminMyProfile(),
        },
    ],
    pageHeader: {
        title: 'My Profile',
        description: 'Manage your personal information and security preferences.',
    },
};
