export type TogglePreference = {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
};

export type UnavailableDate = {
    id: string;
    dateRange: string;
    reason: string;
};

export const currentStatus = {
    title: 'Currently Available',
    description: 'You will receive charter notifications',
    enabled: true,
};

export const availabilityPreferences: TogglePreference[] = [
    {
        id: 'weekday-availability',
        title: 'Weekday Availability',
        description: 'Available Monday - Friday',
        enabled: true,
    },
    {
        id: 'weekend-availability',
        title: 'Weekend Availability',
        description: 'Available Saturday - Sunday',
        enabled: true,
    },
    {
        id: 'last-minute-charters',
        title: 'Last Minute Charters',
        description: 'Accept charters within 24 hours notice',
        enabled: false,
    },
    {
        id: 'multi-day-charters',
        title: 'Multi-Day Charters',
        description: 'Available for overnight and multi-day trips',
        enabled: true,
    },
];

export const unavailableDates: UnavailableDate[] = [
    {
        id: 'date-1',
        dateRange: 'April 10, 2026 - April 15, 2026',
        reason: 'Personal vacation',
    },
    {
        id: 'date-2',
        dateRange: 'May 1, 2026 - May 3, 2026',
        reason: 'Training course',
    },
];

export const notificationPreferences: TogglePreference[] = [
    {
        id: 'charter-notifications',
        title: 'Charter Notifications',
        description: 'Receive notifications for new charter opportunities',
        enabled: true,
    },
    {
        id: 'owner-notification',
        title: 'Owner Notification',
        description: 'Get notified when owners approve your requests',
        enabled: true,
    },
    {
        id: 'email-notifications',
        title: 'Email Notifications',
        description: 'Receive notifications via email',
        enabled: true,
    },
    {
        id: 'sms-notifications',
        title: 'SMS Notifications',
        description: 'Receive notifications via SMS',
        enabled: false,
    },
];

export const privacyPreferences: TogglePreference[] = [
    {
        id: 'profile-visibility',
        title: 'Profile Visibility',
        description: 'Allow vessel owners to see your full profile',
        enabled: true,
    },
    {
        id: 'show-rating',
        title: 'Show Rating',
        description: 'Display your rating on your profile',
        enabled: true,
    },
];
