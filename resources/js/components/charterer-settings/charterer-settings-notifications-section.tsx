import { useForm, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import {
    PreferenceRow,
    SecondaryButton,
    SettingsSection,
} from './charterer-settings-shared';

type Preferences = {
    email_notifications: boolean;
    sms_notifications: boolean;
    booking_reminders: boolean;
    marketing_emails: boolean;
};

type PageProps = {
    preferences: Preferences;
};

const PREFERENCE_META = [
    {
        key: 'email_notifications' as const,
        title: 'Email Notifications',
        description: 'Receive booking updates and important announcements',
    },
    {
        key: 'sms_notifications' as const,
        title: 'SMS Notifications',
        description: 'Get text alerts for time-sensitive updates',
    },
    {
        key: 'booking_reminders' as const,
        title: 'Booking Reminders',
        description: 'Reminders before your charter date',
    },
    {
        key: 'marketing_emails' as const,
        title: 'Marketing Emails',
        description: 'Special offers and promotions',
    },
];

export function ChartererSettingsNotificationsSection() {
    const { preferences } = usePage<PageProps>().props;

    const { data, setData, patch, processing } = useForm<Preferences>({
        email_notifications: preferences.email_notifications ?? true,
        sms_notifications: preferences.sms_notifications ?? true,
        booking_reminders: preferences.booking_reminders ?? true,
        marketing_emails: preferences.marketing_emails ?? false,
    });

    const handleSave = () => {
        patch(route('charterer-settings.preferences'));
    };

    return (
        <SettingsSection
            title="Notification Preferences"
            icon={<Bell className="h-5 w-5 text-[#3b82f6]" />}
        >
            <div className="space-y-6">
                {PREFERENCE_META.map((pref, index) => (
                    <PreferenceRow
                        key={pref.key}
                        id={pref.key}
                        title={pref.title}
                        description={pref.description}
                        enabled={data[pref.key]}
                        withDivider={index > 0}
                        onChange={(val) => setData(pref.key, val)}
                    />
                ))}
            </div>

            <SecondaryButton
                onClick={handleSave}
                disabled={processing}
                className="mt-6 cursor-pointer bg-[#35ADD5] text-white hover:bg-[#123651] disabled:opacity-50"
            >
                {processing ? 'Saving…' : 'Save Preferences'}
            </SecondaryButton>
        </SettingsSection>
    );
}
