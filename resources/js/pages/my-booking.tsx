import { Head } from '@inertiajs/react';
import { MyBookingPageContent } from '@/components/my-booking/my-booking-page-content';
import { myBooking } from '@/routes';

export default function MyBookingPage() {
    return (
        <>
            <Head title="My Booking" />
            <MyBookingPageContent />
        </>
    );
}

MyBookingPage.layout = {
    breadcrumbs: [
        {
            title: 'My Booking',
            href: myBooking(),
        },
    ],
    pageHeader: {
        title: 'My Bookings',
        description: 'View and manage your yacht charters.',
    },
};
