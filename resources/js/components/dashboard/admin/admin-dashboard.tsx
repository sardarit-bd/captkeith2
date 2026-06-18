// resources/js/components/dashboard/admin/admin-dashboard.tsx
import {AdminStatsCards} from './admin-stats-cards';
import {AdminVerificationTable }from './admin-verification-table';
import AdminVesselsTable from './admin-vessels-table';
import { AdminComplianceLog } from './admin-compliance-log';

interface AdminDashboardProps {
    data?: { // Make data optional with '?'
        stats: Record<string, number>;
        pending_verifications: Array<any>;
        pending_vessels: Array<any>;
        compliance_events: Array<any>;
    };
}

export function AdminDashboard({ data }: AdminDashboardProps) {
    // Provide fallbacks to prevent "undefined" errors
    const stats = data?.stats ?? {};
    const verifications = data?.pending_verifications ?? [];
    const vessels = data?.pending_vessels ?? [];
    const events = data?.compliance_events ?? [];

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full space-y-8 py-4">
                    <AdminStatsCards stats={stats} />

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                        <AdminVerificationTable verifications={verifications} />
                        <AdminVesselsTable vessels={vessels} />
                    </div>

                    <AdminComplianceLog events={events} />
                </div>
            </div>
        </div>
    );
}