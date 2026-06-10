export interface CaptainInfo {
    id: string;
    userId: string; 
    name: string;
    photo?: string | null;
    role: string;
    experience?: string;
    email?: string;
    phone?: string;
}

export interface CaptainRequestRecord {
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
    charterEventId?: string;
    vesselId?: string;
    ownerUserId?: string;
    captainInfo?: CaptainInfo;
    deckhandInfo?: {
        selectedDeckhand?: {
            name: string;
            responseStatus: string;
            selectedByMe: boolean;
        };
        availableDeckhands?: any[];
        mustSelectDeckhand?: boolean;
        hasQualifiedDeckhands?: boolean;
    };
}