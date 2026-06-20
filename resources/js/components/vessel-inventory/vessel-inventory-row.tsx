import {
    AlertTriangle,
    CheckCircle2,
    Edit3,
    Eye,
    LifeBuoy,
    MapPin,
    Minus,
    Trash2,
} from 'lucide-react';
import type { VesselInventoryRecord } from './vessel-inventory-data';

const statusStyleMap: Record<string, { wrapper: string; dot: string; label: string }> = {
    Active: { wrapper: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Active' },
    'Pending Approval': { wrapper: 'text-orange-700', dot: 'bg-orange-500', label: 'Pending Approval' },
    Flagged: { wrapper: 'text-red-700', dot: 'bg-red-500', label: 'Flagged' },
    active: { wrapper: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Active' },
    pending_approval: { wrapper: 'text-orange-700', dot: 'bg-orange-500', label: 'Pending Approval' },
    pending: { wrapper: 'text-orange-700', dot: 'bg-orange-500', label: 'Pending Approval' },
    flagged: { wrapper: 'text-red-700', dot: 'bg-red-500', label: 'Flagged' },
};

const defaultStyle = {
    wrapper: 'text-slate-700',
    dot: 'bg-slate-500',
    label: 'Unknown',
};

const vesselTypeStyleMap: Record<string, string> = {
    Power: 'border-slate-200 bg-slate-50 text-slate-600',
    Sail: 'border-blue-100 bg-blue-50 text-blue-700',
    power: 'border-slate-200 bg-slate-50 text-slate-600',
    sail: 'border-blue-100 bg-blue-50 text-blue-700',
    sailing: 'border-blue-100 bg-blue-50 text-blue-700',
};

const roleStyleMap: Record<string, string> = {
    Captain: 'border-blue-100 bg-blue-50 text-blue-700',
    Owner: 'border-purple-100 bg-purple-50 text-purple-700',
    User: 'border-slate-200 bg-slate-50 text-slate-600',
};

export function VesselInventoryRow({ vessel , index }: { vessel: VesselInventoryRecord  ,  index: number }) {
    const statusStyle = statusStyleMap[vessel.status] || defaultStyle;
    const typeStyle = vesselTypeStyleMap[vessel.vesselType] || 'border-slate-200 bg-slate-50 text-slate-600';
    const ownerRole = vessel.owner_profile?.user?.role || 'Owner';
    const roleStyle = roleStyleMap[ownerRole] || 'border-slate-200 bg-slate-50 text-slate-600';

    const isPending = vessel.status?.toLowerCase().includes('pending');
    const isFlagged = vessel.status?.toLowerCase() === 'flagged';
    const rowHoverClass = isPending
        ? 'hover:bg-orange-50/30'
        : isFlagged
        ? 'hover:bg-red-50/20'
        : 'hover:bg-slate-50';

    // Generate initials from owner name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const ownerInitials = vessel.owner_profile?.user?.name
        ? getInitials(vessel.owner_profile.user.name)
        : 'OW';

    return (
        <tr className={`group border-b border-slate-100 transition-colors ${rowHoverClass}`}>
            {/* ID Column */}
            <td className="px-6 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                    {index + 1}
                </div>
            </td>

            {/* Vessel Name & Owner Column */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                        {ownerInitials}
                    </div>
                    <div>
                        {/* <p className={`text-sm font-medium ${isFlagged ? 'text-slate-600' : 'text-[#35ADD5]'}`}>
                            {vessel.vesselName}
                        </p> */}
                        <p className={`text-xs ${isFlagged ? 'text-slate-400' : 'text-slate-500'}`}>
                            {vessel.owner_profile?.full_name || 'Unknown Owner'}
                        </p>
                    </div>
                </div>
            </td>

            {/* Email / Official Number Column */}
            <td className="px-6 py-4">
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                    {vessel.official_number || 'Unverified'}
                </span>
            </td>

            {/* Platform Role / Vessel Type Column */}
            {/* <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${typeStyle}`}
                >
                    {vessel.vesselType}
                </span>
            </td> */}

            {/* Status Column */}
            {/* <td className="px-6 py-4">
                <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    <span className={`text-sm ${statusStyle.wrapper}`}>{statusStyle.label}</span>
                </div>
            </td> */}

            {/* Joined / Capacity Column */}
             <td className="px-6 py-4">
                <div className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                        {/* <span className="text-slate-500">Length:</span> */}
                        <span className="font-medium">{vessel.length_ft || "unknown"} </span>
                    </div>
                </div>
             </td>
            <td className="px-6 py-4">
                <div className="text-sm text-slate-600">
                    {/* <div className="flex items-center gap-1">
                        <span className="text-slate-500">Length:</span>
                        <span className="font-medium">{vessel.length}</span>
                    </div> */}
                    <div className="flex items-center gap-1">
                        {/* <span className="text-slate-500">Capacity:</span> */}
                        <span className="font-medium">{vessel.passenger_capacity || "unknown"}</span>
                    </div>
                </div>
            </td>

            {/* Actions Column */}
            <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-1">
                    {isPending ? (
                        <button
                            type="button"
                            className="rounded-lg bg-[#35ADD5] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                        >
                            Review
                        </button>
                    ) : isFlagged ? (
                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                            title="View Issue"
                        >
                            <AlertTriangle className="h-3.5 w-3.5" />
                        </button>
                    ) : (
                        <>
                            <button
                                type="button"
                                title="View Details"
                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#35ADD5]"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                title="Edit Vessel"
                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#35ADD5]"
                            >
                                <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                title="Delete Vessel"
                                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}