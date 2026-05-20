export type CaptainRequestRecord = {
    id: string;
    type: 'charter_request' | 'owner_invitation';
    yachtName: string;
    yachtSpec: string;
    marina: string;
    image: string | null;
    date: string;
    time: string;
    duration: string;
    specialNotes: string;
    status: 'pending' | 'available' | 'unavailable' | 'accepted' | 'declined';
    charterEventId: string | null;
    ownerUserId: string | null;
};
