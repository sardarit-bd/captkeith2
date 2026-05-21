import { endorsementOptions, licenseTypes } from './my-profile-data';
import {
    FieldError,
    FieldLabel,
    RequiredAsterisk,
    RatingSelectInput,
    SectionHeader,
    SelectInput,
    TextInput,
    UploadBox,
} from './profile-form-elements';

interface LicenseSectionProps {
    data: {
        license_type: string;
        endorsement: string;
        tonnage_rating: string | number;
        years_experience: string | number;
    };
    errors: Partial<Record<string, string>>;
    licenseDocUrl: string | null;
    licenseDocFile: File | null;
    resumeUrl: string | null;
    resumeFile: File | null;
    onLicenseDocSelect: (file: File | null) => void;
    onResumeSelect: (file: File | null) => void;
    onChange: (field: string, value: string) => void;
}

const tonnageOptions = [25, 50, 100, 200, 500, 1600].map((t) => ({
    value: String(t),
    label: `${t} Ton`,
}));

export function ProfileLicenseSection({
    data,
    errors,
    licenseDocUrl,
    licenseDocFile,
    resumeUrl,
    resumeFile,
    onLicenseDocSelect,
    onResumeSelect,
    onChange,
}: LicenseSectionProps) {
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
                    <SelectInput
                        value={data.license_type}
                        onChange={(v) => onChange('license_type', v)}
                        options={licenseTypes}
                    />
                    <FieldError message={errors.license_type} />
                </div>
                <div>
                    <FieldLabel>
                        Endorsement <RequiredAsterisk />
                    </FieldLabel>
                    <SelectInput
                        value={data.endorsement}
                        onChange={(v) => onChange('endorsement', v)}
                        options={endorsementOptions}
                    />
                    <FieldError message={errors.endorsement} />
                </div>
            </div>

            <div className="mb-8">
                <FieldLabel>License Document</FieldLabel>
                <UploadBox
                    title="Upload license scan or photo"
                    subtitle="PDF, JPG, PNG (Max 5MB)"
                    buttonLabel={
                        licenseDocFile ? 'Change Document' : 'Upload Document'
                    }
                    existingUrl={licenseDocUrl}
                    existingName={licenseDocFile?.name ?? null}
                    onFileSelect={onLicenseDocSelect}
                    accept="application/pdf,image/jpeg,image/png"
                />
                <FieldError message={errors.license_doc} />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Tonnage Rating <RequiredAsterisk />
                    </FieldLabel>
                    <RatingSelectInput
                        value={String(data.tonnage_rating)}
                        onChange={(v) => onChange('tonnage_rating', v)}
                        options={tonnageOptions}
                    />
                    <FieldError message={errors.tonnage_rating} />
                </div>
                <div>
                    <FieldLabel>
                        Years of Experience <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="number"
                        min={0}
                        value={data.years_experience}
                        onChange={(e) =>
                            onChange('years_experience', e.target.value)
                        }
                    />
                    <FieldError message={errors.years_experience} />
                </div>
            </div>

            <div>
                <FieldLabel>Resume / CV</FieldLabel>
                <UploadBox
                    title="Upload your resume or CV"
                    subtitle="PDF, DOC, DOCX (Max 5MB)"
                    buttonLabel={resumeFile ? 'Change File' : 'Choose File'}
                    existingUrl={resumeUrl}
                    existingName={resumeFile?.name ?? null}
                    onFileSelect={onResumeSelect}
                    accept="application/pdf,.doc,.docx"
                />
                <FieldError message={errors.resume} />
            </div>
        </section>
    );
}
