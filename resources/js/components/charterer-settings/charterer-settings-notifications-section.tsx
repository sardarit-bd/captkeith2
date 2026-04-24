import { Bell } from 'lucide-react';
import { notificationPreferences } from './charterer-settings-data';
import {
    PreferenceRow,
    SecondaryButton,
    SettingsSection,
} from './charterer-settings-shared';

export function ChartererSettingsNotificationsSection() {
    return (
        <SettingsSection
            title="Notification Preferences"
            icon={<Bell className="h-5 w-5 text-[#3b82f6]" />}
        >
            <div className="space-y-6">
                {notificationPreferences.map((preference, index) => (
                    <PreferenceRow
                        key={preference.id}
                        id={preference.id}
                        title={preference.title}
                        description={preference.description}
                        enabled={preference.enabled}
                        withDivider={index > 0}
                    />
                ))}
            </div>

            <SecondaryButton className="mt-6 bg-[#0A273F] hover:bg-[#123651] cursor-pointer">
                Save Preferences
            </SecondaryButton>
        </SettingsSection>
    );
}
