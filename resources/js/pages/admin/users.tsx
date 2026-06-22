import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import AdminUsersTable from '@/components/admin-users/admin-users-table';
import AdminUsersFilters from '@/components/admin-users/admin-users-filters';
import AdminUserController from '@/actions/App/Http/Controllers/AdminUserController'; // Added Wayfinder import
import { PageProps } from '@/types';
import { useState, useEffect } from 'react';

interface UsersPageProps extends PageProps {
    userData: {
        users:{
            data: any[];
        }
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        filters?: {
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
    const [perPage, setPerPage] = useState(userData.users.per_page || 10);
    const [page, setPage] = useState(userData.current_page || 1);
    console.log('userData:', userData);
    // Fetch data when any filter, perPage, or page changes
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            // Use Wayfinder's generated URL function instead of Ziggy's route()
            router.get(
                AdminUserController.index.url(), 
                { search, role, status, per_page: perPage, page },
                { preserveState: true, replace: true }
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search, role, status, perPage, page]);

    // Reset page to 1 when filters or perPage change
    useEffect(() => {
        setPage(1);
    }, [search, role, status, perPage]);

    return (
        <>
            {/* <Head title="Users Directory" /> */}
            <div className="flex h-full pt-10 flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6 py-6">
                        {/* Filters */}
                        <AdminUsersFilters
                            search={search}
                            onSearchChange={setSearch}
                            role={role}
                            onRoleChange={setRole}
                            status={status}
                            onStatusChange={setStatus}
                            roles={userData.filters?.roles || []}
                            statuses={userData.filters?.statuses || []}
                            total={userData.total}
                        />

                        {/* Table */}
                        <AdminUsersTable 
                            users={userData} 
                            total={userData.total}
                            currentPage={userData.current_page}
                            lastPage={userData.last_page}
                            perPage={perPage}
                            onPerPageChange={setPerPage}
                            onPageChange={setPage}
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
            href: "/admin/vessel-inventory",
        },
    ],
    pageHeader: {
        title: 'Users Directory',
        description:
            'Manage fleet, oversee demise compliance, and approve listings.',
    },
};