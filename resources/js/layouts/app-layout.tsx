import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    pageHeader,
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    pageHeader?: {
        title: string;
        description?: string;
    };
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} pageHeader={pageHeader}>
            {children}
        </AppLayoutTemplate>
    );
}
