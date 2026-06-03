export interface DeckhandInvitationRecord {
    id: string;
    ownerId: string;
    ownerUserId: string;
    ownerName: string;
    ownerPhoto: string | null;
    location: string;
    vesselId: string;
    vesselName: string;
    vesselSpec: string;
    vesselImage: string | null;
    marina: string;
    invitedAt: string;
    status: 'pending' | 'accepted' | 'declined';
}   