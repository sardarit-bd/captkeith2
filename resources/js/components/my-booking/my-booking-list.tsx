import { usePage } from '@inertiajs/react';
import { Anchor } from 'lucide-react';
import { useState } from 'react';
import { MyBookingCard } from './my-booking-card';
import { MyBookingFilters } from './my-booking-filters';
import type {
    BookingCardRecord,
    BookingFilter,
    BookingFilterId,
} from './my-booking-data';

interface PageProps {
    bookings?: BookingCardRecord[];
    filters?: BookingFilter[];
    [key: string]: unknown;
}

export function MyBookingList() {
    const { bookings = [], filters = [] } = usePage<PageProps>().props;
    const [activeFilter, setActiveFilter] = useState<BookingFilterId>('all');

    const filtered = bookings.filter((b) => {
        if (activeFilter === 'all') {
            return true;
        }

        if (activeFilter === 'upcoming') {
            return b.status === 'pending' || b.status === 'confirmed';
        }

        if (activeFilter === 'completed') {
            return b.status === 'completed';
        }

        return true;
    });

    return (
        <div className="flex flex-col gap-4">
            {filters.length > 0 && (
                <MyBookingFilters
                    filters={filters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                />
            )}

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF8FD]">
                        <Anchor className="h-8 w-8 text-[#3DB3DE]" />
                    </span>
                    <h3 className="mb-2 text-[18px] font-semibold text-[#0f172a]">
                        No bookings found
                    </h3>
                    <p className="max-w-sm text-[14px] text-[#6b7280]">
                        {activeFilter === 'all'
                            ? "You haven't made any bookings yet."
                            : `No ${activeFilter} bookings to show.`}
                    </p>
                </div>
            ) : (
                <section className="space-y-6">
                    {filtered.map((booking) => (
                        <MyBookingCard key={booking.id} booking={booking} />
                    ))}
                </section>
            )}
        </div>
    );
}
