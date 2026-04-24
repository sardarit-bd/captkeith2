import { Link } from '@inertiajs/react';
import { Link2 } from 'lucide-react';
import { invite } from '@/routes/chartarere';
import { CharterersActiveBookingsSection } from './charterers-active-bookings-section';
import { CharterersFormCard } from './charterers-form-card';

export function CharterersPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-[1000px] py-2 sm:py-4">
                    <CharterersFormCard />

                    <div className="mt-6">
                        <Link
                            href={invite()}
                            prefetch
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] sm:w-auto"
                        >
                            <Link2 className="h-4 w-4" />
                            Create Charter &amp; Generate Link
                        </Link>
                    </div>

                    <div className="mt-14">
                        <CharterersActiveBookingsSection />
                    </div>
                </div>
            </div>
        </div>
    );
}
