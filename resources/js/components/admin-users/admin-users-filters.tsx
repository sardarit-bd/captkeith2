import { Download, Filter, Search } from 'lucide-react';
import {
    adminUserRoleFilters,
    adminUserStatusFilters,
} from './admin-users-data';

export function AdminUsersFilters() {
    return (
        <section className="mb-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e6ebf1] bg-white p-4 shadow-sm lg:flex-row">
            <div className="relative w-full lg:w-96">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search users by name, email, or ID..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-4 pl-10 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                />
            </div>

            <div className="flex w-full items-center gap-3 overflow-x-auto pb-1 lg:w-auto lg:pb-0">
                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <Filter className="h-4 w-4" />
                    <select className="cursor-pointer bg-transparent font-medium focus:outline-none">
                        {adminUserRoleFilters.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <select className="cursor-pointer bg-transparent font-medium focus:outline-none">
                        {adminUserStatusFilters.map((option) => (
                            <option key={option}>{option}</option>
                        ))}
                    </select>
                </label>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e6ebf1] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-[#11395d] transition-colors hover:bg-slate-50"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>
        </section>
    );
}
