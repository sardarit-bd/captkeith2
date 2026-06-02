import { useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    UploadCloud,
    User,
} from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import { save } from '@/routes/charterer/information';
import charterer from '@/routes/charterer/index';

interface Profile {
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    photo_path: string | null;
}

interface Props {
    profile: Profile;
}

interface SharedProps {
    auth: {
        user: {
            email: string;
        };
    };
}

export function ChartererInformationFormCard({ profile }: Props) {
    const { auth } = usePage<SharedProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        zip_code: profile.zip_code,
        photo: null as File | null,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(
        profile.photo_path ?? null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(save.url(), {
            forceFormData: true,
        });
    }

    return (
        <section className="overflow-hidden rounded-[24px] border border-[#edf2f7] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
            <div className="border-b border-[#f3f4f6] p-6 sm:p-8 lg:p-10">
                <header className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                        <User className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827]">
                        Personal Information
                    </h3>
                </header>

                <form
                    id="charterer-information-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField
                            label="First Name"
                            required
                            error={errors.first_name}
                        >
                            <TextInput
                                placeholder="e.g. John"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                                hasError={!!errors.first_name}
                            />
                        </FormField>

                        <FormField
                            label="Last Name"
                            required
                            error={errors.last_name}
                        >
                            <TextInput
                                placeholder="e.g. Doe"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                hasError={!!errors.last_name}
                            />
                        </FormField>
                    </div>

                    <FormField label="Email" required>
                        <InputWithIcon
                            icon={<Mail className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput
                                type="email"
                                placeholder="your@email.com"
                                value={auth.user.email}
                                withIcon
                                readOnly
                            />
                        </InputWithIcon>
                    </FormField>

                    <FormField
                        label="Phone Number"
                        required
                        error={errors.phone}
                    >
                        <InputWithIcon
                            icon={<Phone className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                withIcon
                                hasError={!!errors.phone}
                            />
                        </InputWithIcon>
                    </FormField>

                    <FormField label="Address" required error={errors.address}>
                        <InputWithIcon
                            icon={<MapPin className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput
                                placeholder="123 Ocean Drive"
                                value={data.address}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                withIcon
                                hasError={!!errors.address}
                            />
                        </InputWithIcon>
                    </FormField>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <FormField label="City" required error={errors.city}>
                            <TextInput
                                placeholder="Miami"
                                value={data.city}
                                onChange={(e) =>
                                    setData('city', e.target.value)
                                }
                                hasError={!!errors.city}
                            />
                        </FormField>

                        <FormField label="State" required error={errors.state}>
                            <TextInput
                                placeholder="Florida"
                                value={data.state}
                                onChange={(e) =>
                                    setData('state', e.target.value)
                                }
                                hasError={!!errors.state}
                            />
                        </FormField>

                        <FormField
                            label="ZIP Code"
                            required
                            error={errors.zip_code}
                        >
                            <TextInput
                                placeholder="33139"
                                value={data.zip_code}
                                onChange={(e) =>
                                    setData('zip_code', e.target.value)
                                }
                                hasError={!!errors.zip_code}
                            />
                        </FormField>
                    </div>

                    <div className="pt-4">
                        <label className="mb-3 block text-sm font-semibold text-[#374151]">
                            Photo (Optional)
                        </label>

                        <label
                            className="group mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d1d5db] px-6 py-10 transition-colors hover:border-[#35ADD5] hover:bg-blue-50/50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile preview"
                                    className="mb-4 h-20 w-20 rounded-full object-cover shadow"
                                />
                            ) : (
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f9fafb] shadow-sm transition-all group-hover:bg-white">
                                    <UploadCloud className="h-5 w-5 text-[#6b7280] transition-colors group-hover:text-[#35ADD5]" />
                                </div>
                            )}
                            <span className="mb-2 text-sm font-medium text-[#374151]">
                                {photoPreview
                                    ? 'Change photo'
                                    : 'Upload profile photo'}
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#4b5563] shadow-sm transition-colors group-hover:border-[#35ADD5] group-hover:text-[#35ADD5]">
                                Choose File
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                </form>
            </div>

            <footer className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[#f3f4f6] bg-gray-50/50 px-6 py-5 sm:flex-row sm:px-8">
                <a
                    href="/charterer/captain-select"
                    className="flex w-full justify-center rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] sm:w-auto"
                >
                    Back
                </a>

                <button
                    type="submit"
                    form="charterer-information-form"
                    disabled={processing}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123651] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                    {processing ? (
                        <>
                            <svg
                                className="h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Saving...
                        </>
                    ) : (
                        <>
                            Continue to Agreements
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </footer>
        </section>
    );
}

function FormField({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
                {label}{' '}
                {required ? <span className="text-red-500">*</span> : null}
            </label>
            {children}
            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

function InputWithIcon({
    icon,
    children,
}: {
    icon: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                {icon}
            </div>
            {children}
        </div>
    );
}

function TextInput({
    type = 'text',
    placeholder,
    value,
    onChange,
    withIcon = false,
    readOnly = false,
    hasError = false,
}: {
    type?: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    withIcon?: boolean;
    readOnly?: boolean;
    hasError?: boolean;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full rounded-xl border bg-[#f9fafb] py-3.5 pr-4 text-sm text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:bg-white focus:ring-4 focus:outline-none ${
                hasError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10'
                    : 'border-[#e5e7eb] focus:border-[#35ADD5] focus:ring-[#35ADD5]/10'
            } ${withIcon ? 'pl-11' : 'px-4'} ${readOnly ? 'cursor-default opacity-70' : ''}`}
        />
    );
}
