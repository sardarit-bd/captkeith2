import { MyBookingCard } from './my-booking-card';
import { bookingRecords } from './my-booking-data';

export function MyBookingList() {
    return (
        <section className="space-y-6">
            {bookingRecords.map((booking) => (
                <MyBookingCard key={booking.id} booking={booking} />
            ))}
        </section>
    );
}
