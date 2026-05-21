import { useState } from 'react';
import type { DeckhandProfileFormData } from './deckhand-profile-form';
import { FieldError, SectionHeader, UploadBox } from './profile-form-elements';

type Props = {
    data: DeckhandProfileFormData;
    errors: Partial<Record<keyof DeckhandProfileFormData, string>>;
    setData: <K extends keyof DeckhandProfileFormData>(
        key: K,
        value: DeckhandProfileFormData[K],
    ) => void;
};

export function DeckhandProfileResumeSection({ data, errors, setData }: Props) {
    const [resumeFileName, setResumeFileName] = useState<string | null>(
        data.resume?.name ?? null,
    );

    const handleResumeSelect = (file: File | null) => {
        setData('resume', file);
        setResumeFileName(file?.name ?? null);
    };

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
                existingUrl={data._resume_url}
                existingName={resumeFileName}
                onFileSelect={handleResumeSelect}
                accept=".pdf,.doc,.docx"
            />
            <FieldError message={errors.resume} />
        </section>
    );
}
