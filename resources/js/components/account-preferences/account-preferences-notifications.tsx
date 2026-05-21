import type { CaptainPreferences } from './account-preferences-data';
import {
    PreferencesCard,
    TogglePreferenceRow,
} from './account-preferences-shared';

interface Props {
    prefs: CaptainPreferences;
    onToggle: (
        key: keyof Omit<CaptainPreferences, 'unavailable_dates'>,
    ) => (value: boolean) => void;
}

const ROWS: {
    key: keyof Omit<CaptainPreferences, 'unavailable_dates'>;
    title: string;
    description: string;
}[] = [
    {
        key: 'charter_notifications',
        title: 'Charter Notifications',
        description: 'Receive notifications for new charter opportunities',
    },
    {
        key: 'owner_notification',
        title: 'Owner Notification',
        description: 'Get notified when owners approve your requests',
    },
    {
        key: 'email_notifications',
        title: 'Email Notifications',
        description: 'Receive notifications via email',
    },
    {
        key: 'sms_notifications',
        title: 'SMS Notifications',
        description: 'Receive notifications via SMS',
    },
];

export function AccountPreferencesNotifications({ prefs, onToggle }: Props) {
    return (
        <PreferencesCard title="Notification Preferences">
            <div className="space-y-6">
                {ROWS.map((row) => (
                    <TogglePreferenceRow
                        key={row.key}
                        id={row.key}
                        title={row.title}
                        description={row.description}
                        enabled={prefs[row.key] as boolean}
                        onChange={onToggle(row.key)}
                    />
                ))}
            </div>
        </PreferencesCard>
    );
}
