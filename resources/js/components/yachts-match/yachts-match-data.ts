export type InvitationStatus = 'pending' | 'accepted' | 'declined' | null;

export type YachtMatchRecord = {
    id: string;
    name: string;
    registrationNo: string;
    type: string;
    length: string;
    marina: string;
    city: string;
    state: string;
    operatingArea: string;
    qualifications: string[];
    image: string | null;
    invitationStatus: InvitationStatus | null;
    ownerUserId: string | null;
    ownerInvitationStatus: InvitationStatus;
};
