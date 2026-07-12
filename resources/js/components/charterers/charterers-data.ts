export type CharterYachtOption = {
    value: string;
    label: string;
};

export type DraftCharter = {
    id: string;
    vesselId: string;
    yachtName: string;
    yachtType: string;
    yachtLength: string;
    date: string;
    startTime: string;
    duration: string;
    yachtImage: string | null;
    inviteLink: string | null;
    inviteExpires: string | null;
    specialNotes: string | null;
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
    bareboatAgreementId: string | null;
};

export interface CrewMember {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    status?: 'Pending' | 'Confirmed' | 'Declined';
    avatar?: string;
}

export interface ChartererBooking {
    id: string;
    vessel: {
        id: string;
        name: string;
        image: string;
        type: string;
        length: string;
    };
    charterer: {
        id: string;
        name: string;
        email: string;
        phone?: string;
    };
    captain?: CrewMember;
    deckhand?: CrewMember;
    date: Date;
    time?: string;
    duration?: string;
    status: 'Draft' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    inviteLink?: string;
    expiresAt?: Date;
    notes?: string;
}
