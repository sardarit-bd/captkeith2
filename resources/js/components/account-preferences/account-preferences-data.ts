export type TogglePreference = {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
};

export type UnavailableDate = {
    id: string;
    date_from: string;
    date_to: string;
    reason: string;
};

export type CaptainPreferences = {
    is_available: boolean;
    weekday_availability: boolean;
    weekend_availability: boolean;
    last_minute_charters: boolean;
    multi_day_charters: boolean;
    charter_notifications: boolean;
    owner_notification: boolean;
    email_notifications: boolean;
    sms_notifications: boolean;
    profile_visibility: boolean;
    show_rating: boolean;
    unavailable_dates: UnavailableDate[];
};
