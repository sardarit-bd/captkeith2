import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { AdminDashboard } from '@/components/dashboard/admin/admin-dashboard';
import { PageProps } from '@/types';

interface DashboardPageProps extends PageProps {
    dashboard: {
        role: string;
    };
    dashboardData: {
        stats: Record<string, number>;
        pending_verifications: Array<any>;
        pending_vessels: Array<any>;
        compliance_events: Array<any>;
    };
}

export default function Dashboard(props: DashboardPageProps) {
    // Debug: Check what we actually receive
    console.log('Full props object:', props);
    console.log('dashboardData:', props.dashboardData);
    console.log('dashboard:', props.dashboard);
    
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <AdminDashboard data={props} />
            
        </AppLayout>
    );
}