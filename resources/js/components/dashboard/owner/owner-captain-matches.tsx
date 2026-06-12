import { usePage, Link } from '@inertiajs/react';
import { UserRoundCheck } from 'lucide-react';
import { captains } from '@/routes';
import type { OwnerDashboardProps } from '@/types';
import { OWNER_ACCENT } from './owner-dashboard-data';

type DashboardPageProps = {
    dashboard?: OwnerDashboardProps;
};

export function OwnerCaptainMatches() {
    const { props } = usePage<DashboardPageProps>();
    const matches = props.dashboard?.captain_matches ?? [];

    return (
        <section className="flex h-full flex-col justify-between gap-2 rounded-2xl border border-[#d4dbe3] bg-white p-4">
            <div>
                <h3 className="text-[17px] font-semibold text-[#0f172a]">
                    Matched Captains
                </h3>

                <p className="text-[13px] text-[#6b7280]">
                    Top qualified captains for your yachts
                </p>
            </div>
            <div className="mt-4 space-y-4">
                {matches.length === 0 ? (
                    <p className="py-4 text-center text-[13px] text-[#9ca3af]">
                        No captain matches yet.
                    </p>
                ) : (
                    matches.map((match) => (
                        <div
                            key={match.id}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3">
                                {match.photo_url ? (
                                    <img
                                        src={match.photo_url}
                                        alt={match.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF]">
                                        <UserRoundCheck className="h-6 w-6 text-[#2563eb]" />
                                    </span>
                                )}
                                <div>
                                    <p className="text-[13px] font-semibold text-[#111827]">
                                        {match.name}
                                    </p>
                                    <p className="text-[12.5px] text-[#6b7280]">
                                        {match.spec}
                                    </p>
                                </div>
                            </div>

                            <span
                                className="rounded-full px-3 py-1 text-[11px] font-medium"
                                style={{
                                    backgroundColor: '#e8f5ee',
                                    color: OWNER_ACCENT,
                                }}
                            >
                                {match.match}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <Link
                href={captains()}
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#35ADD5] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#35ADD5]/70"
            >
                View All Captains
            </Link>
        </section>
    );
}
