import { CalendarPlus } from 'lucide-react';
import { MyBookingList } from './my-booking-list';

export function MyBookingPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
                <div className="mx-auto mt-6 w-full max-w-300">
                    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div />
                        {/* <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#06B6D4] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#0891B2] sm:w-auto"
                        >
                            <CalendarPlus className="h-4 w-4" />
                            New Booking
                        </button> */}
                    </div>

                    <MyBookingList />
                </div>
            </div>
        </div>
    );
}
