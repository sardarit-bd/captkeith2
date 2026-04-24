export type CharterRequestYacht = {
    name: string;
    registrationNumber: string;
    type: string;
    length: string;
    marina: string;
    operatingArea: string;
    image: string;
};

export type CharterRequestInfo = {
    date: string;
    time: string;
    duration: string;
    notes: string;
};

export type RequestStep = {
    id: number;
    title: string;
    description: string;
    active?: boolean;
};

export const charterRequestYacht: CharterRequestYacht = {
    name: 'Sea Dream',
    registrationNumber: 'US-1234567',
    type: 'Power',
    length: '65 ft',
    marina: 'Miami Beach Marina',
    operatingArea: 'South Florida Waters',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=500&fit=crop',
};

export const charterRequestInfo: CharterRequestInfo = {
    date: '4/20/2026',
    time: '09:00',
    duration: '6 hours',
    notes: 'Client wants to visit Bimini',
};

export const availableCaptainCount = 2;

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
