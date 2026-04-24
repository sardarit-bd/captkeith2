import { Award, ChevronDown, FileText, Upload } from 'lucide-react';

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

export function TextInput(
    props: React.InputHTMLAttributes<HTMLInputElement>,
) {
    return (
        <input
            {...props}
            className="h-[45px] w-full rounded-[10px] border border-transparent bg-[#F3F3F5] px-[15px] py-2 text-[15px] text-[#374151] transition-colors placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:outline-none focus:ring-1 focus:ring-[#0a273f]"
        />
    );
}

export function TextArea(
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <textarea
            {...props}
            className="w-full resize-y rounded-[10px] border border-transparent bg-[#F3F3F5] px-[15px] py-2 text-[14px] text-[#374151] transition-colors placeholder:text-[#9ca3af] focus:border-[#0a273f] focus:outline-none focus:ring-1 focus:ring-[#0a273f]"
        />
    );
}

export function SelectInput({
    defaultValue,
    options,
}: {
    defaultValue: string;
    options: Array<{ value: string; label: string }>;
}) {
    return (
        <div className="relative">
            <select
                defaultValue={defaultValue}
                className="h-[45px] w-full appearance-none rounded-[10px] border border-transparent bg-[#F3F3F5] px-[15px] py-2 text-[14px] text-[#374151] transition-colors focus:border-[#0a273f] focus:outline-none focus:ring-1 focus:ring-[#0a273f]"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
        </div>
    );
}

export function RatingSelectInput({
    defaultValue,
    options,
}: {
    defaultValue: string;
    options: Array<{ value: string; label: string }>;
}) {
    return (
        <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A273F] text-white shadow-sm">
                <Award className="h-3.5 w-3.5" />
            </span>
            <select
                defaultValue={defaultValue}
                className="h-[45px] w-full appearance-none rounded-[10px] border border-[#DDE2EA] bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)] px-[15px] py-2 pl-11 pr-10 text-[14px] font-medium text-[#0A0A0A] shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all focus:border-[#0a273f] focus:outline-none focus:ring-2 focus:ring-[#0a273f]/15"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
        </div>
    );
}

export function UploadBox({
    title,
    subtitle,
    buttonLabel,
}: {
    title: string;
    subtitle?: string;
    buttonLabel: string;
}) {
    return (
        <div className="rounded-xl border-2 border-dashed border-[#e5e7eb] p-8 text-center transition-colors hover:bg-[#f9fafb]">
            <FileText className="mx-auto mb-3 h-8 w-8 text-[#d1d5db]" />
            <p className="mb-1 text-[13px] font-medium text-[#4b5563]">{title}</p>
            {subtitle ? (
                <p className="mb-4 text-[11px] tracking-wider text-[#9ca3af] uppercase">
                    {subtitle}
                </p>
            ) : (
                <div className="mb-4" />
            )}
            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
            >
                <Upload className="h-4 w-4" />
                {buttonLabel}
            </button>
        </div>
    );
}

export function ToggleField({
    id,
    label,
    defaultChecked,
}: {
    id: string;
    label: string;
    defaultChecked?: boolean;
}) {
    return (
        <label
            htmlFor={id}
            className="group flex cursor-pointer items-center gap-3"
        >
            <input
                id={id}
                type="checkbox"
                defaultChecked={defaultChecked}
                className="h-4 w-4 cursor-pointer rounded border-[#d1d5db] text-[#0a273f] focus:ring-[#0a273f]"
            />
            <span className="text-[14px] font-medium text-[#1f2937] transition-colors group-hover:text-[#111827]">
                {label}
            </span>
        </label>
    );
}
