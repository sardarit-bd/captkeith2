export type YachtMatchRecord = {
    id: string;
    name: string;
    registrationNo: string;
    matchPercent: string;
    type: string;
    length: string;
    marina: string;
    qualifications: string[];
    image: string;
};

export const yachtMatches: YachtMatchRecord[] = [
    {
        id: 'sea-dream',
        name: 'Sea Dream',
        registrationNo: 'US-1234567',
        matchPercent: '95% Match',
        type: 'Power',
        length: '65 ft',
        marina: 'Miami Beach Marina',
        qualifications: ['USCG Master 100 Ton', 'USCG Master 200 Ton'],
        image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 'ocean-spirit',
        name: 'Ocean Spirit',
        registrationNo: 'US-7654321',
        matchPercent: '95% Match',
        type: 'Sail',
        length: '65 ft',
        marina: 'Fort Lauderdale Marina',
        qualifications: ['USCG Master 100 Ton'],
        image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 'harbor-nova',
        name: 'Harbor Nova',
        registrationNo: 'US-9183726',
        matchPercent: '93% Match',
        type: 'Power',
        length: '58 ft',
        marina: 'Biscayne Bay Marina',
        qualifications: ['USCG Master 100 Ton', 'Near Coastal Endorsement'],
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    },
    {
        id: 'blue-orbit',
        name: 'Blue Orbit',
        registrationNo: 'US-6612094',
        matchPercent: '91% Match',
        type: 'Sail',
        length: '60 ft',
        marina: 'Fort Lauderdale Marina',
        qualifications: ['USCG Master 100 Ton'],
        image: 'https://images.unsplash.com/photo-1571493751515-38b4d084cdcd?q=80&w=1200&auto=format&fit=crop',
    },
];
