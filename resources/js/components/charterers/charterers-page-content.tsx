import { Link, usePage } from '@inertiajs/react';
import { Link2 } from 'lucide-react';
import { invite } from '@/routes/chartarere';
import { CharterersActiveBookingsSection } from './charterers-active-bookings-section';
import type { ActiveBooking, CharterYachtOption } from './charterers-data';
import { CharterersFormCard } from './charterers-form-card';

interface PageProps {
    vessels: CharterYachtOption[];
    bookings: ActiveBooking[];
}

export function CharterersPageContent() {
    const { vessels, bookings } = usePage<PageProps>().props;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-250 py-2 sm:py-4">
                    <CharterersFormCard vessels={vessels} />

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
                        <CharterersActiveBookingsSection bookings={bookings} />
                    </div>
                </div>
            </div>
        </div>
    );
}
