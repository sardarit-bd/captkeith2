import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { create as createMyYacht } from '@/routes/my-yachts';

export function MyYachtsToolbar() {
    return (
        <div className="mb-8 flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search yachts, location etc..."
                    className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm leading-5 placeholder:text-gray-400 focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                />
            </div>

            <Link
                href={createMyYacht()}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] md:w-auto"
            >
                <Plus className="h-4 w-4" />
                Add Vessel
            </Link>
        </div>
    );
}
