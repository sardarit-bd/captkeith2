export type InterestStatus = 'pending' | 'accepted' | 'declined';

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
    interestStatus: InterestStatus | null;
};
