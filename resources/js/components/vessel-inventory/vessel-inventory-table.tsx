import { vesselInventoryRecords } from './vessel-inventory-data';
import { VesselInventoryRow } from './vessel-inventory-row';

export function VesselInventoryTable() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e6ebf1] bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">
                                Vessel Profile
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Owner &amp; Location
                            </th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">
                                Compliance Specs
                            </th>
                            <th className="px-6 py-4 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {vesselInventoryRecords.map((vessel) => (
                            <VesselInventoryRow key={vessel.id} vessel={vessel} />
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#e6ebf1] bg-slate-50 px-4 py-4 sm:flex-row sm:px-6">
                <p className="text-xs text-slate-500">
                    Showing <span className="font-medium text-slate-800">1</span>{' '}
                    to <span className="font-medium text-slate-800">4</span> of{' '}
                    <span className="font-medium text-slate-800">112</span>{' '}
                    vessels
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
