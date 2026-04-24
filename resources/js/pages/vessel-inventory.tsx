import { Head } from '@inertiajs/react';
import { VesselInventoryPageContent } from '@/components/vessel-inventory/vessel-inventory-page-content';
import { vesselInventory } from '@/routes';

export default function VesselInventoryPage() {
    return (
        <>
            <Head title="Vessel Inventory" />
            <VesselInventoryPageContent />
        </>
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
