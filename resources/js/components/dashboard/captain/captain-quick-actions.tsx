import { Link } from '@inertiajs/react';
import { captainQuickActions } from './captain-dashboard-data';

export function CaptainQuickActions() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-5 shadow-sm">
            <h2 className="text-[16px] font-semibold text-[#35ADD5]">
                Quick Actions
            </h2>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                {captainQuickActions.map((item) => (
                    <Link
                        href={item.href}
                        key={item.title}
                        className="flex items-center gap-4 rounded-xl border border-[#d4dbe3] bg-white p-4 text-left transition-colors hover:bg-[#f8fbfd]"
                    >
                        <span
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: item.iconBg }}
                        >
                            <item.icon
                                className="h-5 w-5"
                                style={{ color: item.iconColor }}
                            />
                        </span>
                        <span>
                            <span className="block text-[15px] font-semibold text-[#111827]">
                                {item.title}
                            </span>
                            <span className="mt-0.5 block text-[12.5px] text-[#6b7280]">
                                {item.description}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
