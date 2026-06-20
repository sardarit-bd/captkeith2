import type { ReactNode } from 'react';

type Props = {
    title: string;
    description: string;
    actionLabel: string;
    onClick?: () => void|Promise<void>;
    children: ReactNode;
};

export function AdminSectionCard({
    title,
    description,
    actionLabel,
    onClick,
    children,
}: Props) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <header className="flex items-center justify-between gap-4 border-b border-[#e6ebf1] px-6 py-5">
                <div>
                    <h3 className="text-lg font-semibold text-[#35ADD5]">{title}</h3>
                    <p className="mt-0.5 text-xs text-[#64748b]">{description}</p>
                </div>
                <button
                    type="button"
                    className="text-sm font-medium text-[#35ADD5] transition-colors hover:text-[#0ea5c6]"
                    onclick={onClick}
                >
                    {actionLabel}
                </button>
            </header>
            {children}
        </section>
    );
}
