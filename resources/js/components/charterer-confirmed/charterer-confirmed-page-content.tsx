import { Link } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { dashboard } from '@/routes';

export function ChartererConfirmedPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] px-4 font-poppins">
            <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#D1FAE5] bg-[#ECFDF5]">
                    <Check className="h-8 w-8 text-[#10B981]" />
                </div>
                <h2 className="mb-2 text-[28px] font-bold text-[#111827] sm:text-[32px]">
                    Charter Confirmed!
                </h2>
                <p className="mb-8 text-[15px] text-[#6b7280]">
                    Your bareboat charter is complete and ready to go
                </p>

                <Link
                    href={dashboard()}
                    className="rounded-lg bg-[#35ADD5] px-8 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
