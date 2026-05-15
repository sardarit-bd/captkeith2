import { UserRoundCheck } from 'lucide-react';
import { CaptainRequestCard } from './captain-requests-card';
import type { CaptainInterestRecord } from './captain-requests-data';

interface Props {
    interests: CaptainInterestRecord[];
}

export function CaptainRequestsList({ interests }: Props) {
    if (interests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <UserRoundCheck className="h-8 w-8 text-[#2563eb]" />
                </span>
                <h3 className="mb-2 text-[18px] font-semibold text-[#0f172a]">
                    No captain requests yet
                </h3>
                <p className="max-w-sm text-[14px] text-[#6b7280]">
                    When a captain expresses interest in one of your vessels,
                    their request will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-[13px] text-[#6b7280]">
                {interests.length}{' '}
                {interests.length === 1 ? 'captain has' : 'captains have'}{' '}
                expressed interest in your vessels
            </p>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
                {interests.map((interest) => (
                    <CaptainRequestCard key={interest.id} interest={interest} />
                ))}
            </section>
        </div>
    );
}
