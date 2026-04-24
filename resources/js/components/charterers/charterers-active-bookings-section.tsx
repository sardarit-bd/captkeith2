import { activeBookings } from './charterers-data';
import { CharterersActiveBookingCard } from './charterers-active-booking-card';

export function CharterersActiveBookingsSection() {
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
            </header>

            <div className="space-y-4">
                {activeBookings.map((booking) => (
                    <CharterersActiveBookingCard
                        key={booking.id}
                        booking={booking}
                    />
                ))}
            </div>
        </section>
    );
}
