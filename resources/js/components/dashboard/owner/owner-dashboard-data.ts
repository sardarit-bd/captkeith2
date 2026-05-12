import { CalendarDays, CircleAlert, Ship, UserRoundCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const OWNER_ACCENT = '#35ADD5';

export type OwnerStatCard = {
    label: string;
    value: string;
    icon: LucideIcon;
    iconColor: string;
};

export type OwnerQuickAction = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    href: string;
};

export type OwnerYacht = {
    name: string;
    spec: string;
    marina: string;
    image: string;
};

export type OwnerCaptainMatch = {
    name: string;
    spec: string;
    match: string;
    image: string;
};

export const ownerStatCards: OwnerStatCard[] = [
    {
        label: 'Total Vessels',
        value: '12',
        icon: Ship,
        iconColor: '#2563eb',
    },
    {
        label: 'Approved Captains',
        value: '34',
        icon: UserRoundCheck,
        iconColor: '#16a34a',
    },
    {
        label: 'Active Charters',
        value: '8',
        icon: CalendarDays,
        iconColor: '#9333ea',
    },
    {
        label: 'Pending Requests',
        value: '5',
        icon: CircleAlert,
        iconColor: '#ea580c',
    },
];

export const ownerQuickActions: OwnerQuickAction[] = [
    {
        title: 'Add New Vessel',
        description: 'Register a new yacht to your fleet',
        icon: Ship,
        iconColor: '#0f3d66',
        iconBg: '#e8eef7',
        href: '/my-yachts/create'
    },
    {
        title: 'Review Requests',
        description: 'Approve or decline captain requests',
        icon: UserRoundCheck,
        iconColor: '#16a34a',
        iconBg: '#eaf7ef',
         href: '/my-yachts/create'
    },
    {
        title: 'Manage Charters',
        description: 'View and organize charter bookings',
        icon: CalendarDays,
        iconColor: OWNER_ACCENT,
        iconBg: '#f1eafa',
         href: '/charterers'
    },
];

export const ownerYachts: OwnerYacht[] = [
    {
        name: 'Sea Dream',
        spec: 'Power • 65ft',
        marina: 'Miami Beach Marina',
        image: '/images/home/about3.jpg',
    },
    {
        name: 'Ocean Spirit',
        spec: 'Sail • 52ft',
        marina: 'Fort Lauderdale Marina',
        image: '/images/home/about2.jpg',
    },
];

export const ownerCaptainMatches: OwnerCaptainMatch[] = [
    {
        name: 'Captain James Morrison',
        spec: 'USCG Master 200 Ton',
        match: '95% Match',
        image: '/images/home/about.jpg',
    },
    {
        name: 'Captain Sarah Chen',
        spec: 'USCG Master 100 Ton',
        match: '88% Match',
        image: '/images/home/testimonial.jpg',
    },
];
