import { workPreferenceOptions } from './my-profile-data';
import {
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
    ToggleField,
} from './profile-form-elements';

export function ProfileWorkPreferencesSection() {
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
                    <TextInput type="number" defaultValue={150} />
                </div>
                <div>
                    <FieldLabel>
                        Travel Radius (miles) <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="number" defaultValue={50} />
                </div>
            </div>

            <div className="space-y-4">
                {workPreferenceOptions.map((option) => (
                    <ToggleField
                        key={option.id}
                        id={option.id}
                        label={option.label}
                        defaultChecked={option.checked}
                    />
                ))}
            </div>
        </section>
    );
}
