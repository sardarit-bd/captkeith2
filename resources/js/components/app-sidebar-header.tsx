import { usePage } from '@inertiajs/react';
import { Bell, ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
    pageHeader,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    pageHeader?: {
        title: string;
        description?: string;
    };
}) {
    const page = usePage();
    const user = page.props.auth?.user;
    const displayName = String(user?.name ?? user?.email ?? 'User');
    const roleName = String(page.props.auth?.role ?? user?.role_label ?? 'user');
    const portalLabel = `${roleName
        .replace(/[_-]+/g, ' ')
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())} Portal`;
    const initials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');

    if (pageHeader) {
        return (
            <header className="flex shrink-0 flex-col gap-4 border-b border-[#e5e7eb] bg-[#f4f5f7] px-4 py-4 sm:px-6 md:min-h-[88px] md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <SidebarTrigger className="mt-1 -ml-1 md:hidden" />
                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold text-[#11395d] sm:text-2xl lg:text-4xl">
                            {pageHeader.title}
                        </h1>
                        {pageHeader.description ? (
                            <p className="mt-1 max-w-2xl text-xs text-[#6b7280] sm:text-sm">
                                {pageHeader.description}
                            </p>
                        ) : null}
                    </div>
                </div>

                {user ? (
                    <div className="ml-auto flex w-full items-center justify-end gap-2 sm:gap-3 md:ml-6 md:w-auto md:gap-4">
                        <button
                            type="button"
                            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f2937] hover:bg-[#e9edf2]"
                            aria-label="Notifications"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#ef4444]" />
                        </button>

                        <div className="h-10 w-px bg-[#e5e7eb]" />

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-[#e9edf2] sm:gap-3"
                            aria-label="User menu"
                        >
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0f3d66] text-sm font-semibold text-white">
                                {initials || 'U'}
                            </span>
                            <span className="hidden text-left sm:block">
                                <span className="block text-sm leading-tight font-medium text-[#1f2937]">
                                    {displayName}
                                </span>
                                <span className="block text-xs leading-tight text-[#6b7280]">
                                    {portalLabel}
                                </span>
                            </span>
                            <ChevronDown className="h-4 w-4 text-[#6b7280]" />
                        </button>
                    </div>
                ) : null}
            </header>
        );
    }

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
