import { CharterersActiveBookingCard } from './charterers-active-booking-card';
import type { ActiveBooking } from './charterers-data';

interface Props {
    bookings: ActiveBooking[];
}

export function CharterersActiveBookingsSection({ bookings }: Props) {
    return (
        <section>
            <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl leading-tight font-bold text-[#111827]">
                        Active Bookings
                    </h3>
                    <p className="mt-1 text-sm text-[#6b7280]">
                        Manage your confirmed charters and clients
                    </p>
                </div>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0A273F] text-xs font-bold text-white">
                    {bookings.length}
                </span>
            </header>

            {bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                    <p className="text-sm font-medium text-gray-400">
                        No active bookings yet.
                    </p>
                    <p className="mt-1 text-xs text-gray-300">
                        Create a charter above to get started.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <CharterersActiveBookingCard
                            key={booking.id}
                            booking={booking}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
