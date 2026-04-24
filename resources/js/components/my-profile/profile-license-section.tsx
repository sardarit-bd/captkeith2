import { Award } from 'lucide-react';
import {
    additionalQualifications,
    endorsementOptions,
    licenseTypes,
    ratingOptions,
} from './my-profile-data';
import {
    FieldLabel,
    RequiredAsterisk,
    RatingSelectInput,
    SectionHeader,
    SelectInput,
    TextInput,
    ToggleField,
    UploadBox,
} from './profile-form-elements';

export function ProfileLicenseSection() {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="License & Qualifications"
                description="Your maritime credentials"
            />

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        License Type <RequiredAsterisk />
                    </FieldLabel>
                    <SelectInput defaultValue="200ton" options={licenseTypes} />
                </div>
                <div>
                    <FieldLabel>
                        License Number <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="text" defaultValue="123456" />
                </div>
            </div>

            <div className="mb-8">
                <FieldLabel>License Document</FieldLabel>
                <UploadBox
                    title="Upload license scan or photo"
                    buttonLabel="Upload Document"
                />
            </div>

            <div className="mb-8">
                <FieldLabel>Endorsements</FieldLabel>
                <div className="space-y-3">
                    {endorsementOptions.map((option) => (
                        <ToggleField
                            key={option.id}
                            id={option.id}
                            label={option.label}
                            defaultChecked={option.checked}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Rating <RequiredAsterisk />
                    </FieldLabel>
                    <RatingSelectInput
                        defaultValue="master"
                        options={ratingOptions}
                    />
                </div>
                <div>
                    <FieldLabel>
                        Years of Experience <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="number" defaultValue={12} />
                </div>
            </div>

            <div className="mb-8">
                <FieldLabel>Additional Qualifications</FieldLabel>
                <div className="mb-3 flex flex-wrap gap-2">
                    {additionalQualifications.map((qualification) => (
                        <span
                            key={qualification}
                            className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1.5 text-[12px] font-medium text-[#374151] shadow-sm"
                        >
                            <Award className="h-3.5 w-3.5 text-[#6b7280]" />
                            {qualification}
                        </span>
                    ))}
                </div>
                <button
                    type="button"
                    className="text-sm font-semibold text-[#111827] transition-colors hover:text-[#0a273f]"
                >
                    + Add Qualification
                </button>
            </div>

            <div>
                <FieldLabel>Resume / CV</FieldLabel>
                <UploadBox
                    title="Upload your resume or CV"
                    subtitle="PDF, DOC, DOCX (Max 5MB)"
                    buttonLabel="Choose File"
                />
            </div>
        </section>
    );
}
