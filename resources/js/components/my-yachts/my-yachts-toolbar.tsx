import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { create as createMyYacht } from '@/routes/my-yachts';

export function MyYachtsToolbar() {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Link
                href={createMyYacht()}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#35ADD5] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#35ADD5]/70 hover:shadow-md sm:w-auto"
            >
                <Plus className="h-4 w-4" />
                Add Vessel
            </Link>
        </div>
    );
}
