import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { AdminUsersTable } from '@/components/admin/admin-users-table';
import { AdminUsersFilters } from '@/components/admin/admin-users-filters';
import { PageProps } from '@/types';
import { useState, useEffect } from 'react';

interface UsersPageProps extends PageProps {
    userData: {
        users: any[];
        total: number;
        filters: {
            roles: string[];
            statuses: string[];
        };
    };
    filters: {
        search?: string;
        role?: string;
        status?: string;
    };
}

export default function UsersPage({ userData, filters }: UsersPageProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const [status, setStatus] = useState(filters.status || 'all');
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(route('admin.users.index'), 
                { search, role, status, per_page: perPage },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, role, status, perPage]);

    return (
        <AppLayout>
            <Head title="Users Directory" />
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6 py-6">
                        {/* Header */}
                        {/* <div>
                            <h1 className="text-3xl font-bold text-[#35ADD5]">Users Directory</h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Manage platform users, roles, and compliance status.
                            </p>
                        </div> */}

                        {/* Filters */}
                        <AdminUsersFilters
                            search={search}
                            onSearchChange={setSearch}
                            role={role}
                            onRoleChange={setRole}
                            status={status}
                            onStatusChange={setStatus}
                            roles={userData.filters.roles}
                            statuses={userData.filters.statuses}
                            total={userData.total}
                        />

                        {/* Table */}
                        <AdminUsersTable 
                            users={userData.users} 
                            total={userData.total}
                            perPage={perPage}
                            onPerPageChange={setPerPage}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

VesselInventoryPage.layout = {
    breadcrumbs: [
        {
            title: 'Vessel Inventory',
            href: vesselInventory(),
        },
    ],
    pageHeader: {
        title: 'Vessel Inventory',
        description:
            'Manage fleet, oversee demise compliance, and approve listings.',
    },
};
