import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AdminDashboard } from '@/components/dashboard/admin/admin-dashboard';
import { PageProps } from '@/types';

// Define the shape of the data coming from the backend
interface DashboardPageProps extends PageProps {
    dashboardData: {
        stats: Record<string, number>;
        pending_verifications: Array<any>;
        pending_vessels: Array<any>;
        compliance_events: Array<any>;
    };
}

export default function Dashboard({ dashboardData }: DashboardPageProps) {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            {/* Pass the dynamic data here */}
            <AdminDashboard data={dashboardData} />
        </AppLayout>
    );
}