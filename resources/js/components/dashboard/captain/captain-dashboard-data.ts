import { AlertCircle, CalendarDays, Ship, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CaptainStats = {
    matchedYachts: number;
    pendingRequests: number;
    plannedCharters: number;
    totalEarnings: string;
};

export type CaptainYacht = {
    id: string;
    name: string;
    spec: string;
    marina: string;
    image: string | null;
};

export type CaptainRequest = {
    id: string;
    yachtName: string;
    yachtSpec: string;
    date: string;
    duration: string;
    status: string;
};

export type CaptainDashboardProps = {
    role: 'captain';
    stats: CaptainStats;
    matchedYachts: CaptainYacht[];
    charterRequests: CaptainRequest[];
};

export type StatCardConfig = {
    key: keyof CaptainStats;
    label: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
};

export const statCardConfigs: StatCardConfig[] = [
    {
        key: 'matchedYachts',
        label: 'Yacht Matches',
        icon: Ship,
        iconColor: '#2563eb',
        iconBg: '#EFF6FF',
    },
    {
        key: 'pendingRequests',
        label: 'Pending Requests',
        icon: AlertCircle,
        iconColor: '#ea580c',
        iconBg: '#FFF7ED',
    },
    {
        key: 'plannedCharters',
        label: 'Planned Charters',
        icon: CalendarDays,
        iconColor: '#7c3aed',
        iconBg: '#F5F3FF',
    },
    {
        key: 'totalEarnings',
        label: 'Total Earnings',
        icon: UserCheck,
        iconColor: '#16a34a',
        iconBg: '#F0FDF4',
    },
];

export type CaptainQuickAction = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    href: string;
};

export const captainQuickActions: CaptainQuickAction[] = [
    {
        title: 'Update Profile',
        description: 'Edit your professional information',
        icon: Ship,
        iconColor: '#2563eb',
        iconBg: '#EFF6FF',
        href: '/my-profile',
    },
    {
        title: 'Browse Yachts',
        description: 'Find matching yacht opportunities',
        icon: Ship,
        iconColor: '#35ADD5',
        iconBg: '#F1F5F9',
        href: '/yachts-match',
    },
    {
        title: 'Manage Availability',
        description: 'Set your schedule and preferences',
        icon: CalendarDays,
        iconColor: '#16a34a',
        iconBg: '#F0FDF4',
        href: '/account-preferences',
    },
];
