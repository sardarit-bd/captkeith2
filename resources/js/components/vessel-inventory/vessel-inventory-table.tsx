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

interface Props {
    vessels?: {
        data: Vessel[];
        meta: {
            from: number;
            to: number;
            total: number;
            per_page: number;
            current_page: number;
            last_page: number;
        };
        links: {
            prev: string | null;
            next: string | null;
        };
    };
}

export function VesselInventoryTable({ vessels }: Props) {
    // Defensive check: if vessels is undefined, show empty state
    if (!vessels || !vessels.data) {
        return (
            <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
                <div className="px-6 py-12 text-center text-slate-500">
                    Loading vessel data...
                </div>
            </section>
        );
    }

    const handlePageChange = (url: string | null) => {
        if (url) router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e6ebf1] bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">Vessel Profile</th>
                            <th className="px-6 py-4 font-medium">Owner &amp; Location</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Compliance Specs</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {vessels.data.length > 0 ? (
                            vessels.data.map((vessel) => (
                                <VesselInventoryRow key={vessel.id} vessel={vessel} />
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
                    Showing <span className="font-medium text-slate-800">{vessels.meta.from}</span>{' '}
                    to <span className="font-medium text-slate-800">{vessels.meta.to}</span> of{' '}
                    <span className="font-medium text-slate-800">{vessels.meta.total}</span>{' '}
                    vessels
                </p>
                <div className="flex w-full items-center justify-between gap-2 text-sm sm:w-auto sm:justify-end">
                    <button
                        type="button"
                        disabled={!vessels.links.prev}
                        onClick={() => handlePageChange(vessels.links.prev)}
                        className={`rounded-lg border px-3 py-1.5 transition-colors ${
                            !vessels.links.prev
                                ? 'cursor-not-allowed border-slate-200 bg-white text-slate-400'
                                : 'border-[#e6ebf1] bg-white font-medium text-[#35ADD5] hover:bg-slate-100'
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        disabled={!vessels.links.next}
                        onClick={() => handlePageChange(vessels.links.next)}
                        className={`rounded-lg border px-3 py-1.5 transition-colors ${
                            !vessels.links.next
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