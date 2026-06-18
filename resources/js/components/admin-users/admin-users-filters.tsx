import { Search, Filter, Download } from 'lucide-react';

interface AdminUsersFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    role: string;
    onRoleChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    roles?: string[]; // Make optional with '?'
    statuses?: string[]; // Make optional with '?'
    total: number;
}

export function AdminUsersFilters({
    search,
    onSearchChange,
    role,
    onRoleChange,
    status,
    onStatusChange,
    roles = [], // Default to empty array
    statuses = [], // Default to empty array
    total,
}: AdminUsersFiltersProps) {
    return (
        <div className="rounded-2xl border border-[#e6ebf1] bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users by name, email, or ID..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-[#35ADD5] focus:outline-none focus:ring-1 focus:ring-[#35ADD5]"
                    />
                </div>

                {/* Filters & Export */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <select
                            value={role}
                            onChange={(e) => onRoleChange(e.target.value)}
                            className="bg-transparent text-sm text-slate-700 focus:outline-none"
                        >
                            <option value="all">All Roles</option>
                            {roles.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                        <select
                            value={status}
                            onChange={(e) => onStatusChange(e.target.value)}
                            className="bg-transparent text-sm text-slate-700 focus:outline-none"
                        >
                            <option value="all">All Statuses</option>
                            {statuses.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <button className="flex items-center gap-2 rounded-lg border border-[#35ADD5] px-4 py-2 text-sm font-medium text-[#35ADD5] transition-colors hover:bg-[#35ADD5] hover:text-white">
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>
                </div>
            </div>
            
            <div className="mt-3 text-xs text-slate-500">
                Showing results for {total} total users
            </div>
        </div>
    );
}