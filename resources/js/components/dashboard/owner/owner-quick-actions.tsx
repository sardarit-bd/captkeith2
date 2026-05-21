import { Link } from '@inertiajs/react';
import { ownerQuickActions } from './owner-dashboard-data';

export function OwnerQuickActions() {
    return (
        <section className="rounded-2xl border border-[#d4dbe3] bg-white p-5">
            <h2 className="text-[16px] font-semibold text-[#0f172a]">Quick Actions</h2>

            <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {ownerQuickActions.map((item) => (
                    <Link
                        key={item.title}
                        // type="button"
                        href={item.href}
                        className="flex items-center gap-4 rounded-xl border border-[#d4dbe3] bg-white p-5 text-left transition-colors hover:bg-[#f8fbfd]"
                    >
                        <span
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                            style={{ backgroundColor: item.iconBg }}
                        >
                            <item.icon
                                className="h-6 w-6"
                                style={{ color: item.iconColor }}
                            />
                        </span>
                        <span>
                            <span className="block text-[16px] font-semibold text-[#0A0A0A]">
                                {item.title}
                            </span>
                            <span className="block text-[12px] font-normal text-[#4A5565]">
                                {item.description}
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
