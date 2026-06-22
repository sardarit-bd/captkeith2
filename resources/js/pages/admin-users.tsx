import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import AdminUsersFilters from "@/components/admin-users/admin-users-filters";
import AdminUsersTable from "@/components/admin-users/admin-users-table";
import { PageProps } from '@/types';
import { useState, useEffect } from 'react';

// Define expected shape from backend
interface UsersPageProps extends PageProps {
    userData?: {
        users: any[];
        total: number;
        filters?: {
            roles: string[];
            statuses: string[];
        };
    };
    filters?: {
        search?: string;
        role?: string;
        status?: string;
    };
     dashboardData?: {
    };
}

export default function UsersPage({ userData, filters, dashboardData }: UsersPageProps) {
    const [search, setSearch] = useState(filters?.search || '');
    const [role, setRole] = useState(filters?.role || 'all');
    const [status, setStatus] = useState(filters?.status || 'all');
    const [perPage, setPerPage] = useState(10);

    // Debounced search/filter handler
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(route('admin.users.index'), 
                { search, role, status, per_page: perPage },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, role, status, perPage]);

    // Safe fallbacks if backend isn't ready yet
    const users = userData?.users ?? [];
    const total = userData?.total ?? 0;
    const availableRoles = userData?.filters?.roles ?? ['Captain', 'Owner', 'Deckhand', 'Charterer'];
    const availableStatuses = userData?.filters?.statuses ?? ['Active', 'Verified', 'Pending Review', 'Suspended'];
    console.log("this is dash",dashboardData)
    return (
        <>
            {/* <Head title="Users Directory" /> */}
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6 py-6">


                        {/* Dynamic Filters */}
                        <AdminUsersFilters
                            search={search}
                            onSearchChange={setSearch}
                            role={role}
                            onRoleChange={setRole}
                            status={status}
                            onStatusChange={setStatus}
                            roles={availableRoles}
                            statuses={availableStatuses}
                            total={total}
                        />

                        {/* Table */}
                        <AdminUsersTable 
                            users={users} 
                            total={total}
                            perPage={perPage}
                            onPerPageChange={setPerPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


UsersPage.layout = {
    breadcrumbs: [
        {
            title: 'Users Directory',
            href: '/admin/users',
        },
    ],
    pageHeader: {
        title: 'Users Directory',
        description:
            'Manage fleet, oversee demise compliance, and approve listings.',
    },
};