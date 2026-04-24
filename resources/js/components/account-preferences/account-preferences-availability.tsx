import { availabilityPreferences } from './account-preferences-data';
import { PreferencesCard, TogglePreferenceRow } from './account-preferences-shared';

export function AccountPreferencesAvailability() {
    return (
        <PreferencesCard title="Availability Preferences">
            <div className="space-y-6">
                {availabilityPreferences.map((preference) => (
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
