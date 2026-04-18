import { Head } from '@inertiajs/react';
import { DashboardRoleView } from '@/components/dashboard/dashboard-role-view';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <DashboardRoleView />
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
    pageHeader: {
        title: 'Dashboard Overview',
        description: "Welcome back! Here's an overview of your current activities.",
    },
};
