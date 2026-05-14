import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Ship } from 'lucide-react';
import { myProfile } from '@/routes';
import { YachtsMatchCard } from './yachts-match-card';
import type { YachtMatchRecord } from './yachts-match-data';

type YachtsMatchPageProps = {
    vessels: YachtMatchRecord[];
    profileMissing: boolean;
};

export function YachtsMatchGrid() {
    const { vessels, profileMissing } = usePage<YachtsMatchPageProps>().props;

    if (profileMissing) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <Ship className="h-8 w-8 text-[#2563eb]" />
                </span>
                <h3 className="mb-2 text-[18px] font-semibold text-[#0f172a]">
                    Complete your profile first
                </h3>
                <p className="mb-6 max-w-sm text-[14px] text-[#6b7280]">
                    We match vessels to your license type, endorsement, tonnage
                    rating, and years of experience. Set up your profile to see
                    your matches.
                </p>
                <Link
                    href={myProfile()}
                    className="inline-flex items-center rounded-lg bg-[#0D314D] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#0a273f]"
                >
                    Set Up Profile
                </Link>
            </div>
        );
    }

    if (vessels.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6]">
                    <Ship className="h-8 w-8 text-[#9ca3af]" />
                </span>
                <h3 className="mb-2 text-[18px] font-semibold text-[#0f172a]">
                    No matching vessels yet
                </h3>
                <p className="max-w-sm text-[14px] text-[#6b7280]">
                    There are currently no active vessels that match your
                    qualifications. Check back soon as new vessels are added
                    regularly.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-[13px] text-[#6b7280]">
                {vessels.length}{' '}
                {vessels.length === 1 ? 'vessel matches' : 'vessels match'} your
                qualifications
            </p>
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
                {vessels.map((yacht) => (
                    <YachtsMatchCard key={yacht.id} yacht={yacht} />
                ))}
            </section>
        </div>
    );
}
