import { Save } from 'lucide-react';

export function AdminProfileActions() {
    return (
        <footer className="flex flex-col justify-end gap-3 pb-8 pt-4 sm:flex-row">
            <button
                type="button"
                className="w-full rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto"
            >
                Discard Changes
            </button>
            <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#35ADD5] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 sm:w-auto"
            >
                <Save className="mr-2 h-4 w-4" />
                Update Profile
            </button>
        </footer>
    );
}
