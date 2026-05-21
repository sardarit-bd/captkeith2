export interface DeckhandStats {
    pendingRequests: number;
    confirmedCharters: number;
    unreadMessages: number;
    profileActive: boolean;
}

export interface DeckhandPendingRequestData {
    id: string;
    yachtName: string;
    requestedBy: string;
    requesterRole: 'Captain' | 'Owner';
    yachtType: string;
    yachtLength: string | null;
    duration: string;
    skills: string[];
    date: string;
    startTime: string;
    rate: string;
}

export interface DeckhandConfirmedCharterData {
    id: string;
    yachtName: string;
    captainName: string | null;
    yachtType: string;
    yachtLength: string | null;
    marina: string;
    date: string;
    startTime: string;
    duration: string;
    rate: string;
}

export interface DeckhandMessageData {
    id: string;
    sender: string;
    role: string;
    body: string;
    time: string;
    unread: boolean;
}

export interface DeckhandDashboardData {
    role: string;
    stats: DeckhandStats;
    pendingRequests: DeckhandPendingRequestData[];
    confirmedCharters: DeckhandConfirmedCharterData[];
    recentMessages: DeckhandMessageData[];
}
