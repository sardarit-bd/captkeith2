import { Upload, User } from 'lucide-react';
import type { DeckhandProfileFormData } from './deckhand-profile-form';
import {
    FieldError,
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
} from './profile-form-elements';

type Props = {
    data: DeckhandProfileFormData;
    errors: Partial<Record<keyof DeckhandProfileFormData, string>>;
    setData: <K extends keyof DeckhandProfileFormData>(
        key: K,
        value: DeckhandProfileFormData[K],
    ) => void;
};

export function DeckhandProfilePersonalInformationSection({
    data,
    errors,
    setData,
}: Props) {
    const photoPreview = data.photo
        ? URL.createObjectURL(data.photo)
        : data._photo_url;

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
    };

    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Personal Information"
                description="Your basic contact details"
            />

            <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af] shadow-inner">
                    {photoPreview ? (
                        <img
                            src={photoPreview}
                            alt="Profile photo"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <User className="h-8 w-8" />
                    )}
                </div>
                <div>
                    <label className="mb-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]">
                        <Upload className="h-4 w-4" />
                        Upload Photo
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoChange}
                        />
                    </label>
                    <p className="text-[11px] tracking-wider text-[#9ca3af] uppercase">
                        JPG, PNG or GIF (Max 2MB)
                    </p>
                    <FieldError message={errors.photo} />
                </div>
            </div>

            <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <FieldLabel>
                            Full Name <RequiredAsterisk />
                        </FieldLabel>
                        <TextInput
                            type="text"
                            placeholder="Enter your full name"
                            value={data.full_name}
                            onChange={(e) =>
                                setData('full_name', e.target.value)
                            }
                        />
                        <FieldError message={errors.full_name} />
                    </div>
                    <div>
                        <FieldLabel>Phone Number</FieldLabel>
                        <TextInput
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <FieldError message={errors.phone} />
                    </div>
                </div>

                <div>
                    <FieldLabel>Street Address</FieldLabel>
                    <TextInput
                        type="text"
                        placeholder="123 Main Street"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    <FieldError message={errors.address} />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                        <FieldLabel>City</FieldLabel>
                        <TextInput
                            type="text"
                            placeholder="Miami"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                        />
                        <FieldError message={errors.city} />
                    </div>
                    <div>
                        <FieldLabel>State</FieldLabel>
                        <TextInput
                            type="text"
                            placeholder="FL"
                            value={data.state}
                            onChange={(e) => setData('state', e.target.value)}
                        />
                        <FieldError message={errors.state} />
                    </div>
                    <div>
                        <FieldLabel>Zip Code</FieldLabel>
                        <TextInput
                            type="text"
                            placeholder="33101"
                            value={data.zip_code}
                            onChange={(e) =>
                                setData('zip_code', e.target.value)
                            }
                        />
                        <FieldError message={errors.zip_code} />
                    </div>
                </div>
            </div>
        </section>
    );
}
