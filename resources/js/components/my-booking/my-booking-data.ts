export type BookingFilterId = 'all' | 'upcoming' | 'completed';

export type BookingFilter = {
    id: BookingFilterId;
    label: string;
    count: number;
    active: boolean;
};

export interface BookingAgreement {
    id: string;
    name: string;
    role: 'captain' | 'deckhand' | 'owner';
    downloadUrl: string;
    signedAt?: string | null;
    fullySignedAt?: string | null;
    signStatus?: string;
}

export type BookingCrewMember = {
    id: string;
    name: string;
    photo: string | null;
    role: string;
    licenseType?: string;
    yearsExperience?: number;
    hourlyRate?: number;
};

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export type BookingCardRecord = {
    id: string;
    yachtName: string;
    confirmationCode: string;
    status: BookingStatus;
    statusLabel: string;
    image: string | null;
    captains: BookingCrewMember[];
    deckhand: BookingCrewMember | null;
    location: string;
    passengers: string;
    yachtCapacity: string;
    date: string;
    startTime: string;
    duration: number;
    time: string;
    totalPaid: string;
    rating?: number | null;
    agreements: BookingAgreement[];
    completionRequestedAt?: string | null;
    completedAt?: string | null;
    canCancel: boolean;
    canComplete: boolean;
    checkCharterUrl: string;
};
