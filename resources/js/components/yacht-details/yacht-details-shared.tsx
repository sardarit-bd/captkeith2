export function DetailsCard({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-sm sm:p-8 ${className}`}
        >
            {children}
        </section>
    );
}

export function SectionHeading({
    title,
    icon,
}: {
    title: string;
    icon?: React.ReactNode;
}) {
    return (
        <div className="mb-6 flex items-center gap-2">
            {icon}
            <h3 className="text-[16px] font-bold text-[#111827]">{title}</h3>
        </div>
    );
}

export function LabeledValue({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="mb-1 text-[12px] text-[#6b7280]">{label}</p>
            <p className="text-[14px] font-medium text-[#111827]">{value}</p>
        </div>
    );
}
