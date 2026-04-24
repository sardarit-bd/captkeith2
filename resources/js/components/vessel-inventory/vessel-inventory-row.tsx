import {
    AlertTriangle,
    CheckCircle2,
    Edit3,
    Eye,
    LifeBuoy,
    MapPin,
    Minus,
} from 'lucide-react';
import type { VesselInventoryRecord } from './vessel-inventory-data';

const statusStyleMap = {
    Active: {
        wrapper: 'border-emerald-100 bg-emerald-50 text-emerald-700',
        dot: 'bg-emerald-500',
        label: 'Active',
    },
    'Pending Approval': {
        wrapper: 'border-orange-100 bg-orange-50 text-orange-700',
        dot: 'bg-orange-500',
        label: 'Pending Approval',
    },
    Flagged: {
        wrapper: 'border-red-100 bg-red-50 text-red-700',
        dot: 'bg-red-500',
        label: 'Flagged',
    },
} as const;

const vesselTypeStyleMap = {
    Power: 'border-slate-200 bg-slate-100 text-slate-600',
    Sail: 'border-blue-100 bg-blue-50 text-blue-700',
} as const;

export function VesselInventoryRow({ vessel }: { vessel: VesselInventoryRecord }) {
    const statusStyle = statusStyleMap[vessel.status];
    const typeStyle = vesselTypeStyleMap[vessel.vesselType];

    return (
        <tr
            className={`group transition-colors ${
                vessel.status === 'Pending Approval'
                    ? 'hover:bg-orange-50/30'
                    : vessel.status === 'Flagged'
                      ? 'hover:bg-red-50/20'
                      : 'hover:bg-slate-50'
            }`}
        >
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div
                        className={`mr-4 h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 ${
                            vessel.status === 'Flagged'
                                ? 'grayscale opacity-60'
                                : ''
                        }`}
                    >
                        <img
                            src={vessel.imageUrl}
                            alt={vessel.vesselName}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div>
                        <p
                            className={`text-base font-semibold ${
                                vessel.status === 'Flagged'
                                    ? 'text-slate-600'
                                    : 'text-[#11395d]'
                            }`}
                        >
                            {vessel.vesselName}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            <span
                                className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-medium uppercase ${typeStyle}`}
                            >
                                {vessel.vesselType}
                            </span>
                            <span
                                className={`text-xs ${
                                    vessel.status === 'Flagged'
                                        ? 'text-slate-400'
                                        : 'text-slate-500'
                                }`}
                            >
                                {vessel.length}
                            </span>
                        </div>
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <div
                    className={`mb-1 flex items-center ${
                        vessel.status === 'Flagged' ? 'opacity-75' : ''
                    }`}
                >
                    <span
                        className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                            vessel.status === 'Flagged'
                                ? 'bg-slate-200 text-slate-500'
                                : 'bg-[#35ADD5]/10 text-[#35ADD5]'
                        }`}
                    >
                        {vessel.ownerInitials}
                    </span>
                    <p
                        className={`text-sm font-medium ${
                            vessel.status === 'Flagged'
                                ? 'text-slate-600'
                                : 'text-slate-700'
                        }`}
                    >
                        {vessel.ownerName}
                    </p>
                </div>
                <p
                    className={`mt-1 flex items-center text-xs ${
                        vessel.status === 'Flagged'
                            ? 'text-slate-400'
                            : 'text-slate-500'
                    }`}
                >
                    <MapPin className="mr-1 h-3 w-3" />
                    {vessel.location}
                </p>
            </td>

            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle.wrapper}`}
                >
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    {statusStyle.label}
                </span>
            </td>

            <td className="px-6 py-4">
                {vessel.status === 'Flagged' ? (
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-red-600">
                            {vessel.issueSummary}
                        </p>
                        <p className="text-xs text-slate-500">
                            {vessel.issueDetail}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        <p className="text-xs text-slate-600">
                            <span className="font-medium text-slate-800">
                                Off. No:
                            </span>{' '}
                            {vessel.officialNumber ?? (
                                <span className="text-orange-600">
                                    Unverified
                                </span>
                            )}
                        </p>
                        <p className="text-xs text-slate-600">
                            <span className="font-medium text-slate-800">
                                Capacity:
                            </span>{' '}
                            {vessel.capacity}
                        </p>
                        <p
                            className={`inline-flex items-center text-xs font-medium ${
                                vessel.deckhandRequired
                                    ? 'w-fit rounded bg-blue-50 px-1.5 py-0.5 text-[#35ADD5]'
                                    : vessel.status === 'Pending Approval'
                                      ? 'text-slate-500'
                                      : 'text-emerald-600'
                            }`}
                        >
                            {vessel.deckhandRequired ? (
                                <LifeBuoy className="mr-1 h-3 w-3" />
                            ) : vessel.status === 'Pending Approval' ? (
                                <Minus className="mr-1 h-3 w-3" />
                            ) : (
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                            )}
                            {vessel.deckhandRequired
                                ? 'Deckhand Required'
                                : 'No Deckhand Req.'}
                        </p>
                    </div>
                )}
            </td>

            <td className="px-6 py-4 text-right">
                {vessel.status === 'Pending Approval' ? (
                    <button
                        type="button"
                        className="rounded-lg bg-[#11395d] px-4 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
                    >
                        Review Listing
                    </button>
                ) : vessel.status === 'Flagged' ? (
                    <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        <span className="inline-flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            View Issue
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="button"
                            title="View Details"
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#35ADD5]"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            title="Edit Compliance"
                            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#11395d]"
                        >
                            <Edit3 className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
