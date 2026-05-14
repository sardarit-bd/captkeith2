import { workPreferenceOptions } from './my-profile-data';
import {
    FieldError,
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
    ToggleField,
} from './profile-form-elements';

interface WorkPreferencesSectionProps {
    data: {
        hourly_rate: string | number;
        travel_radius_miles: string | number;
        can_provide_deckhand: boolean;
        deckhand_hourly_rate: string | number;
    };
    errors: Partial<Record<string, string>>;
    onChange: (field: string, value: string | boolean) => void;
}

export function ProfileWorkPreferencesSection({
    data,
    errors,
    onChange,
}: WorkPreferencesSectionProps) {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Work Preferences"
                description="Your availability and rates"
            />

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Hourly Rate ($) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        min={0}
                        step={0.01}
                        value={data.hourly_rate}
                        onChange={(e) =>
                            onChange('hourly_rate', e.target.value)
                        }
                        placeholder="150"
                    />
                    <FieldError message={errors.hourly_rate} />
                </div>
                <div>
                    <FieldLabel>
                        Travel Radius (miles) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        min={1}
                        value={data.travel_radius_miles}
                        onChange={(e) =>
                            onChange('travel_radius_miles', e.target.value)
                        }
                        placeholder="50"
                    />
                    <FieldError message={errors.travel_radius_miles} />
                </div>
            </div>

            <div className="space-y-4">
                {workPreferenceOptions.map((option) => (
                    <ToggleField
                        key={option.id}
                        id={option.id}
                        label={option.label}
                        checked={
                            option.id === 'can_provide_deckhand'
                                ? data.can_provide_deckhand
                                : false
                        }
                        onChange={(checked) => onChange(option.id, checked)}
                    />
                ))}
            </div>

            {data.can_provide_deckhand && (
                <div className="mt-6">
                    <FieldLabel>Deckhand Hourly Rate ($)</FieldLabel>
                    <TextInput
                        type="number"
                        min={0}
                        step={0.01}
                        value={data.deckhand_hourly_rate}
                        onChange={(e) =>
                            onChange('deckhand_hourly_rate', e.target.value)
                        }
                        placeholder="75"
                        className="max-w-xs"
                    />
                    <FieldError message={errors.deckhand_hourly_rate} />
                </div>
            )}
        </section>
    );
}
