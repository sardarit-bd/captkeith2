export interface OwnerInvitationRecord {
    id: string;
    ownerId: number;
    ownerUserId: number;
    ownerName: string;
    ownerPhoto: string | null;
    location: string;
    vesselId: number;
    vesselName: string;
    vesselSpec: string;
    vesselImage: string | null;
    marina: string;
    invitedAt: string;
    status: 'pending' | 'accepted' | 'declined';
}
