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
        key: 'profile_visibility',
        title: 'Profile Visibility',
        description: 'Allow vessel owners to see your full profile',
    },
    {
        key: 'show_rating',
        title: 'Show Rating',
        description: 'Display your rating on your profile',
    },
];

export function AccountPreferencesPrivacy({ prefs, onToggle }: Props) {
    return (
        <PreferencesCard title="Privacy Settings">
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
