export type YachtTab = 'details' | 'captain' | 'charters';

export type YachtRecord = {
    id: string;
    name: string;
    registrationNo: string;
    image: string | null;
    defaultTab: YachtTab;
    specs: {
        type: string;
        length: string;
        draft: string;
        mooringLocation: string;
        operatingArea: string;
        deckhandRequired: string;
    };
    captainRequirements: {
        licenseTypes: string[];
        rating: string;
        endorsements: string[];
        minimumExperience: string;
    };
    charters: {
        hasScheduledCharters: boolean;
    };
};

export const yachts: YachtRecord[] = [
    {
        id: 'sea-dream',
        name: 'Sea Dream',
        registrationNo: 'US-1234567',
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1000&auto=format&fit=crop',
        defaultTab: 'details',
        specs: {
            type: 'Power',
            length: '65 ft',
            draft: '5.5 ft',
            mooringLocation: 'Miami Beach Marina',
            operatingArea: 'South Florida Waters',
            deckhandRequired: 'Yes',
        },
        captainRequirements: {
            licenseTypes: ['USCG Master 100 Ton', 'USCG Master 200 Ton'],
            rating: 'Master',
            endorsements: ['Near Coastal', 'Sailing'],
            minimumExperience: '5 years',
        },
        charters: {
            hasScheduledCharters: false,
        },
    },
    {
        id: 'ocean-spirit',
        name: 'Ocean Spirit',
        registrationNo: 'US-7654321',
        image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1000&auto=format&fit=crop',
        defaultTab: 'captain',
        specs: {
            type: 'Sail',
            length: '52 ft',
            draft: '4.8 ft',
            mooringLocation: 'Fort Lauderdale Marina',
            operatingArea: 'Biscayne Bay',
            deckhandRequired: 'No',
        },
        captainRequirements: {
            licenseTypes: ['USCG Master 100 Ton', 'USCG Master 200 Ton'],
            rating: 'Master',
            endorsements: ['Near Coastal', 'Sailing'],
            minimumExperience: '5 years',
        },
        charters: {
            hasScheduledCharters: false,
        },
    },
    {
        id: 'wave-rider',
        name: 'Wave Rider',
        registrationNo: 'US-9031412',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop',
        defaultTab: 'charters',
        specs: {
            type: 'Power',
            length: '58 ft',
            draft: '5.1 ft',
            mooringLocation: 'Key West Harbor',
            operatingArea: 'Florida Keys',
            deckhandRequired: 'Yes',
        },
        captainRequirements: {
            licenseTypes: ['USCG Master 100 Ton'],
            rating: 'Mate',
            endorsements: ['Near Coastal'],
            minimumExperience: '3 years',
        },
        charters: {
            hasScheduledCharters: false,
        },
    },
];
