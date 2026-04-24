export type CaptainCandidate = {
    id: string;
    name: string;
    location: string;
    license: string;
    experience: string;
    bio: string;
    rate: string;
    match: string;
    avatar: string;
    tags: string[];
};

export const captainCandidates: CaptainCandidate[] = [
    {
        id: 'captain-james-morrison',
        name: 'Captain James Morrison',
        location: 'Miami, FL',
        license: 'USCG Master 200 Ton',
        experience: '12 years experience',
        bio: 'Experienced captain with over 12 years navigating South Florida and Caribbean waters.',
        rate: '$150/hr',
        match: '95% Match',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
        tags: ['Near Coastal', 'Sailing', 'Towing'],
    },
    {
        id: 'captain-sarah-chen',
        name: 'Captain Sarah Chen',
        location: 'Fort Lauderdale, FL',
        license: 'USCG Master 100 Ton',
        experience: '8 years experience',
        bio: 'Specialized in sailing vessels with extensive experience in bareboat charters.',
        rate: '$125/hr',
        match: '88% Match',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        tags: ['Sailing', 'Auxiliary Sail'],
    },
];
