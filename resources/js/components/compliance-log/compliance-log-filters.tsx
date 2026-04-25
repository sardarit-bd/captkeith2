import { Calendar, Download, Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    complianceStatusFilters,
    complianceWindowFilters,
} from './compliance-log-data';

export function ComplianceLogFilters() {
    return (
        <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#e6ebf1] bg-white p-4 shadow-sm xl:flex-row xl:items-center">
            <div className="relative w-full xl:w-96">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search charter ID, vessel, or user..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                />
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto">
                <div className="flex flex-1 items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600 sm:flex-none">
                    <Calendar className="ml-3 h-4 w-4 shrink-0" />
                    <Select defaultValue={complianceWindowFilters[0]}>
                        <SelectTrigger className="h-10 w-full min-w-[11rem] border-0 bg-transparent font-medium text-slate-600 shadow-none focus-visible:ring-0 sm:w-[11rem]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="start" sideOffset={6}>
                            {complianceWindowFilters.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Select defaultValue={complianceStatusFilters[0]}>
                    <SelectTrigger className="h-10 w-full min-w-[11rem] rounded-lg border-slate-200 bg-slate-50 font-medium text-slate-600 shadow-none focus-visible:ring-0 sm:w-[11rem]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={6}>
                        {complianceStatusFilters.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#e6ebf1] bg-white px-4 py-2 text-sm font-medium text-[#11395d] shadow-sm transition-colors hover:bg-slate-50 sm:w-auto"
                >
                    <Download className="h-4 w-4" />
                    Export Ledger
                </button>
            </div>
        </section>
    );
}
