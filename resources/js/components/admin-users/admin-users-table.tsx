import { Eye, Pencil, Trash2 } from 'lucide-react';

interface AdminUsersTableProps {
    users: Array<{
        id: string | number;
        name: string;
        email: string;
        avatar?: string | null;
        initials: string;
        role: string;
        status: string;
        key_details: string[];
        joined: string;
    }>;
    total: number;
    perPage: number;
    onPerPageChange: (value: number) => void;
}

const roleColors: Record<string, string> = {
    Captain: 'bg-blue-50 text-blue-700 border-blue-200',
    Owner: 'bg-purple-50 text-purple-700 border-purple-200',
    Deckhand: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Charterer: 'bg-orange-50 text-orange-700 border-orange-200',
};

const statusColors: Record<string, string> = {
    Verified: 'text-emerald-600',
    Active: 'text-emerald-600',
    'Pending Review': 'text-orange-600',
    Suspended: 'text-red-600',
};

export function AdminUsersTable({ users, total, perPage, onPerPageChange }: AdminUsersTableProps) {
    return (
        <div className="rounded-2xl border border-[#e6ebf1] bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">User Information</th>
                            <th className="px-6 py-4 font-medium">Platform Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Key Details</th>
                            <th className="px-6 py-4 font-medium">Joined</th>
                            <th className="px-6 py-4 text-right font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {users.map((user) => (
                            <tr key={user.id} className="transition-colors hover:bg-slate-50/50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                                                {user.initials}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-[#35ADD5]">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${roleColors[user.role] || 'bg-slate-100 text-slate-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-1.5 text-xs font-medium ${statusColors[user.status] || 'text-slate-600'}`}>
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-0.5">
                                        {user.key_details.map((detail, i) => (
                                            <p key={i} className={`text-xs ${i === 0 ? 'font-medium text-slate-700' : 'text-slate-500'}`}>
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">{user.joined}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#35ADD5]">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#35ADD5]">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No users found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <p className="text-sm text-slate-600">
                    Showing <span className="font-medium">{users.length > 0 ? 1 : 0}</span> to{' '}
                    <span className="font-medium">{users.length}</span> of{' '}
                    <span className="font-medium">{total}</span> results
                </p>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Rows per page</span>
                        <select
                            value={perPage}
                            onChange={(e) => onPerPageChange(Number(e.target.value))}
                            className="rounded-lg border border-slate-200 px-2 py-1 text-sm focus:border-[#35ADD5] focus:outline-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-2">
                        <button disabled className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400 cursor-not-allowed">
                            Previous
                        </button>
                        <button className="rounded-lg border border-[#35ADD5] px-4 py-2 text-sm font-medium text-[#35ADD5] hover:bg-[#35ADD5] hover:text-white transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}