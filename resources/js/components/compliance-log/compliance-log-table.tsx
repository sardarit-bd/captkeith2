import { complianceLogRecords } from './compliance-log-data';
import { ComplianceLogRow } from './compliance-log-row';

export function ComplianceLogTable() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e6ebf1] bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">
                                Charter Details
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Parties Involved
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Document Compliance Status
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Overall Status
                            </th>
                            <th className="px-6 py-4 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {complianceLogRecords.map((record) => (
                            <ComplianceLogRow key={record.id} record={record} />
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#e6ebf1] bg-slate-50 px-4 py-4 sm:flex-row sm:px-6">
                <p className="text-xs text-slate-500">
                    Showing <span className="font-medium text-slate-800">1</span>{' '}
                    to <span className="font-medium text-slate-800">4</span> of{' '}
                    <span className="font-medium text-slate-800">892</span>{' '}
                    charters
                </p>
                <div className="flex w-full items-center justify-between gap-2 text-sm sm:w-auto sm:justify-end">
                    <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-400"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="rounded-lg border border-[#e6ebf1] bg-white px-3 py-1.5 font-medium text-[#11395d] transition-colors hover:bg-slate-100"
                    >
                        Next
                    </button>
                </div>
            </footer>
        </section>
    );
}
