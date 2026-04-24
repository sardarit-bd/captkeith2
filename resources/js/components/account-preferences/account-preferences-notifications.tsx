import { notificationPreferences } from './account-preferences-data';
import { PreferencesCard, TogglePreferenceRow } from './account-preferences-shared';

export function AccountPreferencesNotifications() {
    return (
        <PreferencesCard title="Notification Preferences">
            <div className="space-y-6">
                {notificationPreferences.map((preference) => (
                    <TogglePreferenceRow
                        key={preference.id}
                        id={preference.id}
                        title={preference.title}
                        description={preference.description}
                        enabled={preference.enabled}
                    />
                ))}
            </div>
        </PreferencesCard>
    );
}
