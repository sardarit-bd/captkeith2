import { Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

export function CharterersInviteActions() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <button
                type="button"
                className="rounded-lg bg-[#35ADD5] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
            >
                View Charter Page
            </button>

            <Link
                href={dashboard()}
                prefetch
                className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
            >
                Back to Dashboard
            </Link>
        </div>
    );
}
