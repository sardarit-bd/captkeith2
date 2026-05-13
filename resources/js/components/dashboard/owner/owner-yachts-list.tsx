import { usePage, Link } from '@inertiajs/react';
import { Ship } from 'lucide-react';
import { myYachts } from '@/routes';
import type { OwnerDashboardProps } from '@/types';

type DashboardPageProps = {
    dashboard?: OwnerDashboardProps;
};

export function OwnerYachtsList() {
    const { props } = usePage<DashboardPageProps>();
    const vessels = props.dashboard?.recent_vessels ?? [];

    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-4">
            <h3 className="text-[17px] font-semibold text-[#0f172a]">
                Your Yachts
            </h3>
            <p className="text-[13px] text-[#6b7280]">Recently added vessels</p>

            <div className="mt-4 space-y-4">
                {vessels.length === 0 ? (
                    <p className="py-4 text-center text-[13px] text-[#9ca3af]">
                        No vessels registered yet.
                    </p>
                ) : (
                    vessels.map((vessel) => (
                        <div
                            key={vessel.id}
                            className="flex items-center justify-between gap-3"
                        >
                            <div className="flex items-center gap-3">
                                {vessel.photo_url ? (
                                    <img
                                        src={vessel.photo_url}
                                        alt={vessel.name}
                                        className="h-12 w-12 rounded-lg object-cover"
                                    />
                                ) : (
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#EFF6FF]">
                                        <Ship className="h-6 w-6 text-[#2563eb]" />
                                    </span>
                                )}
                                <div>
                                    <p className="text-[13px] font-semibold text-[#111827]">
                                        {vessel.name}
                                    </p>
                                    <p className="text-[12.5px] text-[#6b7280]">
                                        {vessel.spec}
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-full bg-[#eef2f5] px-3 py-1 text-[11px] font-medium text-[#334155]">
                                {vessel.marina}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <Link
                href={myYachts()}
                className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0D314D] text-[15px] font-medium text-[#FFFFFF] transition-colors hover:bg-[#0a273f]"
            >
                View All Yachts
            </Link>
        </section>
    );
}
