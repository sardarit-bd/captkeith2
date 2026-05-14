export type CharterYachtOption = {
    value: string;
    label: string;
};

export type ActiveBooking = {
    id: string;
    yachtName: string;
    yachtType: string;
    yachtLength: string;
    date: string;
    yachtImage: string | null;
    chartererName: string;
    chartererAvatar: string | null;
    status: string;
};

export const charterYachtOptions: CharterYachtOption[] = [
    { value: 'sea-dream', label: 'Sea Dream' },
    { value: 'ocean-spirit', label: 'Ocean Spirit' },
    { value: 'wave-rider', label: 'Wave Rider' },
];

export const activeBookings: ActiveBooking[] = [
    {
        id: 'sea-dream-robert-johnson',
        yachtName: 'Sea Dream',
        yachtType: 'Power',
        yachtLength: '65ft',
        date: 'Apr 20, 2026',
        yachtImage:
            'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=200&h=200&fit=crop',
        chartererName: 'Robert Johnson',
        chartererAvatar:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'Booked',
    },
    {
        id: 'ocean-spirit-sarah-chen',
        yachtName: 'Ocean Spirit',
        yachtType: 'Power',
        yachtLength: '65ft',
        date: 'Apr 25, 2026',
        yachtImage:
            'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=200&h=200&fit=crop',
        chartererName: 'Sarah Chen',
        chartererAvatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'Booked',
    },
];
