import { CheckCircle2, Clock3, MessageSquare, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type DeckhandStatCard = {
    label: string;
    value: string;
    valueClassName: string;
    icon?: LucideIcon;
    hint?: string;
    hintClassName: string;
    actionLabel?: string;
};

export type DeckhandPendingRequest = {
    id: string;
    yachtName: string;
    requestedBy: string;
    requesterRole: 'Captain' | 'Owner';
    yachtSpec: string;
    duration: string;
    skills: string[];
    dateTime: string;
    rate: string;
    avatar: string;
    status: 'Pending';
};

export type DeckhandConfirmedCharter = {
    id: string;
    yachtName: string;
    ownerName: string;
    yachtSpec: string;
    location: string;
    dateTime: string;
    rate: string;
    avatar: string;
};

export type DeckhandMessage = {
    id: string;
    sender: string;
    role: 'Owner' | 'Captain';
    avatar: string;
    body: string;
    time: string;
    unread?: boolean;
};

export const deckhandStats: DeckhandStatCard[] = [
    {
        label: 'Pending Requests',
        value: '2',
        valueClassName: 'text-[#0f172a]',
        icon: Clock3,
        hint: 'Awaiting response',
        hintClassName: 'text-orange-500',
    },
    {
        label: 'Accepted',
        value: '1',
        valueClassName: 'text-green-600',
        icon: CheckCircle2,
        hint: 'Confirmed charters',
        hintClassName: 'text-green-600',
    },
    {
        label: 'Messages',
        value: '1',
        valueClassName: 'text-[#0f172a]',
        icon: MessageSquare,
        hint: 'Unread messages',
        hintClassName: 'text-[#6b7280]',
    },
    {
        label: 'Profile Status',
        value: 'Active',
        valueClassName: 'text-green-600 text-[16px]',
        icon: User,
        actionLabel: 'Edit Profile',
        hintClassName: 'text-[#0f172a]',
    },
];

export const deckhandPendingRequests: DeckhandPendingRequest[] = [
    {
        id: 'sea-princess-john-smith',
        yachtName: 'Sea Princess',
        requestedBy: 'Captain John Smith',
        requesterRole: 'Captain',
        yachtSpec: 'Motor Yacht • 75ft',
        duration: 'Duration: 8 hours',
        skills: ['Server Experience', '3+ Years Experience'],
        dateTime: 'May 15, 2026 at 9:00 AM',
        rate: '$30/hour',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        status: 'Pending',
    },
    {
        id: 'ocean-dream-sarah-johnson',
        yachtName: 'Ocean Dream',
        requestedBy: 'Sarah Johnson',
        requesterRole: 'Owner',
        yachtSpec: 'Sailing Yacht • 65ft',
        duration: 'Duration: 6 hours',
        skills: ['Bartending Experience', 'Sailing Experience'],
        dateTime: 'May 18, 2026 at 2:00 PM',
        rate: '$28/hour',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'Pending',
    },
];

export const deckhandConfirmedCharters: DeckhandConfirmedCharter[] = [
    {
        id: 'wave-rider-michael-torres',
        yachtName: 'Wave Rider',
        ownerName: 'Michael Torres',
        yachtSpec: 'Motor Yacht • 80ft',
        location: 'Location: Key West',
        dateTime: 'May 12, 2026 at 10:00 AM',
        rate: '$32/hour',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    },
];

export const deckhandMessages: DeckhandMessage[] = [
    {
        id: 'message-sarah-johnson',
        sender: 'Sarah Johnson',
        role: 'Owner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        body: 'Are you available for the charter on the 18th?',
        time: '10 mins ago',
        unread: true,
    },
    {
        id: 'message-john-smith',
        sender: 'Captain John Smith',
        role: 'Captain',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        body: 'Thanks for accepting! Looking forward to working with you.',
        time: '2 hours ago',
    },
];
