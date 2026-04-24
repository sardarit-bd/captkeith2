export type VesselInventoryType = 'Power' | 'Sail';
export type VesselInventoryStatus = 'Active' | 'Pending Approval' | 'Flagged';

export type VesselInventoryRecord = {
    id: string;
    vesselName: string;
    vesselType: VesselInventoryType;
    length: string;
    imageUrl: string;
    ownerName: string;
    ownerInitials: string;
    location: string;
    status: VesselInventoryStatus;
    officialNumber: string | null;
    capacity: string;
    deckhandRequired: boolean;
    issueSummary?: string;
    issueDetail?: string;
};

export const vesselTypeFilters = ['All Types', 'Power', 'Sail'] as const;

export const vesselStatusFilters = [
    'All Statuses',
    'Active',
    'Pending Approval',
    'Flagged',
] as const;

export const vesselInventoryRecords: VesselInventoryRecord[] = [
    {
        id: 'sea-dream',
        vesselName: 'Sea Dream',
        vesselType: 'Power',
        length: '65ft',
        imageUrl:
            'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=150&h=150&fit=crop',
        ownerName: 'William Harris',
        ownerInitials: 'WH',
        location: 'Miami Beach Marina, FL',
        status: 'Active',
        officialNumber: '1234567',
        capacity: 'Max 6 Pax',
        deckhandRequired: false,
    },
    {
        id: 'ocean-spirit',
        vesselName: 'Ocean Spirit',
        vesselType: 'Sail',
        length: '52ft',
        imageUrl:
            'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=150&h=150&fit=crop',
        ownerName: 'Sarah Jenkins',
        ownerInitials: 'SJ',
        location: 'Fort Lauderdale, FL',
        status: 'Pending Approval',
        officialNumber: null,
        capacity: 'Max 6 Pax',
        deckhandRequired: false,
    },
    {
        id: 'harbor-light',
        vesselName: 'Harbor Light',
        vesselType: 'Power',
        length: '80ft',
        imageUrl:
            'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=150&h=150&fit=crop',
        ownerName: 'Robert T.',
        ownerInitials: 'RT',
        location: 'Biscayne Bay, FL',
        status: 'Active',
        officialNumber: '9988776',
        capacity: 'Max 6 Pax',
        deckhandRequired: true,
    },
    {
        id: 'blue-current',
        vesselName: 'Blue Current',
        vesselType: 'Sail',
        length: '54ft',
        imageUrl:
            'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=150&h=150&fit=crop',
        ownerName: 'Mike Davis',
        ownerInitials: 'MD',
        location: 'Palm Beach Harbor, FL',
        status: 'Flagged',
        officialNumber: null,
        capacity: 'Max 6 Pax',
        deckhandRequired: false,
        issueSummary: 'Missing registration docs',
        issueDetail: 'Demise charter eligibility suspended',
    },
];
