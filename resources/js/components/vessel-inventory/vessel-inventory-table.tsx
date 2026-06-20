import { router } from '@inertiajs/react';
import { VesselInventoryRow } from './vessel-inventory-row';

interface Vessel {
    id: string;
    name: string;
    vessel_type: string;
    length_ft?: number;
    is_active: boolean;
    official_number?: string;
    passenger_capacity?: number;
    requires_deckhand?: boolean;
    marina_name?: string;
    photo_url?: string;
    owner_profile?: {
        user: {
            name: string;
            initials?: string;
        };
    };
}


interface VesselPaginator {
    data: Vessel[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface AdminVesselsTableProps {
    vessels: VesselPaginator;
    filters: {
        search?: string;
        type?: string;
        status?: string;
    };
}

export default function VesselInventoryTable({ vessels, filters }: AdminVesselsTableProps) {
    const handlePageChange = (url: string | null) => {
        if (url) router.get(url, {}, { preserveState: true, preserveScroll: true });
    };
    
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-245 border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e6ebf1] bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">ID</th>
                            <th className="px-6 py-4 font-medium">Owner</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">length</th>
                            <th className="px-6 py-4 font-medium">capacity</th>
                            {/* <th className="px-6 py-4 font-medium">Compliance Specs</th> */}
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {vessels.data.length > 0 ? (
                            vessels.data.map((vessel, index) => (
                                <VesselInventoryRow key={vessel.id} vessel={vessel} index={index} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No vessels found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#e6ebf1] bg-slate-50 px-4 py-4 sm:flex-row sm:px-6">
                <p className="text-xs text-slate-500">
     
                    Showing <span className="font-medium text-slate-800">{vessels.from ?? 0}</span>
                    to <span className="font-medium text-slate-800">{vessels.to ?? 0}</span> of
                    <span className="font-medium text-slate-800">{vessels.total}</span>
                    vessels
                </p>
                <div className="flex w-full items-center justify-between gap-2 text-sm sm:w-auto sm:justify-end">
             
                    <button
                        type="button"
                        disabled={!vessels.prev_page_url}
                        onClick={() => handlePageChange(vessels.prev_page_url)}
                        className={`rounded-lg border px-3 py-1.5 transition-colors ${
                            !vessels.prev_page_url
                                ? 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
                                : 'border-[#e6ebf1] bg-white font-medium text-[#35ADD5] hover:bg-slate-100'
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={!vessels.next_page_url}
                        onClick={() => handlePageChange(vessels.next_page_url)}
                        className={`rounded-lg border px-3 py-1.5 transition-colors ${
                            !vessels.next_page_url
                                ? 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
                                : 'border-[#e6ebf1] bg-white font-medium text-[#35ADD5] hover:bg-slate-100'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </footer>
        </section>
    );
}