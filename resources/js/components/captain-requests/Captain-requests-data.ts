export type CaptainInterestRecord = {
    id: string;
    captainId: string;
    captainUserId: string;
    captainName: string;
    captainPhoto: string | null;
    licenseType: string;
    endorsement: string;
    yearsExperience: string;
    hourlyRate: string;
    location: string;
    vesselId: string;
    vesselName: string;
    vesselSpec: string;
    vesselImage: string | null;
    marina: string;
    requestedAt: string;
    status: 'pending' | 'accepted' | 'declined';
};
