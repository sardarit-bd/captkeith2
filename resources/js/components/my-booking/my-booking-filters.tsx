import { bookingFilters } from './my-booking-data';

export function MyBookingFilters() {
    return (
        <div className="mb-6 flex flex-wrap items-center gap-2">
            {bookingFilters.map((filter) => (
                <button
                    key={filter.id}
                    type="button"
                    className={`rounded-lg px-5 py-2 text-[13px] font-medium transition-colors ${
                        filter.active
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
