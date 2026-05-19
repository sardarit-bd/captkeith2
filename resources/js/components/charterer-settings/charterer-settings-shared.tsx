import type { ReactNode } from 'react';

// ── SettingsSection ──────────────────────────────────────────────────────────

interface SettingsSectionProps {
    title: string;
    icon?: ReactNode;
    danger?: boolean;
    children: ReactNode;
}

export function SettingsSection({
    title,
    icon,
    danger = false,
    children,
}: SettingsSectionProps) {
    return (
        <section
            className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8 ${
                danger ? 'border-[#fee2e2]' : 'border-[#e8eef4]'
            }`}
        >
            <header className="mb-6 flex items-center gap-3">
                {icon && (
                    <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                            danger
                                ? 'bg-[#fef2f2] text-[#dc2626]'
                                : 'bg-[#eff6ff]'
                        }`}
                    >
                        {icon}
                    </span>
                )}
                <h2
                    className={`text-[16px] font-bold ${
                        danger ? 'text-[#dc2626]' : 'text-[#111827]'
                    }`}
                >
                    {title}
                </h2>
            </header>
            {children}
        </section>
    );
}

// ── SecondaryButton ──────────────────────────────────────────────────────────

interface SecondaryButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

export function SecondaryButton({
    children,
    className = '',
    onClick,
    disabled = false,
    type = 'button',
}: SecondaryButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
}

// ── PreferenceRow ────────────────────────────────────────────────────────────

interface PreferenceRowProps {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    withDivider?: boolean;
    onChange?: (value: boolean) => void;
}

export function PreferenceRow({
    id,
    title,
    description,
    enabled,
    withDivider = false,
    onChange,
}: PreferenceRowProps) {
    return (
        <div
            className={`flex items-center justify-between gap-4 ${
                withDivider ? 'border-t border-[#f1f5f9] pt-6' : ''
            }`}
        >
            <div>
                <label
                    htmlFor={id}
                    className="cursor-pointer text-[14px] font-semibold text-[#111827]"
                >
                    {title}
                </label>
                <p className="mt-0.5 text-[13px] text-[#6b7280]">
                    {description}
                </p>
            </div>

            {/* Toggle switch */}
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => onChange?.(!enabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none ${
                    enabled ? 'bg-[#0A273F]' : 'bg-[#d1d5db]'
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );
}
