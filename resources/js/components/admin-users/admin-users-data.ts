export type AdminUserRole = 'Captain' | 'Owner' | 'Deckhand' | 'Charterer';
export type AdminUserStatus = 'Verified' | 'Active' | 'Pending Review' | 'Suspended';

export type AdminUserRecord = {
    id: string;
    name: string;
    email: string;
    role: AdminUserRole;
    status: AdminUserStatus;
    detailPrimary: string;
    detailSecondary: string;
    joinedOn: string;
    actionLabel: string;
    avatarUrl?: string;
    initials?: string;
};

export const adminUserRoleFilters = [
    'All Roles',
    'Yacht Owners',
    'Captains',
    'Deckhands',
    'Charterers',
] as const;

export const adminUserStatusFilters = [
    'All Statuses',
    'Verified',
    'Pending Review',
    'Suspended',
] as const;

export const adminUsers: AdminUserRecord[] = [
    {
        id: 'john-carter',
        name: 'John Carter',
        email: 'john.carter@example.com',
        role: 'Captain',
        status: 'Verified',
        detailPrimary: 'Master 100 GT',
        detailSecondary: 'Near Coastal Endorsement',
        joinedOn: 'Jan 15, 2026',
        actionLabel: 'View Profile',
        avatarUrl: 'https://i.pravatar.cc/150?img=11',
    },
    {
        id: 'william-harris',
        name: 'William Harris',
        email: 'william.h@yachts.com',
        role: 'Owner',
        status: 'Active',
        detailPrimary: '2 Vessels Listed',
        detailSecondary: 'Miami, FL',
        joinedOn: 'Feb 02, 2026',
        actionLabel: 'View Profile',
        initials: 'WH',
    },
    {
        id: 'sarah-miller',
        name: 'Sarah Miller',
        email: 'sarah.sea@gmail.com',
        role: 'Deckhand',
        status: 'Pending Review',
        detailPrimary: 'Resume Uploaded',
        detailSecondary: 'Needs manual verification',
        joinedOn: 'Today',
        actionLabel: 'Review Docs',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
        id: 'mike-davis',
        name: 'Mike Davis',
        email: 'mike.davis@sail.com',
        role: 'Captain',
        status: 'Suspended',
        detailPrimary: 'License Expired',
        detailSecondary: 'OUPV expired 3 days ago',
        joinedOn: 'Nov 10, 2025',
        actionLabel: 'Manage',
        initials: 'MD',
    },
    {
        id: 'mark-roberts',
        name: 'Mark Roberts',
        email: 'mark.r@gmail.com',
        role: 'Charterer',
        status: 'Active',
        detailPrimary: '1 Past Charter',
        detailSecondary: 'VQUIP insured previously',
        joinedOn: 'Mar 22, 2026',
        actionLabel: 'View Profile',
        avatarUrl: 'https://i.pravatar.cc/150?img=33',
    },
];
