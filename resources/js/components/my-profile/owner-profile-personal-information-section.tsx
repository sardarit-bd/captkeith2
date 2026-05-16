import { Camera, Mail, Phone, UserCircle } from 'lucide-react';
import type { OwnerProfileFormData } from './owner-profile-data';

interface Props {
    data: OwnerProfileFormData;
    errors: Partial<Record<keyof OwnerProfileFormData, string>>;
    photoUrl: string | null;
    onChange: (
        field: keyof OwnerProfileFormData,
        value: string | boolean,
    ) => void;
    onPhotoChange: (file: File) => void;
    onSubmit: () => void;
    onCancel: () => void;
    processing: boolean;
}

const inputCls =
    'block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none';

const inputErrCls =
    'block w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:outline-none';

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export function OwnerProfilePersonalInformationSection({
    data,
    errors,
    photoUrl,
    onChange,
    onPhotoChange,
    onSubmit,
    onCancel,
    processing,
}: Props) {
    return (
        <section className="rounded-3xl border border-[#f1f5f9] bg-white shadow-sm">
            <div className="border-b border-[#f8fafc] p-6 sm:p-8 lg:p-10">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3b82f6]">
                        <UserCircle className="h-5 w-5" />
                    </div>
                    <h3 className="text-[18px] font-bold text-[#111827]">
                        Personal Information
                    </h3>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                            Full Name <span className="text-[#ef4444]">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={(e) =>
                                onChange('full_name', e.target.value)
                            }
                            placeholder="e.g. John Doe"
                            className={
                                errors.full_name ? inputErrCls : inputCls
                            }
                        />
                        <FieldError message={errors.full_name} />
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        onChange('phone', e.target.value)
                                    }
                                    placeholder="+1 (555) 000-0000"
                                    className={`${errors.phone ? inputErrCls : inputCls} pl-11`}
                                />
                            </div>
                            <FieldError message={errors.phone} />
                        </div>

                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={data.company_name}
                                onChange={(e) =>
                                    onChange('company_name', e.target.value)
                                }
                                placeholder="e.g. Ocean Ventures LLC"
                                className={
                                    errors.company_name ? inputErrCls : inputCls
                                }
                            />
                            <FieldError message={errors.company_name} />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                className="block w-full cursor-not-allowed rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] py-3.5 pr-4 pl-11 text-[14px] text-[#6b7280]"
                            />
                        </div>
                        <p className="mt-1 text-xs text-[#9ca3af]">
                            Email cannot be changed here. Update it in Settings.
                        </p>
                    </div>

                    <div>
                        <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                            Bio
                        </label>
                        <textarea
                            rows={4}
                            value={data.bio}
                            onChange={(e) => onChange('bio', e.target.value)}
                            placeholder="Tell captains and charterers about yourself..."
                            className={`resize-y ${errors.bio ? inputErrCls : inputCls}`}
                        />
                        <FieldError message={errors.bio} />
                    </div>

                    <div className="pt-4">
                        <label className="mb-3 block text-[13px] font-semibold text-[#374151]">
                            Profile Photo
                        </label>

                        {photoUrl && (
                            <div className="mb-4">
                                <img
                                    src={photoUrl}
                                    alt="Current profile"
                                    className="h-20 w-20 rounded-full object-cover ring-2 ring-[#e5e7eb]"
                                />
                            </div>
                        )}

                        <label className="group mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d1d5db] px-6 py-10 transition-colors hover:border-[#0a273f] hover:bg-[#eff6ff]/60">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f9fafb] shadow-sm transition-all group-hover:bg-white">
                                <Camera className="h-5 w-5 text-[#6b7280] transition-colors group-hover:text-[#0a273f]" />
                            </div>
                            <span className="mb-2 text-[14px] font-medium text-[#374151]">
                                {photoUrl ? 'Change photo' : 'Upload photo'}
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#4b5563] shadow-sm transition-colors group-hover:border-[#0a273f] group-hover:text-[#0a273f]">
                                Choose File
                            </span>
                            <p className="mt-4 text-[11px] tracking-wider text-[#9ca3af] uppercase">
                                JPG, PNG or GIF (Max 5MB)
                            </p>
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                        onPhotoChange(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse items-center justify-end gap-4 border-t border-[#f1f5f9] bg-[#f9fafb]/70 px-6 py-5 sm:flex-row sm:px-8">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={processing}
                    className="w-full cursor-pointer rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-[14px] font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] disabled:opacity-50 sm:w-auto"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={processing}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0a273f] px-8 py-3 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123651] hover:shadow-md disabled:opacity-50 disabled:hover:translate-y-0 sm:w-auto"
                >
                    {processing ? 'Saving…' : 'Save Profile'}
                </button>
            </div>
        </section>
    );
}
