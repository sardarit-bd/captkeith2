
export type AvailableDeckhand = {
    id: string;
    name: string;
    photo?: string | null;
    experience: string;
    rate: string;
    hasServer?: boolean;
    hasBartend?: boolean;
    requestStatus?: 'none' | 'pending' | 'accepted' | 'declined';
    requestId?: string | null;
};

export type SelectedDeckhandInfo = {
    id: string;
    name: string;
    responseStatus: 'pending' | 'available' | 'unavailable';
    selectedByMe: boolean;
};

export type DeckhandInfo = {
    selectedDeckhand: SelectedDeckhandInfo | null;
    availableDeckhands: AvailableDeckhand[];
    mustSelectDeckhand: boolean;
};

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
    deckhandInfo: DeckhandInfo | null;
};
