import { Camera, Mail, Phone, Save, UserCircle, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

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
    'block w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#c4c9d4] focus:border-[#3DB3DE] focus:ring-3 focus:ring-[#3DB3DE]/15 focus:outline-none';

const inputErrCls =
    'block w-full rounded-xl border border-red-300 bg-red-50/50 px-4 py-3 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#c4c9d4] focus:border-red-400 focus:ring-3 focus:ring-red-400/15 focus:outline-none';

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="mt-1.5 flex items-center gap-1 text-[12px]">
            <span className="inline-block h-1 w-1 rounded-full " />
            {message}
        </p>
    );
}

function Label({
    children,
    required,
}: {
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
            {children}
            {required && <span className="ml-0.5 text-[#3DB3DE]">*</span>}
        </label>
    );
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
        <section className="overflow-hidden rounded-2xl border border-[#edf0f7] bg-white shadow-sm">
            {/* ── Header ── */}
            <div className="border-b border-[#f1f5f9] bg-gradient-to-r from-[#f8faff] to-white px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF8FD] text-[#3DB3DE]">
                        <UserCircle className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-[16px] font-bold text-[#35ADD5]">
                            Personal Information
                        </h3>
                        <p className="text-[12px] text-[#9ca3af]">
                            Update your profile details and photo
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="p-6 sm:p-8">
                {/* Photo + Name row */}
                <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-[#e5e7eb] bg-[#f3f4f6] shadow-sm">
                            {photoUrl ? (
                                <img
                                    src={photoUrl}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <UserCircle className="h-10 w-10 text-[#d1d5db]" />
                                </div>
                            )}
                        </div>
                        {/* Camera badge */}
                        <label className="absolute -right-1 -bottom-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#3DB3DE] shadow-md transition-colors hover:bg-[#2A9BCA]">
                            <Camera className="h-3.5 w-3.5 text-white" />
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onPhotoChange(file);
                                }}
                            />
                        </label>
                    </div>

                    {/* Name + hint */}
                    <div className="flex-1">
                        <p className="mb-1 text-[13px] font-semibold text-[#35ADD5]">
                            Profile Photo
                        </p>
                        <p className="mb-3 text-[12px] text-[#9ca3af]">
                            JPG, PNG or GIF · Max 5 MB
                        </p>
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-all hover:border-[#3DB3DE] hover:text-[#3DB3DE]">
                            <Camera className="h-3.5 w-3.5" />
                            {photoUrl ? 'Change photo' : 'Upload photo'}
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onPhotoChange(file);
                                }}
                            />
                        </label>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-7 h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />

                <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <Label required>Full Name</Label>
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

                    {/* Phone + Company */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <Label>Phone Number</Label>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#c4c9d4]" />
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) =>
                                        onChange('phone', e.target.value)
                                    }
                                    placeholder="+1 (555) 000-0000"
                                    className={`${errors.phone ? inputErrCls : inputCls} pl-10`}
                                />
                            </div>
                            <FieldError message={errors.phone} />
                        </div>

                        <div>
                            <Label>Company Name</Label>
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

                    {/* Email — disabled */}
                    <div>
                        <Label>Email Address</Label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#c4c9d4]" />
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                className="block w-full cursor-not-allowed rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3 pr-4 pl-10 text-[14px] text-[#9ca3af]"
                            />
                        </div>
                        <p className="mt-1.5 text-[12px] text-[#b0b7c3]">
                            Email cannot be changed here. Update it in Settings.
                        </p>
                    </div>

                    {/* Bio */}
                    <div>
                        <Label>Bio</Label>
                        <textarea
                            rows={4}
                            value={data.bio}
                            onChange={(e) => onChange('bio', e.target.value)}
                            placeholder="Tell captains and charterers about yourself..."
                            className={`resize-y ${errors.bio ? inputErrCls : inputCls}`}
                        />
                        <FieldError message={errors.bio} />
                    </div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex flex-col-reverse items-center justify-between gap-3 border-t border-[#f1f5f9] bg-[#fafbfc] px-6 py-4 sm:flex-row sm:px-8">
                <p className="text-[12px] text-[#b0b7c3]">
                    <span className="text-[#3DB3DE]">*</span> Required fields
                </p>
                <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={processing}
                        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#374151] shadow-sm transition-all hover:border-[#d1d5db] hover:bg-[#f9fafb] disabled:opacity-50 sm:w-auto"
                    >
                        <X className="h-4 w-4" />
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={processing}
                        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#35ADD5]/70 hover:shadow-md disabled:opacity-50 sm:w-auto"
                    >
                        {processing ? (
                            <Spinner />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {processing ? 'Saving…' : 'Save Profile'}
                    </button>
                </div>
            </div>
        </section>
    );
}
