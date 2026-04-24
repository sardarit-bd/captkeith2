import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    FileText,
    Ship,
    UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ChartererStatCard = {
    label: string;
    value: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
};

export type ChartererUpcomingBooking = {
    yachtName: string;
    statusLabel: string;
    progressLabel: string;
    date: string;
    time: string;
    location: string;
    nextStep: string;
};

export type ChartererActivity = {
    title: string;
    description: string;
    timestamp: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
    iconCircleBorder: string;
    cardBg: string;
    cardBorder: string;
};

export type ChartererCompletedCharter = {
    yachtName: string;
    captain: string;
    date: string;
    rating: number;
};

export const chartererStats: ChartererStatCard[] = [
    {
        label: 'Total Booking',
        value: '12',
        icon: Calendar,
        iconColor: '#a855f7',
        iconBg: '#faf5ff',
    },
    {
        label: 'Selected Captain',
        value: '1',
        icon: UserCheck,
        iconColor: '#f97316',
        iconBg: '#fff7ed',
    },
    {
        label: 'Selected Yacht',
        value: '1',
        icon: Ship,
        iconColor: '#3b82f6',
        iconBg: '#eff6ff',
    },
    {
        label: 'Pending Bookings',
        value: '2',
        icon: AlertCircle,
        iconColor: '#ea580c',
        iconBg: '#fff7ed',
    },
];

export const chartererUpcomingBooking: ChartererUpcomingBooking = {
    yachtName: 'Ocean Star',
    statusLabel: 'Pending Selection',
    progressLabel: 'In Progress',
    date: 'April 15, 2026',
    time: '10:00 AM - 4:00 PM',
    location: 'Miami Beach Marina',
    nextStep: 'Next: Select Captain',
};

export const chartererRecentActivities: ChartererActivity[] = [
    {
        title: 'Yacht Selected',
        description: 'You selected "Ocean Star" for your charter',
        timestamp: '2 hours ago',
        icon: Ship,
        iconColor: '#3b82f6',
        iconBg: '#ffffff',
        iconCircleBorder: '#dbeafe',
        cardBg: '#eff6ff',
        cardBorder: '#dbeafe',
    },
    {
        title: 'Profile Completed',
        description: 'Your charterer profile is now complete',
        timestamp: '1 day ago',
        icon: CheckCircle2,
        iconColor: '#22c55e',
        iconBg: '#ffffff',
        iconCircleBorder: '#dcfce7',
        cardBg: '#f0fdf4',
        cardBorder: '#dcfce7',
    },
    {
        title: 'Contract Available',
        description: 'Your contract for "Sea Breeze" is ready to download',
        timestamp: '3 days ago',
        icon: FileText,
        iconColor: '#a855f7',
        iconBg: '#ffffff',
        iconCircleBorder: '#f3e8ff',
        cardBg: '#faf5ff',
        cardBorder: '#ede9fe',
    },
];

export const chartererCompletedCharters: ChartererCompletedCharter[] = [
    {
        yachtName: 'Sea Breeze',
        captain: 'Captain Michael Thompson',
        date: 'March 10, 2026',
        rating: 5,
    },
    {
        yachtName: 'Blue Horizon',
        captain: 'Captain Sarah Mitchell',
        date: 'February 22, 2026',
        rating: 5,
    },
];
