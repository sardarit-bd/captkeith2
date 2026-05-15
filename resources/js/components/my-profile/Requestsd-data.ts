export type CaptainRequestRecord = {
    id: string;
    yachtName: string;
    yachtSpec: string;
    marina: string;
    image: string | null;
    date: string;
    time: string;
    duration: string;
    specialNotes: string;
    status: 'pending' | 'available' | 'unavailable';
    charterEventId: string;
};
