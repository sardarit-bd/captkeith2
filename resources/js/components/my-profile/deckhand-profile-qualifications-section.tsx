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

export function DeckhandProfileQualificationsSection({
    data,
    errors,
    setData,
}: Props) {
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
                        value={data.years_experience}
                        onChange={(e) =>
                            setData('years_experience', e.target.value)
                        }
                    />
                    <FieldError message={errors.years_experience} />
                </div>

                <div>
                    <FieldLabel>Additional Experience</FieldLabel>
                    <div className="space-y-3">
                        <ToggleField
                            id="server-experience"
                            label="Server Experience"
                            checked={data.has_server_experience}
                            onChange={(checked) =>
                                setData('has_server_experience', checked)
                            }
                        />
                        <ToggleField
                            id="bartending-experience"
                            label="Bartending Experience"
                            checked={data.has_bartending_experience}
                            onChange={(checked) =>
                                setData('has_bartending_experience', checked)
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
