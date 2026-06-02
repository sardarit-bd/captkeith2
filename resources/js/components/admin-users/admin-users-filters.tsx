import { Download, Filter, Search } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-600">
                    <Filter className="ml-3 h-4 w-4" />
                    <Select defaultValue={adminUserRoleFilters[0]}>
                        <SelectTrigger className="h-10 w-[11rem] border-0 bg-transparent shadow-none focus-visible:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="bottom" align="start" sideOffset={6}>
                            {adminUserRoleFilters.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Select defaultValue={adminUserStatusFilters[0]}>
                    <SelectTrigger className="h-10 w-[11rem] rounded-lg border-slate-200 bg-slate-50 font-medium text-slate-600 shadow-none focus-visible:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={6}>
                        {adminUserStatusFilters.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e6ebf1] bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-[#35ADD5] transition-colors hover:bg-slate-50"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </button>
            </div>
        </section>
    );
}
