import {
    TextArea,
    TextInput,
    ToggleField,
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
} from './profile-form-elements';
import { deckhandExperienceOptions } from './deckhand-profile-data';

export function DeckhandProfileQualificationsSection() {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Qualifications & Experience"
                description="Your professional experience and skills"
            />

            <div className="space-y-6">
                <div>
                    <FieldLabel>
                        Years as Deckhand <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        step="0.5"
                        placeholder="3.5"
                        min="0"
                    />
                </div>

                <div>
                    <FieldLabel>Additional Experience</FieldLabel>
                    <div className="space-y-3">
                        {deckhandExperienceOptions.map((option) => (
                            <ToggleField
                                key={option.id}
                                id={option.id}
                                label={option.label}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <FieldLabel>Professional Bio / Summary</FieldLabel>
                    <TextArea
                        rows={4}
                        placeholder="Tell yacht owners about your experience, skills, and what makes you a great deckhand..."
                    />
                </div>
            </div>
        </section>
    );
}
