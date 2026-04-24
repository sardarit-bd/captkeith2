import { UploadBox, SectionHeader } from './profile-form-elements';

export function DeckhandProfileResumeSection() {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <SectionHeader
                title="Resume / CV"
                description="Upload your professional resume"
            />

            <UploadBox
                title="Upload your resume or CV"
                subtitle="PDF, DOC, DOCX (Max 5MB)"
                buttonLabel="Choose File"
            />
        </section>
    );
}
