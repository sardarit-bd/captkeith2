import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { VesselInventoryPageContent } from '@/components/vessel-inventory/vessel-inventory-page-content';

interface Props {
    vessels: any; 
    filters: any;
}

export default function VesselInventory({ vessels, filters }: Props) {
    return (
        <div className='pt-10'>
            <Head title="Vessel Inventory" />
            <VesselInventoryPageContent vessels={vessels} initialFilters={filters} />
        </div>
    );
}

VesselInventory.layout = {
    breadcrumbs: [{ title: 'Vessel Inventory', href: '/admin/vessel-inventory' 
    }],
    pageHeader: {
        title: 'Vessel Inventory',
        description: 'Manage fleet, oversee demise compliance, and approve listings.',
    },
};