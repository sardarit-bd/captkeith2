import { usePage } from '@inertiajs/react';
import { OwnerDashboard } from '@/components/dashboard/owner/owner-dashboard';

type DashboardRole = 'owner' | 'captain' | 'deckhand' | 'charterer' | 'admin' | 'unknown';

type DashboardPageProps = {
    dashboard?: {
        role?: DashboardRole;
    };
};

function DashboardUnavailable({ role }: { role: DashboardRole }) {
    const roleLabel = role === 'unknown' ? 'your role' : role;

    return (
        <div className="flex h-full flex-1 items-center justify-center bg-[#F6FDFF] p-5">
            <section className="w-full max-w-xl rounded-2xl border border-[#d4dbe3] bg-white p-6 text-center">
                <h2 className="text-xl font-semibold text-[#0f172a]">
                    Dashboard under development
                </h2>
                <p className="mt-2 text-sm text-[#4A5565]">
                    The {roleLabel} dashboard is being prepared.
                </p>
            </section>
        </div>
    );
}

export function DashboardRoleView() {
    const page = usePage<DashboardPageProps>();
    const role = page.props.dashboard?.role ?? 'unknown';

    if (role === 'owner' || role === 'admin') {
        return <OwnerDashboard />;
    }

    return <DashboardUnavailable role={role} />;
}
