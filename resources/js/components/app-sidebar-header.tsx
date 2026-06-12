import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { AppUserDropdown } from '@/components/app-user-dropdown';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

type HeaderPageProps = {
    auth?: {
        role?: string | null;
        user?: {
            name?: string | null;
            email?: string | null;
            role_label?: string | null;
        };
    };
};

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

function useLiveClock() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return now;
}

function LiveClock() {
    const now = useLiveClock();

    const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const dateStr = now.toLocaleDateString([], {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="hidden flex-col items-end leading-tight md:flex">
            <span className="text-sm font-semibold tabular-nums text-[#1e293b]">
                {timeStr}
            </span>
            <span className="text-[11px] text-[#9ca3af]">{dateStr}</span>
        </div>
    );
}

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
    const page = usePage<HeaderPageProps>();
    const user = page.props.auth?.user;
    const role = page.props.auth?.role;

    const displayName = String(user?.name ?? user?.email ?? 'User');
    const firstName = displayName.split(' ')[0] ?? displayName;
    const roleName = String(role ?? user?.role_label ?? 'user');
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

    const resolvedPageHeader =
        pageHeader &&
        role === 'admin' &&
        pageHeader.title === 'Dashboard Overview'
            ? {
                  title: 'Super Admin Overview',
                  description:
                      'Platform command center and compliance oversight.',
              }
            : pageHeader;

    if (resolvedPageHeader) {
        return (
            <>
                <header className="fixed left-0 top-0 z-50 w-full border-b border-[#e5e7eb] bg-[#f4f5f7] md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))] md:peer-data-[collapsible=icon]:left-[var(--sidebar-width-icon)] md:peer-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))]">
                    {/* Top bar */}
                    <div className="flex min-h-[64px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
                        {/* Left: trigger + title block */}
                        <div className="flex min-w-0 flex-1 items-start gap-3">
                            <SidebarTrigger className="mt-1 -ml-1 shrink-0 md:hidden" />
                            <div className="min-w-0">
                                {/* Greeting — visible on larger screens */}
                                <p className="hidden text-xs font-medium text-[#9ca3af] sm:block">
                                    {getGreeting()},{' '}
                                    <span className="text-[#6b7280]">
                                        {firstName}
                                    </span>
                                </p>
                                <h1 className="truncate text-xl font-semibold text-[#35ADD5] sm:text-2xl lg:text-[1.75rem] lg:leading-tight">
                                    {resolvedPageHeader.title}
                                </h1>
                                {resolvedPageHeader.description ? (
                                    <p className="mt-0.5 max-w-2xl truncate text-xs text-[#6b7280] sm:text-sm">
                                        {resolvedPageHeader.description}
                                    </p>
                                ) : null}
                            </div>
                        </div>

                        {/* Right: clock + user */}
                        <div className="flex shrink-0 items-center gap-4">
                            <LiveClock />

                            {/* Subtle divider */}
                            <div className="hidden h-8 w-px bg-[#e5e7eb] md:block" />

                            {user ? (
                                <AppUserDropdown
                                    displayName={displayName}
                                    initials={initials}
                                    portalLabel={portalLabel}
                                    role={role}
                                    compact
                                />
                            ) : null}
                        </div>
                    </div>

                    {/* Status bar — thin accent line at bottom */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#35ADD5]/30 via-[#35ADD5] to-[#35ADD5]/10" />
                </header>

                {/* Spacer that accounts for header height + status bar */}
                <div className="h-[calc(64px+3px+1px)] shrink-0" />
            </>
        );
    }

    // Default: breadcrumb-only header
    return (
        <>
            <header className="fixed left-0 top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-[#f4f5f7] px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))] md:px-4 md:peer-data-[collapsible=icon]:left-[var(--sidebar-width-icon)] md:peer-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))]">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="flex items-center gap-4">
                    <LiveClock />
                    <div className="hidden h-6 w-px bg-[#e5e7eb] md:block" />
                    {user ? (
                        <AppUserDropdown
                            displayName={displayName}
                            initials={initials}
                            portalLabel={portalLabel}
                            role={role}
                            compact
                        />
                    ) : null}
                </div>
            </header>
            <div className="h-16 shrink-0" />
        </>
    );
}