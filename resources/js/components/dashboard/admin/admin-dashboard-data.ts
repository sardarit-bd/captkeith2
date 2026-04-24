export type AdminStatTone = 'warning' | 'info' | 'accent' | 'success';

export type AdminStatCard = {
    id: string;
    label: string;
    value: string;
    helper: string;
    tone: AdminStatTone;
    icon: 'file-warning' | 'ship' | 'calendar-check' | 'users';
};

export type VerificationQueueItem = {
    id: string;
    initials: string;
    name: string;
    role: 'Captain' | 'Deckhand';
    documentType: string;
    submitted: string;
    badgeTone: 'blue' | 'purple';
};

export type VesselQueueItem = {
    id: string;
    vesselName: string;
    spec: string;
    ownerName: string;
    location: string;
};

export type ComplianceEvent = {
    id: string;
    message: string;
    timestamp: string;
};

export const adminStatCards: AdminStatCard[] = [
    {
        id: 'pending-verifications',
        label: 'Pending Verifications',
        value: '12',
        helper: 'Requires immediate review',
        tone: 'warning',
        icon: 'file-warning',
    },
    {
        id: 'vessel-approvals',
        label: 'Vessel Approvals',
        value: '5',
        helper: 'Awaiting listing approval',
        tone: 'info',
        icon: 'ship',
    },
    {
        id: 'active-charters',
        label: 'Active Charters (This Wk)',
        value: '24',
        helper: 'Fully compliant and booked',
        tone: 'accent',
        icon: 'calendar-check',
    },
    {
        id: 'platform-users',
        label: 'Total Platform Users',
        value: '842',
        helper: 'Owners, Captains and Charterers',
        tone: 'success',
        icon: 'users',
    },
];

export const verificationQueueItems: VerificationQueueItem[] = [
    {
        id: 'john-carter',
        initials: 'JC',
        name: 'John Carter',
        role: 'Captain',
        documentType: 'OUPV License',
        submitted: '2 hours ago',
        badgeTone: 'blue',
    },
    {
        id: 'sarah-miller',
        initials: 'SM',
        name: 'Sarah Miller',
        role: 'Deckhand',
        documentType: 'Resume / CV',
        submitted: '5 hours ago',
        badgeTone: 'purple',
    },
    {
        id: 'mike-davis',
        initials: 'MD',
        name: 'Mike Davis',
        role: 'Captain',
        documentType: '100 Gross Ton',
        submitted: '1 day ago',
        badgeTone: 'blue',
    },
];

export const vesselQueueItems: VesselQueueItem[] = [
    {
        id: 'sea-dreamer',
        vesselName: 'Sea Dreamer',
        spec: 'Power • 65ft',
        ownerName: 'William H.',
        location: 'Miami, FL',
    },
    {
        id: 'windward',
        vesselName: 'Windward',
        spec: 'Sail • 42ft',
        ownerName: 'Sarah Jenkins',
        location: 'Annapolis, MD',
    },
    {
        id: 'oasis',
        vesselName: 'Oasis',
        spec: 'Power • 80ft (Requires Deckhand)',
        ownerName: 'Robert T.',
        location: 'Newport, RI',
    },
];

export const complianceEvents: ComplianceEvent[] = [
    {
        id: 'compliance-1',
        message:
            'Charter #492: Captain Hire Agreement executed by Charterer (Mark R.) and Captain (Mike D.).',
        timestamp: '10 mins ago',
    },
    {
        id: 'compliance-2',
        message: 'Charter #492: VQUIP insurance policy secured successfully.',
        timestamp: '12 mins ago',
    },
    {
        id: 'compliance-3',
        message: "Vessel 'Ocean Star': Demise charter parameters legally verified.",
        timestamp: '1 hour ago',
    },
];
