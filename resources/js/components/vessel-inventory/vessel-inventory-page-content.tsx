import { VesselInventoryFilters } from './vessel-inventory-filters';
import VesselInventoryTable from './vessel-inventory-table';

interface Props {
    vessels: any;
    initialFilters: any;
}

export function VesselInventoryPageContent({ vessels, initialFilters }: Props) {
    // console.log(vessels);
    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full py-4">
                    <VesselInventoryFilters initialFilters={initialFilters} />
                    {/* Changed filters={filters} to filters={initialFilters} */}
                    <VesselInventoryTable vessels={vessels} filters={initialFilters} />
                </div>
            </div>
        </div>
    );
}