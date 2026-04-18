import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    pageHeader,
}: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden bg-[#F6FDFF]"
            >
                <AppSidebarHeader
                    breadcrumbs={breadcrumbs}
                    pageHeader={pageHeader}
                />
                {children}
            </AppContent>
        </AppShell>
    );
}
