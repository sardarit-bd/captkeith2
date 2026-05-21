import { Upload, User } from 'lucide-react';
import { useRef } from 'react';
import {
    FieldError,
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextArea,
    TextInput,
} from './profile-form-elements';

interface PersonalInformationSectionProps {
    data: {
        full_name: string;
        email: string;
        phone: string;
        city: string;
        state: string;
        zip_code: string;
        address: string;
        geographic_area: string;
        bodies_of_water: string;
        boats_worked_on: string;
    };
    errors: Partial<Record<string, string>>;
    photoUrl: string | null;
    photoFile: File | null;
    onPhotoSelect: (file: File | null) => void;
    onChange: (field: string, value: string) => void;
}

export function ProfilePersonalInformationSection({
    data,
    errors,
    photoUrl,
    photoFile,
    onPhotoSelect,
    onChange,
}: PersonalInformationSectionProps) {
    const photoInputRef = useRef<HTMLInputElement>(null);

    const previewUrl = photoFile
        ? URL.createObjectURL(photoFile)
        : (photoUrl ?? null);

    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Personal Information"
                description="Your basic contact details"
            />

            {/* Avatar */}
            <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af]">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <User className="h-8 w-8" />
                    )}
                </div>
                <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onPhotoSelect(e.target.files?.[0] ?? null)}
                />
                <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-xs font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <Upload className="h-4 w-4" />
                    {photoFile ? 'Change Photo' : 'Upload Photo'}
                </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Full Name <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="text"
                        value={data.full_name}
                        onChange={(e) => onChange('full_name', e.target.value)}
                        placeholder="Captain James Morrison"
                    />
                    <FieldError message={errors.full_name} />
                </div>
                <div>
                    <FieldLabel>Phone</FieldLabel>
                    <TextInput
                        type="tel"
                        value={data.phone}
                        onChange={(e) => onChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                    />
                    <FieldError message={errors.phone} />
                </div>
                <div>
                    <FieldLabel>
                        Address <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="text"
                        value={data.address}
                        onChange={(e) => onChange('address', e.target.value)}
                        placeholder="123 Marina Blvd"
                    />
                    <FieldError message={errors.address} />
                </div>
                <div>
                    <FieldLabel>
                        City <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="text"
                        value={data.city}
                        onChange={(e) => onChange('city', e.target.value)}
                        placeholder="Miami"
                    />
                    <FieldError message={errors.city} />
                </div>
                <div>
                    <FieldLabel>
                        State <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="text"
                        value={data.state}
                        onChange={(e) => onChange('state', e.target.value)}
                        placeholder="FL"
                    />
                    <FieldError message={errors.state} />
                </div>
                <div>
                    <FieldLabel>
                        ZIP Code <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput
                        type="text"
                        value={data.zip_code}
                        onChange={(e) => onChange('zip_code', e.target.value)}
                        placeholder="33101"
                    />
                    <FieldError message={errors.zip_code} />
                </div>
            </div>

            <div className="mb-6">
                <FieldLabel>Geographic Area / Bio</FieldLabel>
                <TextArea
                    rows={3}
                    value={data.geographic_area}
                    onChange={(e) =>
                        onChange('geographic_area', e.target.value)
                    }
                    placeholder="Describe the areas you typically operate in…"
                />
                <FieldError message={errors.geographic_area} />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>Boats Worked On</FieldLabel>
                    <TextArea
                        rows={2}
                        value={data.boats_worked_on}
                        onChange={(e) =>
                            onChange('boats_worked_on', e.target.value)
                        }
                        placeholder="e.g. Sailing yachts, motor yachts, catamarans…"
                    />
                    <FieldError message={errors.boats_worked_on} />
                </div>
                <div>
                    <FieldLabel>Bodies of Water</FieldLabel>
                    <TextArea
                        rows={2}
                        value={data.bodies_of_water}
                        onChange={(e) =>
                            onChange('bodies_of_water', e.target.value)
                        }
                        placeholder="e.g. Atlantic, Gulf of Mexico, Caribbean…"
                    />
                    <FieldError message={errors.bodies_of_water} />
                </div>
            </div>
        </section>
    );
}
