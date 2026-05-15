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
        key: 'weekday_availability',
        title: 'Weekday Availability',
        description: 'Available Monday - Friday',
    },
    {
        key: 'weekend_availability',
        title: 'Weekend Availability',
        description: 'Available Saturday - Sunday',
    },
    {
        key: 'last_minute_charters',
        title: 'Last Minute Charters',
        description: 'Accept charters within 24 hours notice',
    },
    {
        key: 'multi_day_charters',
        title: 'Multi-Day Charters',
        description: 'Available for overnight and multi-day trips',
    },
];

export function AccountPreferencesAvailability({ prefs, onToggle }: Props) {
    return (
        <PreferencesCard title="Availability Preferences">
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
