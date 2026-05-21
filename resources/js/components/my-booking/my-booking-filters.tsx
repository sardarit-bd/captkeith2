import { useState } from 'react';
import type { BookingFilter, BookingFilterId } from './my-booking-data';

interface Props {
    filters: BookingFilter[];
    onFilterChange: (id: BookingFilterId) => void;
    activeFilter: BookingFilterId;
}

export function MyBookingFilters({
    filters,
    onFilterChange,
    activeFilter,
}: Props) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    onClick={() => onFilterChange(filter.id)}
                    className={`rounded-lg px-5 py-2 text-[13px] font-medium transition-colors ${
                        activeFilter === filter.id
                            ? 'bg-[#0A273F] text-white shadow-sm'
                            : 'border border-[#e5e7eb] bg-white text-[#374151] hover:bg-[#f9fafb]'
                    }`}
                >
                    {filter.label} ({filter.count})
                </button>
            ))}
        </div>
    );
}
