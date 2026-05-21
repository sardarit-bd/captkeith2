import { Award, ChevronDown, FileText, Upload, X } from 'lucide-react';

export function SectionHeader({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <header className="mb-6">
            <h3 className="text-[20px] font-medium text-[#0A0A0A]">{title}</h3>
            <p className="mt-1 text-[17px] font-normal text-[#717182]">
                {description}
            </p>
        </header>
    );
}

export function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="mb-2 block text-[17px] font-medium text-[#0A0A0A]">
            {children}
        </label>
    );
}

export function RequiredAsterisk() {
    return <span className="text-[#ef4444]">*</span>;
}

export function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1.5 text-[13px] text-[#ef4444]">{message}</p>;
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="h-11.25 w-full rounded-[10px] border border-transparent bg-[#F3F3F5] px-3.75 py-2 text-[15px] text-[#374151] transition-colors placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:ring-1 focus:ring-[#0a273f] focus:outline-none"
        />
    );
}

export function TextArea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <textarea
            {...props}
            className="w-full resize-y rounded-[10px] border border-transparent bg-[#F3F3F5] px-3.75 py-2 text-[14px] text-[#374151] transition-colors placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:ring-1 focus:ring-[#0a273f] focus:outline-none"
        />
    );
}

export function SelectInput({
    value,
    onChange,
    options,
}: {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-11.25 w-full appearance-none rounded-[10px] border border-transparent bg-[#F3F3F5] px-3.75 py-2 text-[14px] text-[#374151] transition-colors focus:border-[#0a273f] focus:ring-1 focus:ring-[#0a273f] focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        </div>
    );
}

export function RatingSelectInput({
    value,
    onChange,
    options,
}: {
    value: string | number;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
}) {
    return (
        <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A273F] text-white shadow-sm">
                <Award className="h-3.5 w-3.5" />
            </span>
            <select
                value={String(value)}
                onChange={(e) => onChange(e.target.value)}
                className="h-11.25 w-full appearance-none rounded-[10px] border border-[#DDE2EA] bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)] px-3.75 py-2 pr-10 pl-11 text-[14px] font-medium text-[#0A0A0A] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all focus:border-[#0a273f] focus:ring-2 focus:ring-[#0a273f]/15 focus:outline-none"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        </div>
    );
}

export function UploadBox({
    title,
    subtitle,
    buttonLabel,
    existingUrl,
    existingName,
    onFileSelect,
    accept,
}: {
    title: string;
    subtitle?: string;
    buttonLabel: string;
    existingUrl?: string | null;
    existingName?: string | null;
    onFileSelect?: (file: File | null) => void;
    accept?: string;
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onFileSelect?.(file);
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        onFileSelect?.(null);
    };

    return (
        <div className="rounded-xl border-2 border-dashed border-[#e5e7eb] p-8 text-center transition-colors hover:bg-[#f9fafb]">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#d1d5db]" />
            <p className="mb-1 text-[13px] font-medium text-[#4b5563]">
                {title}
            </p>
            {subtitle && (
                <p className="mb-4 text-[11px] tracking-wider text-[#9ca3af] uppercase">
                    {subtitle}
                </p>
            )}
            {!subtitle && <div className="mb-4" />}

            {existingUrl && !existingName && (
                <p className="mb-3 text-[12px] text-[#6b7280]">
                    Current file:{' '}
                    <a
                        href={existingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-[#0a273f] underline underline-offset-2"
                    >
                        View
                    </a>
                </p>
            )}

            {existingName && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-1.5 text-[12px] text-[#374151]">
                    <FileText className="h-3.5 w-3.5 text-[#6b7280]" />
                    <span className="max-w-40 truncate">{existingName}</span>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="ml-1 text-[#9ca3af] hover:text-[#374151]"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            )}

            <div>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <Upload className="h-4 w-4" />
                    {buttonLabel}
                </button>
            </div>
        </div>
    );
}

export function ToggleField({
    id,
    label,
    checked,
    onChange,
}: {
    id: string;
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}) {
    return (
        <label
            htmlFor={id}
            className="group flex cursor-pointer items-center gap-3"
        >
            <input
                id={id}
                type="checkbox"
                checked={checked ?? false}
                onChange={(e) => onChange?.(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-[#d1d5db] text-[#0a273f] focus:ring-[#0a273f]"
            />
            <span className="text-[14px] font-medium text-[#1f2937] transition-colors group-hover:text-[#111827]">
                {label}
            </span>
        </label>
    );
}

import React from 'react';
