import { Link } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { captainSelect } from '@/routes/charterer';
import { availableCaptainCount } from './charterer-request-data';

export function ChartererRequestAvailableCaptainsCard() {
    return (
        <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-[#111827]" />
                <h3 className="text-base font-bold text-[#111827]">
                    Available Captains ({availableCaptainCount})
                </h3>
            </header>

            <p className="mb-6 text-sm text-[#6b7280]">
                All captains are pre-qualified and meet the vessel requirements
            </p>

            <p className="mb-5 text-sm text-[#374151]">
                Select a captain to continue with your charter booking
            </p>

            <Link
                href={captainSelect()}
                className="w-full rounded-lg bg-[#0A273F] px-6 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] sm:w-auto"
            >
                Choose Your Captain
            </Link>
        </section>
    );
}
