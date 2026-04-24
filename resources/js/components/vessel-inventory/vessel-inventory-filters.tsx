import { ChevronDown, Plus, Search, Ship } from 'lucide-react';
import {
    vesselStatusFilters,
    vesselTypeFilters,
} from './vessel-inventory-data';

export function VesselInventoryFilters() {
    return (
        <section className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-[#e6ebf1] bg-white p-4 shadow-sm xl:flex-row xl:items-center">
            <div className="relative w-full xl:w-96">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by vessel name, official number..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                />
            </div>

            <div className="flex w-full flex-wrap items-center gap-3 xl:w-auto">
                <label className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:flex-none">
                    <span className="flex items-center gap-2">
                        <Ship className="h-4 w-4" />
                        <select className="cursor-pointer bg-transparent font-medium focus:outline-none">
                            {vesselTypeFilters.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </span>
                    <ChevronDown className="h-3 w-3 text-slate-400 sm:hidden" />
                </label>

                <label className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:flex-none">
                    <select className="cursor-pointer bg-transparent font-medium focus:outline-none">
                        {vesselStatusFilters.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                    <ChevronDown className="h-3 w-3 text-slate-400 sm:hidden" />
                </label>

                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#11395d] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Add Vessel
                </button>
            </div>
        </section>
    );
}
