import type { DeckhandProfileFormData } from './deckhand-profile-form';
import {
    FieldError,
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
    ToggleField,
} from './profile-form-elements';

type Props = {
    data: DeckhandProfileFormData;
    errors: Partial<Record<keyof DeckhandProfileFormData, string>>;
    setData: <K extends keyof DeckhandProfileFormData>(
        key: K,
        value: DeckhandProfileFormData[K],
    ) => void;
};

export function DeckhandProfileWorkPreferencesSection({
    data,
    errors,
    setData,
}: Props) {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Work Preferences"
                description="Your availability and compensation"
            />

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Hourly Rate ($) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        placeholder="25.00"
                        min="0"
                        step="0.01"
                        value={data.hourly_rate}
                        onChange={(e) => setData('hourly_rate', e.target.value)}
                    />
                    <p className="mt-1.5 text-[11px] text-[#6b7280]">
                        Your desired hourly rate in USD
                    </p>
                    <FieldError message={errors.hourly_rate} />
                </div>
                <div>
                    <FieldLabel>
                        Travel Radius (miles) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        placeholder="50"
                        min="0"
                        value={data.travel_radius_miles}
                        onChange={(e) =>
                            setData('travel_radius_miles', e.target.value)
                        }
                    />
                    <p className="mt-1.5 text-[11px] text-[#6b7280]">
                        How far you&apos;re willing to travel from your zip code
                    </p>
                    <FieldError message={errors.travel_radius_miles} />
                </div>
            </div>
        </section>
    );
}
