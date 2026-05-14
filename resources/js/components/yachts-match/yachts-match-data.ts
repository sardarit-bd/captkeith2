// Runtime type — matches what YachtsMatchController returns
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
};
