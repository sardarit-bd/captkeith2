export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type OwnerDashboardStats = {
    total_vessels: number;
    approved_captains: number;
    active_charters: number;
    pending_requests: number;
};

export type OwnerRecentVessel = {
    id: string;
    name: string;
    spec: string;
    marina: string;
    photo_url: string | null;
};

export type OwnerCaptainMatch = {
    id: string;
    name: string;
    spec: string;
    match: string;
    photo_url: string | null;
};

export type OwnerDashboardProps = {
    role: 'owner';
    stats: OwnerDashboardStats;
    recent_vessels: OwnerRecentVessel[];
    captain_matches: OwnerCaptainMatch[];
};
