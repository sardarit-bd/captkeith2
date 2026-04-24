import {
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
    ToggleField,
} from './profile-form-elements';

export function DeckhandProfileWorkPreferencesSection() {
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
                    <TextInput type="number" placeholder="25.00" min="0" />
                    <p className="mt-1.5 text-[11px] text-[#6b7280]">
                        Your desired hourly rate in USD
                    </p>
                </div>
                <div>
                    <FieldLabel>
                        Travel Radius (miles) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="number" placeholder="50" min="0" />
                    <p className="mt-1.5 text-[11px] text-[#6b7280]">
                        How far you&apos;re willing to travel from your zip code
                    </p>
                </div>
            </div>

            <ToggleField
                id="deckhand-currently-available"
                label="Currently available for work"
                defaultChecked
            />
        </section>
    );
}
