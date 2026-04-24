export type CaptainRequestRecord = {
    id: string;
    yachtName: string;
    yachtSpec: string;
    marina: string;
    image: string;
    date: string;
    time: string;
    duration: string;
    specialNotes: string;
    status: 'pending' | 'accepted' | 'declined';
};

export const captainRequestRecords: CaptainRequestRecord[] = [
    {
        id: 'sea-dream-2026-04-20',
        yachtName: 'Sea Dream',
        yachtSpec: 'Power • 65ft',
        marina: 'Miami Beach Marina',
        image: '/images/home/about3.jpg',
        date: 'Apr 20, 2026',
        time: '09:00',
        duration: '6 hours',
        specialNotes: 'Client wants to visit Bimini.',
        status: 'pending',
    },
    {
        id: 'ocean-star-2026-06-23',
        yachtName: 'Ocean Star',
        yachtSpec: 'Power • 65ft',
        marina: 'Miami Beach Marina',
        image: '/images/home/about2.jpg',
        date: 'Jun 23, 2026',
        time: '08:00',
        duration: '5 hours',
        specialNotes: 'Client wants to visit Bimini.',
        status: 'pending',
    },
];
