import { router, usePage } from '@inertiajs/react';

import { useCallback, useState } from 'react';

import { AccountPreferencesAvailability } from './account-preferences-availability';
import { AccountPreferencesCurrentStatus } from './account-preferences-current-status';
import type { CaptainPreferences } from './account-preferences-data';
import { AccountPreferencesManageAvailability } from './account-preferences-manage-availability';
import { AccountPreferencesNotifications } from './account-preferences-notifications';
import { AccountPreferencesPrivacy } from './account-preferences-privacy';

type PageProps = {
    preferences: CaptainPreferences;
};

type ToggleKey = keyof Omit<CaptainPreferences, 'unavailable_dates'>;

export function AccountPreferencesPageContent() {
    const { preferences: initial } = usePage<PageProps>().props;

    const [prefs, setPrefs] = useState<CaptainPreferences>(initial);

    const handleToggle = useCallback(
        (key: ToggleKey) => (value: boolean) => {
            const next: CaptainPreferences = { ...prefs, [key]: value };
            setPrefs(next);

            router.patch(
                '/account-preferences/toggles',
                {
                    is_available: next.is_available,
                    weekday_availability: next.weekday_availability,
                    weekend_availability: next.weekend_availability,
                    last_minute_charters: next.last_minute_charters,
                    multi_day_charters: next.multi_day_charters,
                    charter_notifications: next.charter_notifications,
                    owner_notification: next.owner_notification,
                    email_notifications: next.email_notifications,
                    sms_notifications: next.sms_notifications,
                    profile_visibility: next.profile_visibility,
                    show_rating: next.show_rating,
                },
                { preserveScroll: true },
            );
        },
        [prefs],
    );

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
                <div className="mx-auto max-w-250 space-y-6">
                    <AccountPreferencesCurrentStatus
                        isAvailable={prefs.is_available}
                        onToggle={handleToggle('is_available')}
                    />
                    <AccountPreferencesAvailability
                        prefs={prefs}
                        onToggle={handleToggle}
                    />
                    <AccountPreferencesManageAvailability
                        unavailableDates={prefs.unavailable_dates}
                    />
                    <AccountPreferencesNotifications
                        prefs={prefs}
                        onToggle={handleToggle}
                    />
                    <AccountPreferencesPrivacy
                        prefs={prefs}
                        onToggle={handleToggle}
                    />
                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
}
