import { usePage } from '@inertiajs/react';
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
        pageHeader && role === 'admin' && pageHeader.title === 'Dashboard Overview'
            ? {
                  title: 'Super Admin Overview',
                  description: 'Platform command center and compliance oversight.',
              }
            : pageHeader;

    if (resolvedPageHeader) {
        return (
            <>
                <header className="fixed left-0 top-0 z-50 flex w-full shrink-0 items-start justify-between gap-3 border-b border-[#e5e7eb] bg-[#f4f5f7] px-4 py-4 sm:px-6 md:left-[var(--sidebar-width)] md:min-h-[88px] md:w-[calc(100%-var(--sidebar-width))] md:items-center md:peer-data-[collapsible=icon]:left-[var(--sidebar-width-icon)] md:peer-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))]">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                        <SidebarTrigger className="mt-1 -ml-1 md:hidden" />
                        <div className="min-w-0">
                            <h1 className="text-xl font-semibold text-[#11395d] sm:text-2xl lg:text-4xl">
                                {resolvedPageHeader.title}
                            </h1>
                            {resolvedPageHeader.description ? (
                                <p className="mt-1 max-w-2xl text-xs text-[#6b7280] sm:text-sm">
                                    {resolvedPageHeader.description}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    {user ? (
                        <AppUserDropdown
                            displayName={displayName}
                            initials={initials}
                            portalLabel={portalLabel}
                            role={role}
                            compact
                        />
                    ) : null}
                </header>
                <div className="h-[92px] shrink-0" />
            </>
        );
    }

    return (
        <>
            <header className="fixed left-0 top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 bg-[#f4f5f7] px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:left-[var(--sidebar-width)] md:w-[calc(100%-var(--sidebar-width))] md:px-4 md:peer-data-[collapsible=icon]:left-[var(--sidebar-width-icon)] md:peer-data-[collapsible=icon]:w-[calc(100%-var(--sidebar-width-icon))]">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                {user ? (
                    <AppUserDropdown
                        displayName={displayName}
                        initials={initials}
                        portalLabel={portalLabel}
                        role={role}
                        compact
                    />
                ) : null}
            </header>
            <div className="h-16 shrink-0" />
        </>
    );
}
