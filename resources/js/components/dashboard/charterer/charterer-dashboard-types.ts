export interface ChartererStats {
    totalBooked: number;
    totalCompleted: number;
    totalPending: number;
    totalSpent: number;
}

export interface ChartererUpcomingBookingData {
    id: string;
    yachtName: string;
    yachtImage: string | null;
    status: string;
    date: string;
    startTime: string;
    duration: string;
    marina: string;
    captainName: string | null;
}

export interface ChartererActivityItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
}

export interface ChartererCompletedCharterItem {
    id: string;
    yachtName: string;
    captain: string;
    date: string;
    rating: number;
}

export interface ChartererDashboardData {
    role: string;
    stats: ChartererStats;
    upcomingBooking: ChartererUpcomingBookingData | null;
    recentActivity: ChartererActivityItem[];
    completedCharters: ChartererCompletedCharterItem[];
}
