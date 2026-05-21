export type CharterRequestYacht = {
    name: string;
    registrationNumber: string;
    type: string;
    length: string;
    marina: string;
    operatingArea: string;
    image: string | null;
};

export type CharterEvent = {
    id: string;
    yacht: CharterRequestYacht;
    date: string;
    time: string;
    duration: string;
    specialNotes: string;
    availableCaptainCount: number;
};

export type RequestStep = {
    id: number;
    title: string;
    description: string;
    active?: boolean;
};

export const requestSteps: RequestStep[] = [
    {
        id: 1,
        title: 'Select Your Captain',
        description: 'Choose from qualified captains',
        active: true,
    },
    {
        id: 2,
        title: 'Complete Your Profile',
        description: 'Provide contact information',
    },
    {
        id: 3,
        title: 'Sign Agreements',
        description: 'E-sign charter and captain hire agreements',
    },
    {
        id: 4,
        title: 'Purchase Insurance',
        description: 'Complete VQUIP insurance coverage',
    },
];
