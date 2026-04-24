import { ComplianceLogFilters } from './compliance-log-filters';
import { ComplianceLogStats } from './compliance-log-stats';
import { ComplianceLogTable } from './compliance-log-table';

export function ComplianceLogPageContent() {
    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full py-4">
                    <ComplianceLogStats />
                    <ComplianceLogFilters />
                    <ComplianceLogTable />
                </div>
            </div>
        </div>
    );
}
