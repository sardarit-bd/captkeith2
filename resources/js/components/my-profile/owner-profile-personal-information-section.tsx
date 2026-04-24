import {
    Camera,
    ChevronDown,
    Mail,
    MapPin,
    Phone,
    UserCircle,
} from 'lucide-react';
import {
    ownerProfileDefaultValues,
    ownerStateOptions,
} from './owner-profile-data';

export function OwnerProfilePersonalInformationSection() {
    return (
        <section className="rounded-[24px] border border-[#f1f5f9] bg-white shadow-sm">
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
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                First Name{' '}
                                <span className="text-[#ef4444]">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={
                                    ownerProfileDefaultValues.firstName
                                }
                                placeholder="e.g. John"
                                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                Last Name{' '}
                                <span className="text-[#ef4444]">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={
                                    ownerProfileDefaultValues.lastName
                                }
                                placeholder="e.g. Doe"
                                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                Email Address{' '}
                                <span className="text-[#ef4444]">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    type="email"
                                    defaultValue={
                                        ownerProfileDefaultValues.email
                                    }
                                    placeholder="your@email.com"
                                    className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3.5 pr-4 pl-11 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                Phone Number{' '}
                                <span className="text-[#ef4444]">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    type="tel"
                                    defaultValue={
                                        ownerProfileDefaultValues.phone
                                    }
                                    placeholder="+1 (555) 000-0000"
                                    className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3.5 pr-4 pl-11 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                            Street Address{' '}
                            <span className="text-[#ef4444]">*</span>
                        </label>
                        <div className="relative">
                            <MapPin className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                            <input
                                type="text"
                                defaultValue={
                                    ownerProfileDefaultValues.streetAddress
                                }
                                placeholder="123 Ocean Drive"
                                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3.5 pr-4 pl-11 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                City <span className="text-[#ef4444]">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={ownerProfileDefaultValues.city}
                                placeholder="Miami"
                                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                State <span className="text-[#ef4444]">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    defaultValue={
                                        ownerProfileDefaultValues.state
                                    }
                                    className="block w-full cursor-pointer appearance-none rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 pr-10 text-[14px] text-[#111827] transition-all duration-200 focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                                >
                                    {ownerStateOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-[13px] font-semibold text-[#374151]">
                                ZIP Code{' '}
                                <span className="text-[#ef4444]">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={ownerProfileDefaultValues.zipCode}
                                placeholder="33139"
                                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3.5 text-[14px] text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:bg-white focus:ring-4 focus:ring-[#0a273f]/10 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="mb-3 block text-[13px] font-semibold text-[#374151]">
                            Profile Photo
                        </label>
                        <label className="group mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d1d5db] px-6 py-10 transition-colors hover:border-[#0a273f] hover:bg-[#eff6ff]/60">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f9fafb] shadow-sm transition-all group-hover:bg-white">
                                <Camera className="h-5 w-5 text-[#6b7280] transition-colors group-hover:text-[#0a273f]" />
                            </div>
                            <span className="mb-2 text-[14px] font-medium text-[#374151]">
                                Upload new photo
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#4b5563] shadow-sm transition-colors group-hover:border-[#0a273f] group-hover:text-[#0a273f]">
                                Choose File
                            </span>
                            <p className="mt-4 text-[11px] tracking-wider text-[#9ca3af] uppercase">
                                JPG, PNG or GIF (Max 2MB)
                            </p>
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse items-center justify-end gap-4 border-t border-[#f1f5f9] bg-[#f9fafb]/70 px-6 py-5 sm:flex-row sm:px-8">
                <button
                    type="button"
                    className="w-full rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-[14px] font-semibold text-[#374151] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] sm:w-auto"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a273f] px-8 py-3 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123651] hover:shadow-md sm:w-auto"
                >
                    Save Profile
                </button>
            </div>
        </section>
    );
}
