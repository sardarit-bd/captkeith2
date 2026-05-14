import { AlertCircle, CalendarDays, Ship, User, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CaptainStatCard = {
    label: string;
    value: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
};

export type CaptainQuickAction = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    href?: string;
};

export type CaptainYacht = {
    name: string;
    spec: string;
    marina: string;
    image: string;
};

export type CaptainRequest = {
    yachtName: string;
    yachtSpec: string;
    date: string;
    duration: string;
    status: string;
};

export const captainStatCards: CaptainStatCard[] = [
    {
        label: 'Yacht Matches',
        value: '2',
        icon: Ship,
        iconColor: '#2563eb',
        iconBg: '#EFF6FF',
    },
    {
        label: 'Pending Requests',
        value: '3',
        icon: AlertCircle,
        iconColor: '#ea580c',
        iconBg: '#FFF7ED',
    },
    {
        label: 'Planned Charterers',
        value: '8',
        icon: CalendarDays,
        iconColor: '#7c3aed',
        iconBg: '#F5F3FF',
    },
    {
        label: 'Total Earnings',
        value: '$12,567',
        icon: UserCheck,
        iconColor: '#16a34a',
        iconBg: '#F0FDF4',
    },
];

export const captainQuickActions: CaptainQuickAction[] = [
    {
        title: 'Update Profile',
        description: 'Edit your professional information',
        icon: User,
        iconColor: '#2563eb',
        iconBg: '#EFF6FF',
        href: '/my-profile',
    },
    {
        title: 'Browse Yachts',
        description: 'Find matching yacht opportunities',
        icon: Ship,
        iconColor: '#0D314D',
        iconBg: '#F1F5F9',
        href: '/yachts-match',
    },
    {
        title: 'Manage Availability',
        description: 'Set your schedule and preferences',
        icon: CalendarDays,
        iconColor: '#16a34a',
        iconBg: '#F0FDF4',
        href: '/yachts-match',
    },
];

export const captainYachts: CaptainYacht[] = [
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
    {
        name: 'Harbor Light',
        spec: 'Motor • 58ft',
        marina: 'Biscayne Bay Marina',
        image: '/images/home/about.jpg',
    },
    {
        name: 'Blue Current',
        spec: 'Sail • 54ft',
        marina: 'Palm Beach Harbor',
        image: '/images/home/testimonial.jpg',
    },
];

export const captainRequests: CaptainRequest[] = [
    {
        yachtName: 'Sea Dream',
        yachtSpec: 'Power • 65ft',
        date: 'Apr 20, 2026',
        duration: '09:00 • 6 hours',
        status: 'pending',
    },
    {
        yachtName: 'Ocean Star',
        yachtSpec: 'Power • 62ft',
        date: 'Apr 22, 2026',
        duration: '11:30 • 4 hours',
        status: 'pending',
    },
];
