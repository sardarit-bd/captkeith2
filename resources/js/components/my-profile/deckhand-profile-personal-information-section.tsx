import { Upload, User } from 'lucide-react';
import {
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextInput,
} from './profile-form-elements';

export function DeckhandProfilePersonalInformationSection() {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Personal Information"
                description="Your basic contact details"
            />

            <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af] shadow-inner">
                    <User className="h-8 w-8" />
                </div>
                <div>
                    <button
                        type="button"
                        className="mb-2 inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                    >
                        <Upload className="h-4 w-4" />
                        Upload Photo
                    </button>
                    <p className="text-[11px] tracking-wider text-[#9ca3af] uppercase">
                        JPG, PNG or GIF (Max 2MB)
                    </p>
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
                        />
                    </div>
                    <div>
                        <FieldLabel>
                            Email <RequiredAsterisk />
                        </FieldLabel>
                        <TextInput
                            type="email"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>

                <div>
                    <FieldLabel>Phone Number</FieldLabel>
                    <TextInput type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                    <FieldLabel>
                        Street Address <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="text" placeholder="123 Main Street" />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div>
                        <FieldLabel>
                            City <RequiredAsterisk />
                        </FieldLabel>
                        <TextInput type="text" placeholder="Miami" />
                    </div>
                    <div>
                        <FieldLabel>
                            State <RequiredAsterisk />
                        </FieldLabel>
                        <TextInput type="text" placeholder="FL" />
                    </div>
                    <div>
                        <FieldLabel>
                            Zip Code <RequiredAsterisk />
                        </FieldLabel>
                        <TextInput type="text" placeholder="33101" />
                    </div>
                </div>
            </div>
        </section>
    );
}
