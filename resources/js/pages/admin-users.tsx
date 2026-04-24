import { Head } from '@inertiajs/react';
import { AdminUsersPageContent } from '@/components/admin-users/admin-users-page-content';
import { adminUsers } from '@/routes';

export default function AdminUsersPage() {
    return (
        <>
            <Head title="Users Directory" />
            <AdminUsersPageContent />
        </>
    );
}

AdminUsersPage.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: adminUsers(),
        },
    ],
    pageHeader: {
        title: 'Users Directory',
        description: 'Manage platform users, roles, and compliance status.',
    },
};
