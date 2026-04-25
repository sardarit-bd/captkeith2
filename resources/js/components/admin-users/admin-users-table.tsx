import {
    AlertCircle,
    Anchor,
    CreditCard,
    Eye,
    FileText,
    LifeBuoy,
    Navigation,
    PencilLine,
    Trash2,
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { adminUsers } from './admin-users-data';
import type {
    AdminUserRecord,
    AdminUserRole,
    AdminUserStatus,
} from './admin-users-data';

const roleBadgeMap: Record<
    AdminUserRole,
    { className: string; Icon: typeof Navigation }
> = {
    Captain: {
        className: 'bg-blue-50 text-blue-700 border-blue-100',
        Icon: Navigation,
    },
    Owner: {
        className: 'bg-slate-100 text-slate-700 border-slate-200',
        Icon: Anchor,
    },
    Deckhand: {
        className: 'bg-purple-50 text-purple-700 border-purple-100',
        Icon: LifeBuoy,
    },
    Charterer: {
        className: 'bg-teal-50 text-teal-700 border-teal-100',
        Icon: CreditCard,
    },
};

const statusMap: Record<
    AdminUserStatus,
    {
        wrapperClass: string;
        dotClass: string;
    }
> = {
    Verified: {
        wrapperClass: 'text-emerald-600',
        dotClass: 'bg-emerald-500',
    },
    Active: {
        wrapperClass: 'text-emerald-600',
        dotClass: 'bg-emerald-500',
    },
    'Pending Review': {
        wrapperClass: 'rounded-full bg-orange-50 px-2.5 py-1 text-orange-600',
        dotClass: 'bg-orange-500',
    },
    Suspended: {
        wrapperClass: 'text-red-600',
        dotClass: 'bg-red-500',
    },
};

const rowsPerPageOptions = [10, 25, 50, 100];

function RowAction({ user }: { user: AdminUserRecord }) {
    return (
        <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
            <button
                type="button"
                title={`View ${user.name}`}
                aria-label={`View ${user.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#1d4f73] transition-all hover:bg-[#eaf6fb] hover:text-[#11395d] focus-visible:ring-2 focus-visible:ring-[#35ADD5]/40 focus-visible:outline-none"
            >
                <Eye className="h-4 w-4" />
            </button>

            <button
                type="button"
                title={`Edit ${user.name}`}
                aria-label={`Edit ${user.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:outline-none"
            >
                <PencilLine className="h-4 w-4" />
            </button>

            <button
                type="button"
                title={`Delete ${user.name}`}
                aria-label={`Delete ${user.name}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-all hover:bg-red-50 hover:text-red-700 focus-visible:ring-2 focus-visible:ring-red-200 focus-visible:outline-none"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

function UserAvatar({ user }: { user: AdminUserRecord }) {
    if (user.avatarUrl) {
        return (
            <img
                src={user.avatarUrl}
                alt={user.name}
                className="mr-3 h-10 w-10 rounded-full border border-slate-200 object-cover"
            />
        );
    }

    return (
        <span className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-sm font-bold text-slate-600">
            {user.initials ?? 'U'}
        </span>
    );
}

export function AdminUsersTable() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#e6ebf1] bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">
                                User Information
                            </th>
                            <th className="px-6 py-4 font-medium">
                                Platform Role
                            </th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">
                                Key Details
                            </th>
                            <th className="px-6 py-4 font-medium">Joined</th>
                            <th className="px-6 py-4 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {adminUsers.map((user) => {
                            const roleConfig = roleBadgeMap[user.role];
                            const statusConfig = statusMap[user.status];

                            return (
                                <tr
                                    key={user.id}
                                    className={`group transition-colors ${
                                        user.status === 'Pending Review'
                                            ? 'hover:bg-orange-50/30'
                                            : user.status === 'Suspended'
                                              ? 'hover:bg-red-50/30'
                                              : 'hover:bg-slate-50'
                                    }`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <UserAvatar user={user} />
                                            <div>
                                                <p className="font-medium text-[#11395d]">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${roleConfig.className}`}
                                        >
                                            <roleConfig.Icon className="mr-1.5 h-3 w-3" />
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center text-xs font-medium ${statusConfig.wrapperClass}`}
                                        >
                                            <span
                                                className={`mr-2 h-1.5 w-1.5 rounded-full ${statusConfig.dotClass}`}
                                            />
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="flex items-center text-xs font-medium text-[#11395d]">
                                            {user.status === 'Pending Review' ? (
                                                <FileText className="mr-1 h-3 w-3 text-orange-500" />
                                            ) : null}
                                            {user.status === 'Suspended' ? (
                                                <AlertCircle className="mr-1 h-3 w-3 text-red-500" />
                                            ) : null}
                                            {user.detailPrimary}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {user.detailSecondary}
                                        </p>
                                    </td>

                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {user.joinedOn}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <RowAction user={user} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <footer className="border-t border-[#e6ebf1] bg-slate-50 px-6 py-4">
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3 sm:items-center">
                    <p className="text-center text-xs text-slate-500 sm:text-left">
                        Showing{' '}
                        <span className="font-medium text-slate-800">1</span> to{' '}
                        <span className="font-medium text-slate-800">5</span> of{' '}
                        <span className="font-medium text-slate-800">842</span>{' '}
                        results
                    </p>

                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)]">
                            <span className="text-xs font-medium whitespace-nowrap text-slate-600">
                                Rows per page
                            </span>
                            <Select defaultValue={String(rowsPerPageOptions[0])}>
                                <SelectTrigger className="h-8 w-[4.75rem] border-slate-200 bg-slate-50 text-xs font-semibold text-[#11395d] shadow-none focus-visible:ring-[#35ADD5]/35">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent
                                    side="top"
                                    align="center"
                                    sideOffset={8}
                                >
                                    {rowsPerPageOptions.map((option) => (
                                        <SelectItem
                                            key={option}
                                            value={String(option)}
                                        >
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm sm:justify-end">
                        <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-lg border border-slate-200 bg-white px-3 py-1 text-slate-400"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="rounded-lg border border-[#e6ebf1] bg-white px-3 py-1 font-medium text-[#11395d] transition-colors hover:bg-slate-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </footer>
        </section>
    );
}
