import { MapPin } from 'lucide-react';
import { vesselQueueItems } from './admin-dashboard-data';
import { AdminSectionCard } from './admin-section-card';

export function AdminVesselTable() {
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
                            <th className="px-6 py-4 text-right font-medium">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {vesselQueueItems.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <p className="font-medium text-[#11395d]">
                                        {item.vesselName}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {item.spec}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-700">
                                    {item.ownerName}
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
                                        className="rounded-lg border border-[#e6ebf1] bg-white px-4 py-2 text-xs font-medium text-[#11395d] transition-colors hover:bg-slate-50"
                                    >
                                        Inspect
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminSectionCard>
    );
}
