import { AdminSectionCard } from './admin-section-card';

interface AdminVerificationTableProps {
    verifications: Array<{
        id: string | number;
        user_name: string;
        user_role: string;
        document_type: string;
        submitted_at: string;
        initials: string;
    }>;
}

const badgeToneClass = {
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700',
    orange: 'bg-orange-50 text-orange-700', // Added for variety
};

export function AdminVerificationTable({ verifications }: AdminVerificationTableProps) {
    return (
        <AdminSectionCard
            title="Credential Verifications"
            description="Captains and deckhands awaiting license review"
            actionLabel="View All"
        >
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                        <tr className="bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Document Type</th>
                            <th className="px-6 py-4 font-medium">Submitted</th>
                            <th className="px-6 py-4 text-right font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {verifications.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors hover:bg-slate-50"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                                            {item.initials}
                                        </span>
                                        <div>
                                            <p className="font-medium text-[#35ADD5]">
                                                {item.user_name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {item.user_role}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeToneClass.blue}`}>
                                        {item.document_type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-xs text-slate-500">
                                    {item.submitted_at}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        type="button"
                                        className="rounded-lg bg-[#35ADD5] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0f2e49]"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {verifications.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-slate-500">
                                    No pending verifications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminSectionCard>
    );
}