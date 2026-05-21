import { usePage } from '@inertiajs/react';
import { Ship } from 'lucide-react';
import { CharterersActiveBookingsSection } from './charterers-active-bookings-section';
import type {
    ActiveBooking,
    CharterYachtOption,
    DraftCharter,
} from './charterers-data';
import { DraftChartersSection } from './charterers-draft-section';
import { CharterersFormCard } from './charterers-form-card';

interface PageProps {
    vessels: CharterYachtOption[];
    drafts: DraftCharter[];
    bookings: ActiveBooking[];
}

export function CharterersPageContent() {
    const { vessels, drafts, bookings } = usePage<PageProps>().props;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-4xl space-y-10 py-2 sm:py-4">
                    <CharterersFormCard vessels={vessels} />

                    {drafts.length > 0 && (
                        <DraftChartersSection drafts={drafts} />
                    )}

                    <CharterersActiveBookingsSection bookings={bookings} />
                </div>
            </div>
        </div>
    );
}
