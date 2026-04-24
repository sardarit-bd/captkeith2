export type InviteCaptainStatus = 'pending' | 'available';

export type InviteCaptain = {
    id: string;
    name: string;
    license: string;
    avatar: string;
    status: InviteCaptainStatus;
};

export const charterInviteLink = 'https://captmatch.com/charter/charter1';

export const inviteCaptains: InviteCaptain[] = [
    {
        id: 'captain-james-morrison',
        name: 'Captain James Morrison',
        license: 'USCG Master 200 Ton',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        status: 'pending',
    },
    {
        id: 'captain-sarah-chen',
        name: 'Captain Sarah Chen',
        license: 'USCG Master 100 Ton',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'available',
    },
    {
        id: 'captain-mike-rodriguez',
        name: 'Captain Mike Rodriguez',
        license: 'USCG Master 100 Ton',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'available',
    },
];
