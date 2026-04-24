import { privacyPreferences } from './account-preferences-data';
import { PreferencesCard, TogglePreferenceRow } from './account-preferences-shared';

export function AccountPreferencesPrivacy() {
    return (
        <PreferencesCard title="Privacy Settings">
            <div className="space-y-6">
                {privacyPreferences.map((preference) => (
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
