import { Plus, Trash2 } from 'lucide-react';
import { unavailableDates } from './account-preferences-data';
import { PreferencesCard } from './account-preferences-shared';

export function AccountPreferencesManageAvailability() {
    return (
        <PreferencesCard
            title="Manage Availability"
            description="Mark dates when you're unavailable"
        >
            <div className="mb-6 space-y-4">
                {unavailableDates.map((item) => (
                    <article
                        key={item.id}
                        className="flex items-center justify-between rounded-xl border border-[#f1f5f9] p-4 transition-colors hover:border-[#e5e7eb]"
                    >
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                {item.dateRange}
                            </h4>
                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                {item.reason}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#4b5563]">
                                Unavailable
                            </span>
                            <button
                                type="button"
                                className="p-1 text-[#f87171] transition-colors hover:text-[#dc2626]"
                                title="Remove Date"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
            >
                <Plus className="h-4 w-4" />
                Add Unavailable Date
            </button>
        </PreferencesCard>
    );
}
