export function PreferencesCard({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-[15px] font-bold text-[#111827]">{title}</h3>
            {description ? (
                <p className="mt-1 mb-6 text-[13px] text-[#6b7280]">{description}</p>
            ) : (
                <div className="mb-6" />
            )}
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
            <div className="h-6 w-11 rounded-full bg-[#e5e7eb] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-[#d1d5db] after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0a273f] peer-checked:after:translate-x-full peer-checked:after:border-white" />
        </label>
    );
}

export function TogglePreferenceRow({
    id,
    title,
    description,
    enabled,
}: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h4 className="text-[14px] font-semibold text-[#111827]">{title}</h4>
                <p className="mt-0.5 text-[13px] text-[#6b7280]">{description}</p>
            </div>
            <ToggleSwitch id={id} defaultChecked={enabled} />
        </div>
    );
}
