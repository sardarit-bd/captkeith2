import { MapPin } from 'lucide-react';
import { AdminSectionCard } from './admin-section-card';

interface AdminVesselsTableProps {
    vessels: Array<{
        id: string | number;
        name: string;
        type: string;
        owner_name: string;
        location: string;
        requires_deckhand: boolean;
    }>;
}

export default function AdminVesselsTable({ vessels }: AdminVesselsTableProps) {
    return (
        <AdminSectionCard
            title="Pending Vessel Listings"
            description="Yachts waiting for platform approval"
            actionLabel="View All"
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">Vessel Info</th>
                            <th className="px-6 py-4 font-medium">Owner</th>
                            <th className="px-6 py-4 font-medium">Location</th>
                            <th className="px-6 py-4 text-right font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {vessels.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <p className="font-medium text-[#35ADD5]">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {item.type}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {item.owner_name}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-xs text-slate-500">
                                        <MapPin className="mr-1 h-3 w-3" />
                                        {item.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        type="button"
                                        className="rounded-lg border border-[#e6ebf1] bg-white px-4 py-2 text-xs font-medium text-[#35ADD5] transition-colors hover:bg-slate-50"
                                    >
                                        Inspect
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {vessels.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-slate-500">
                                    No pending vessels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminSectionCard>
    );
}