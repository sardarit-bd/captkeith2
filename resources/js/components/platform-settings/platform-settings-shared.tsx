export function ToggleField({
    checked,
    disabled,
}: {
    checked?: boolean;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-disabled={disabled}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                checked ? 'bg-[#35ADD5]' : 'bg-slate-300'
            } ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full border border-slate-200 bg-white transition-transform ${
                    checked ? 'translate-x-6' : 'translate-x-0.5'
                }`}
            />
        </button>
    );
}

export function SettingsSectionCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <header className="border-b border-[#e6ebf1] bg-slate-50/60 px-6 py-4">
                <h4 className="text-sm font-semibold text-[#11395d]">{title}</h4>
            </header>
            <div className="p-6">{children}</div>
        </section>
    );
}
