import { AdminComplianceLog } from './admin-compliance-log';
import { AdminStatsCards } from './admin-stats-cards';
import { AdminVerificationTable } from './admin-verification-table';
import { AdminVesselTable } from './admin-vessel-table';

export function AdminDashboard() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full space-y-8 py-4">
                    <AdminStatsCards />

                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                        <AdminVerificationTable />
                        <AdminVesselTable />
                    </div>

                    <AdminComplianceLog />
                </div>
            </div>
        </div>
    );
}
