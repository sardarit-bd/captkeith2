export function SettingsSection({
    title,
    icon,
    children,
    danger = false,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    danger?: boolean;
}) {
    return (
        <section
            className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
                danger ? 'border-[#fecaca]' : 'border-[#f1f5f9]'
            }`}
        >
            <div className={`mb-6 flex items-center gap-2 ${danger ? 'text-[#dc2626]' : 'text-[#111827]'}`}>
                {icon}
                <h3 className="text-[16px] font-bold">{title}</h3>
            </div>
            {children}
        </section>
    );
}

export function ToggleSwitch({
    id,
    defaultChecked,
}: {
    id: string;
    defaultChecked?: boolean;
}) {
    return (
        <label htmlFor={id} className="relative inline-flex cursor-pointer items-center">
            <input
                id={id}
                type="checkbox"
                defaultChecked={defaultChecked}
                className="peer sr-only"
            />
            <div className="h-6 w-11 rounded-full bg-[#e5e7eb] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[#d1d5db] after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0A273F] peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
    );
}

export function PreferenceRow({
    id,
    title,
    description,
    enabled,
    withDivider = true,
}: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    withDivider?: boolean;
}) {
    return (
        <div
            className={`flex flex-col justify-between gap-4 sm:flex-row sm:items-center ${withDivider ? 'border-t border-[#f8fafc] pt-4' : ''}`}
        >
            <div>
                <h4 className="text-[14px] font-semibold text-[#111827]">{title}</h4>
                <p className="mt-0.5 text-[13px] text-[#6b7280]">{description}</p>
            </div>
            <div className="shrink-0 self-start sm:self-auto">
                <ToggleSwitch id={id} defaultChecked={enabled} />
            </div>
        </div>
    );
}

export function SecondaryButton({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <button
            type="button"
            className={`rounded-lg border border-[#e5e7eb] bg-white px-5 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] ${className}`}
        >
            {children}
        </button>
    );
}
