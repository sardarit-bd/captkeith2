export type BookingFilter = {
    id: 'all' | 'upcoming' | 'completed';
    label: string;
    count: number;
    active?: boolean;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed';

export type BookingCardRecord = {
    id: string;
    yachtName: string;
    confirmationCode: string;
    status: BookingStatus;
    statusLabel: string;
    image: string;
    captainName: string;
    captainAvatar: string;
    location: string;
    passengers: string;
    coverage: string;
    date: string;
    time: string;
    totalPaid: string;
    rating?: number;
    actions: Array<{
        id: string;
        label: string;
        icon: 'message-square' | 'arrow-right' | 'download' | 'refresh-cw';
    }>;
};

export const bookingFilters: BookingFilter[] = [
    { id: 'all', label: 'All Bookings', count: 4, active: true },
    { id: 'upcoming', label: 'Upcoming', count: 2 },
    { id: 'completed', label: 'Completed', count: 2 },
];

export const bookingRecords: BookingCardRecord[] = [
    {
        id: 'cm-2026-00156',
        yachtName: 'Ocean Star',
        confirmationCode: 'CM-2026-00156',
        status: 'pending',
        statusLabel: 'Pending Captain',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
        captainName: 'Captain Michael Thompson',
        captainAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        location: 'Miami Beach Marina',
        passengers: '8 passengers',
        coverage: 'Standard Coverage',
        date: 'April 15, 2026',
        time: '10:00 AM - 4:00 PM',
        totalPaid: '$2295',
        actions: [
            { id: 'contact-captain', label: 'Contact Captain', icon: 'message-square' },
            { id: 'view-details', label: 'View Details', icon: 'arrow-right' },
        ],
    },
    {
        id: 'cm-2026-00142',
        yachtName: 'Sea Breeze',
        confirmationCode: 'CM-2026-00142',
        status: 'confirmed',
        statusLabel: 'Confirmed',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
        captainName: 'Captain Sarah Mitchell',
        captainAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        location: 'Fort Lauderdale Marina',
        passengers: '6 passengers',
        coverage: 'Premium Coverage',
        date: 'April 22, 2026',
        time: '2:00 PM - 8:00 PM',
        totalPaid: '$1850',
        actions: [
            { id: 'download-contract', label: 'Download Contract', icon: 'download' },
            { id: 'view-details', label: 'View Details', icon: 'arrow-right' },
        ],
    },
    {
        id: 'cm-2026-00098',
        yachtName: 'Blue Horizon',
        confirmationCode: 'CM-2026-00098',
        status: 'completed',
        statusLabel: 'Completed',
        image: 'https://images.unsplash.com/photo-1571493751515-38b4d084cdcd?w=800&h=600&fit=crop',
        captainName: 'Captain David Chen',
        captainAvatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        location: 'Key West Marina',
        passengers: '10 passengers',
        coverage: 'Standard Coverage',
        date: 'March 10, 2026',
        time: '10:00 AM - 6:00 PM',
        totalPaid: '$3200',
        rating: 5,
        actions: [
            { id: 'download-contract', label: 'Download Contract', icon: 'download' },
            { id: 'book-again', label: 'Book Again', icon: 'refresh-cw' },
        ],
    },
];
