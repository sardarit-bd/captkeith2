import { CheckCircle, Ship, XCircle } from 'lucide-react';
import { yachtDetailsData } from './yacht-details-data';

export function YachtDetailsHeader() {
    return (
        <header className="relative z-10 flex flex-col justify-between gap-4 border-b border-[#f1f5f9] bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3b82f6] sm:flex">
                    <Ship className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-[20px] leading-tight font-bold text-[#111827]">
                        {yachtDetailsData.yachtName}
                    </h2>
                    <p className="mt-0.5 text-[13px] text-[#6b7280]">
                        {yachtDetailsData.schedule}
                    </p>
                </div>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
                <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] sm:flex-none"
                >
                    <XCircle className="h-4 w-4" />
                    Decline Charter
                </button>
                <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0a273f] px-4 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#123651] sm:flex-none"
                >
                    <CheckCircle className="h-4 w-4" />
                    Accept Charter
                </button>
            </div>
        </header>
    );
}
