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
    downloadUrl: string;
}
export type BookingStatus = 'pending' | 'confirmed' | 'completed';

export type BookingCardRecord = {
    id: string;
    yachtName: string;
    confirmationCode: string;
    status: BookingStatus;
    statusLabel: string;
    image: string | null;
    captainName: string;
    captainAvatar: string | null;
    location: string;
    passengers: string;
    coverage: string;
    date: string;
    time: string;
    totalPaid: string;
    rating?: number | null;
    completionRequestedAt?: string | null;
    completedAt?: string | null;
    agreements?: BookingAgreement[];
    // actions: Array<{
    //     id: string;
    //     label: string;
    //     icon: 'message-square' | 'arrow-right' | 'download' | 'refresh-cw';
    // }>;
};
