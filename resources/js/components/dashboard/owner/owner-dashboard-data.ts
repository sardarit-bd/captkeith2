import { CalendarDays, CircleAlert, Ship, UserRoundCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const OWNER_ACCENT = '#35ADD5';

export type OwnerQuickAction = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    href: string;
};

export type OwnerStatCardConfig = {
    key:
        | 'total_vessels'
        | 'approved_captains'
        | 'active_charters'
        | 'pending_requests';
    label: string;
    icon: LucideIcon;
    iconColor: string;
};

export const ownerStatCardConfigs: OwnerStatCardConfig[] = [
    {
        key: 'total_vessels',
        label: 'Total Vessels',
        icon: Ship,
        iconColor: '#2563eb',
    },
    {
        key: 'approved_captains',
        label: 'Approved Captains',
        icon: UserRoundCheck,
        iconColor: '#16a34a',
    },
    {
        key: 'active_charters',
        label: 'Active Charters',
        icon: CalendarDays,
        iconColor: '#9333ea',
    },
    {
        key: 'pending_requests',
        label: 'Pending Requests',
        icon: CircleAlert,
        iconColor: '#ea580c',
    },
];

export const ownerQuickActions: OwnerQuickAction[] = [
    {
        title: 'Add New Vessel',
        description: 'Register a new yacht to your fleet',
        icon: Ship,
        iconColor: '#35ADD5',
        iconBg: '#e8eef7',
        href: '/my-yachts/create',
    },
    {
        title: 'Review Requests',
        description: 'Approve or decline captain requests',
        icon: UserRoundCheck,
        iconColor: '#16a34a',
        iconBg: '#eaf7ef',
        href: '/captain-requests',
    },
    {
        title: 'Manage Charters',
        description: 'View and organize charter bookings',
        icon: CalendarDays,
        iconColor: OWNER_ACCENT,
        iconBg: '#f1eafa',
        href: '/charterers',
    },
];
