export type TogglePreference = {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
};

export type SecurityAction = {
    id: string;
    title: string;
    description: string;
    actionLabel: string;
};

export const notificationPreferences: TogglePreference[] = [
    {
        id: 'email-notifications',
        title: 'Email Notifications',
        description: 'Receive booking updates and important announcements',
        enabled: true,
    },
    {
        id: 'sms-notifications',
        title: 'SMS Notifications',
        description: 'Get text alerts for time-sensitive updates',
        enabled: true,
    },
    {
        id: 'booking-reminders',
        title: 'Booking Reminders',
        description: 'Reminders before your charter date',
        enabled: true,
    },
    {
        id: 'marketing-emails',
        title: 'Marketing Emails',
        description: 'Special offers and promotions',
        enabled: false,
    },
];

export const securityActions: SecurityAction[] = [
    {
        id: 'change-password',
        title: 'Change Password',
        description: 'Update your account password',
        actionLabel: 'Change',
    },
    {
        id: 'two-factor-auth',
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security',
        actionLabel: 'Enable',
    },
    {
        id: 'login-history',
        title: 'Login History',
        description: 'View recent account activity',
        actionLabel: 'View',
    },
];

export const paymentMethod = {
    brand: 'VISA',
    title: 'Visa •••• 4242',
    subtitle: 'Expires 12/2026',
};

export const dangerZoneActions = {
    deactivate: {
        title: 'Deactivate Account',
        description: 'Temporarily disable your account',
        actionLabel: 'Deactivate',
    },
    delete: {
        title: 'Delete Account',
        description: 'Permanently delete your account and all data',
        actionLabel: 'Delete',
    },
};
