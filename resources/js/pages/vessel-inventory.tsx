import { Head } from '@inertiajs/react';
import { VesselInventoryPageContent } from '@/components/vessel-inventory/vessel-inventory-page-content';

interface Props {
    vessels: any; // Replace with proper type later
    filters: any;
}

export default function VesselInventoryPage({ vessels, filters }: Props) {
    return (
        <>
            <Head title="Vessel Inventory" />
            <VesselInventoryPageContent vessels={vessels} initialFilters={filters} />
        </>
    );
}

VesselInventoryPage.layout = {
    breadcrumbs: [{ title: 'Vessel Inventory', href: '/admin/vessel-inventory' }],
    pageHeader: {
        title: 'Vessel Inventory',
        description: 'Manage fleet, oversee demise compliance, and approve listings.',
    },
};