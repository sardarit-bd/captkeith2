import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { create as createMyYacht } from '@/routes/my-yachts';

export function MyYachtsToolbar() {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#c4c9d4]" />
                <input
                    type="text"
                    placeholder="Search yachts, location..."
                    className="block w-full rounded-xl border border-[#e5e7eb] bg-white py-2.5 pr-4 pl-10 text-[13px] text-[#111827] placeholder:text-[#c4c9d4] focus:border-[#3DB3DE] focus:ring-2 focus:ring-[#3DB3DE]/15 focus:outline-none"
                />
            </div>

            <Link
                href={createMyYacht()}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0D314D] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#123651] hover:shadow-md sm:w-auto"
            >
                <Plus className="h-4 w-4" />
                Add Vessel
            </Link>
        </div>
    );
}
