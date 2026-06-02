import {
    AlertTriangle,
    CheckCircle2,
    Clock,
    FolderDown,
    Mail,
    ShieldAlert,
    ShieldCheck,
    ShieldOff,
    XOctagon,
} from 'lucide-react';
import type { ComplianceLogRecord } from './compliance-log-data';

const overallStatusStyles = {
    'Cleared for Sail': {
        wrapper: 'border-emerald-100 bg-emerald-50 text-emerald-700',
        dot: 'bg-emerald-500',
    },
    'Action Required': {
        wrapper: 'border-orange-100 bg-orange-50 text-orange-700',
        dot: 'bg-orange-500',
    },
    'Awaiting Docs': {
        wrapper: 'border-blue-100 bg-blue-50 text-blue-700',
        dot: 'bg-blue-500',
    },
    'Blocked / Void': {
        wrapper: 'border-red-100 bg-red-50 text-red-700',
        dot: 'bg-red-500',
    },
} as const;

function ComplianceDocuments({ record }: { record: ComplianceLogRecord }) {
    if (record.overallStatus === 'Blocked / Void') {
        return (
            <div className="space-y-2">
                <div className="flex items-center rounded-md border border-red-100 bg-red-50 p-1.5 text-xs font-medium text-red-600">
                    <XOctagon className="mr-2 h-4 w-4" />
                    Demise protocol broken
                </div>
                <p className="pl-6 text-xs text-slate-500">
                    Owner attempted to act as captain. System blocked transaction.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center text-xs text-slate-700">
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                Vessel Charter Agreement{' '}
                <span className="ml-1 font-medium text-emerald-600">
                    {record.charterAgreementStatus === 'Executed'
                        ? 'Executed'
                        : 'Pending'}
                </span>
            </div>

            {record.captainAgreementStatus === 'Pending Signature' ? (
                <div className="flex items-center rounded-md border border-blue-100 bg-blue-50 p-1 text-xs text-blue-800">
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    Pending captain signature
                </div>
            ) : (
                <div className="flex items-center text-xs text-slate-700">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                    Captain Hire Agreement{' '}
                    <span className="ml-1 font-medium text-emerald-600">
                        Executed
                    </span>
                </div>
            )}

            {record.insuranceStatus === 'Insurance Pending' ? (
                <div className="flex items-center rounded-md border border-orange-100 bg-orange-50 p-1 text-xs font-medium text-orange-800">
                    <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" />
                    Awaiting VQUIP purchase
                </div>
            ) : record.insuranceStatus === 'Pending Signature' ? (
                <div className="flex items-center text-xs text-slate-500 opacity-50">
                    <ShieldOff className="mr-2 h-4 w-4 text-slate-400" />
                    VQUIP policy locked
                </div>
            ) : (
                <div className="flex items-center text-xs text-slate-700">
                    <ShieldCheck className="mr-2 h-4 w-4 text-[#35ADD5]" />
                    VQUIP Policy Active{' '}
                    <span className="ml-1 text-slate-400">
                        {record.insurancePolicyCode}
                    </span>
                </div>
            )}
        </div>
    );
}

export function ComplianceLogRow({ record }: { record: ComplianceLogRecord }) {
    const overallStyle = overallStatusStyles[record.overallStatus];

    return (
        <tr
            className={`group transition-colors ${
                record.overallStatus === 'Action Required'
                    ? 'hover:bg-orange-50/20'
                    : record.overallStatus === 'Blocked / Void'
                      ? 'hover:bg-red-50/20'
                      : 'hover:bg-slate-50'
            }`}
        >
            <td className="px-6 py-4">
                <div className="flex flex-col">
                    <p
                        className={`font-semibold ${
                            record.overallStatus === 'Blocked / Void'
                                ? 'text-slate-700'
                                : 'text-[#35ADD5]'
                        }`}
                    >
                        ID: {record.charterCode}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                        {record.dateTime}
                    </p>
                    <p className="text-xs text-slate-500">
                        Duration: {record.duration}
                    </p>
                    <span
                        className={`mt-2 inline-flex w-max items-center rounded border px-2 py-0.5 text-[10px] font-medium ${
                            record.overallStatus === 'Blocked / Void'
                                ? 'border-red-100 bg-red-50 text-red-600'
                                : 'border-slate-200 bg-slate-100 text-slate-600'
                        }`}
                    >
                        Vessel: {record.vesselName}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="w-20 text-slate-500">Owner:</span>
                        <span className="font-medium text-slate-800">
                            {record.owner}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="w-20 text-slate-500">Charterer:</span>
                        <span className="font-medium text-slate-800">
                            {record.charterer}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="w-20 text-slate-500">Captain:</span>
                        {record.captainMissing ? (
                            <span className="inline-flex items-center font-medium text-red-600">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Missing
                            </span>
                        ) : (
                            <span className="font-medium text-[#35ADD5]">
                                {record.captain}
                            </span>
                        )}
                    </div>
                </div>
            </td>

            <td className="px-6 py-4">
                <ComplianceDocuments record={record} />
            </td>

            <td className="px-6 py-4">
                <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${overallStyle.wrapper}`}
                >
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${overallStyle.dot}`} />
                    {record.overallStatus}
                </span>
            </td>

            <td className="px-6 py-4 text-right">
                {record.overallStatus === 'Cleared for Sail' ? (
                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-[#e6ebf1] bg-white px-3 py-1.5 text-xs font-medium text-[#35ADD5] shadow-sm transition-colors hover:bg-slate-50"
                    >
                        <FolderDown className="mr-1.5 h-3.5 w-3.5" />
                        {record.actionLabel}
                    </button>
                ) : record.overallStatus === 'Action Required' ? (
                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-[#e6ebf1] bg-white px-3 py-1.5 text-xs font-medium text-[#35ADD5] shadow-sm transition-colors hover:bg-slate-50"
                    >
                        <Mail className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                        {record.actionLabel}
                    </button>
                ) : record.overallStatus === 'Awaiting Docs' ? (
                    <button
                        type="button"
                        className="rounded-lg bg-transparent px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#35ADD5]"
                    >
                        {record.actionLabel}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
                    >
                        {record.actionLabel}
                    </button>
                )}
            </td>
        </tr>
    );
}
