import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    UploadCloud,
    User,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from '@inertiajs/react';
import { agreement } from '@/routes/charterer';
import { captainSelect } from '@/routes/charterer';

export function ChartererInformationFormCard() {
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

                <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <FormField label="First Name" required>
                            <TextInput placeholder="e.g. John" />
                        </FormField>

                        <FormField label="Last Name" required>
                            <TextInput placeholder="e.g. Doe" />
                        </FormField>
                    </div>

                    <FormField label="Email" required>
                        <InputWithIcon
                            icon={<Mail className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput
                                type="email"
                                placeholder="your@email.com"
                                withIcon
                            />
                        </InputWithIcon>
                    </FormField>

                    <FormField label="Phone Number" required>
                        <InputWithIcon
                            icon={<Phone className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                withIcon
                            />
                        </InputWithIcon>
                    </FormField>

                    <FormField label="Address" required>
                        <InputWithIcon
                            icon={<MapPin className="h-4 w-4 text-[#9ca3af]" />}
                        >
                            <TextInput placeholder="123 Ocean Drive" withIcon />
                        </InputWithIcon>
                    </FormField>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <FormField label="City" required>
                            <TextInput placeholder="Miami" />
                        </FormField>

                        <FormField label="State" required>
                            <TextInput placeholder="Florida" />
                        </FormField>

                        <FormField label="ZIP Code" required>
                            <TextInput placeholder="33139" />
                        </FormField>
                    </div>

                    <div className="pt-4">
                        <label className="mb-3 block text-sm font-semibold text-[#374151]">
                            Photo (Optional)
                        </label>

                        <label className="group mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d1d5db] px-6 py-10 transition-colors hover:border-[#0A273F] hover:bg-blue-50/50">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f9fafb] shadow-sm transition-all group-hover:bg-white">
                                <UploadCloud className="h-5 w-5 text-[#6b7280] transition-colors group-hover:text-[#0A273F]" />
                            </div>
                            <span className="mb-2 text-sm font-medium text-[#374151]">
                                Upload profile photo
                            </span>
                            <span className="inline-flex items-center rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#4b5563] shadow-sm transition-colors group-hover:border-[#0A273F] group-hover:text-[#0A273F]">
                                Choose File
                            </span>
                            <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                            />
                        </label>
                    </div>
                </form>
            </div>

            <footer className="flex flex-col-reverse items-center justify-between gap-4 border-t border-[#f3f4f6] bg-gray-50/50 px-6 py-5 sm:flex-row sm:px-8">
                <Link
                    href={captainSelect()}
                    className="flex w-full justify-center rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] sm:w-auto"
                >
                    Back
                </Link>

                <Link
                    href={agreement()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A273F] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123651] hover:shadow-md sm:w-auto"
                >
                    Continue to Agreements
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </footer>
        </section>
    );
}

function FormField({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
                {label}{' '}
                {required ? <span className="text-red-500">*</span> : null}
            </label>
            {children}
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
    withIcon = false,
}: {
    type?: string;
    placeholder: string;
    withIcon?: boolean;
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] py-3.5 pr-4 text-sm text-[#111827] transition-all duration-200 placeholder:text-[#9ca3af] focus:border-[#0A273F] focus:bg-white focus:ring-4 focus:ring-[#0A273F]/10 focus:outline-none ${
                withIcon ? 'pl-11' : 'px-4'
            }`}
        />
    );
}
