import { Upload, User } from 'lucide-react';
import {
    FieldLabel,
    RequiredAsterisk,
    SectionHeader,
    TextArea,
    TextInput,
} from './profile-form-elements';

export function ProfilePersonalInformationSection() {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Personal Information"
                description="Your basic contact details"
            />

            <div className="mb-8 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6] text-[#9ca3af]">
                    <User className="h-8 w-8" />
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-xs font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <Upload className="h-6 w-6" />
                    Upload Photo
                </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <FieldLabel>
                        Full Name <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="text" defaultValue="Captain James Morrison" />
                </div>
                <div>
                    <FieldLabel>
                        Email <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="email" defaultValue="james@example.com" />
                </div>
                <div>
                    <FieldLabel>Phone</FieldLabel>
                    <TextInput type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                    <FieldLabel>
                        Location <RequiredAsterisk />
                    </FieldLabel>
                    <TextInput type="text" defaultValue="Miami, FL" />
                </div>
            </div>

            <div>
                <FieldLabel>Bio</FieldLabel>
                <TextArea rows={4} defaultValue="" />
            </div>
        </section>
    );
}
