import { Ship } from 'lucide-react';
import type { VesselDetail } from '@/pages/yacht/details';

export function YachtDetailsHeader({ vessel }: { vessel: VesselDetail }) {
    return (
        <header className="relative z-10 flex flex-col justify-between gap-4 border-b border-[#f1f5f9] bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:px-6">
            <div className="flex items-center gap-4">
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eff6ff] text-[#3b82f6] sm:flex">
                    <Ship className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-[20px] leading-tight font-bold text-[#111827]">
                        {vessel.name}
                    </h2>
                    <p className="mt-0.5 text-[13px] text-[#6b7280]">
                        {vessel.registrationNo} · {vessel.type}
                    </p>
                </div>
            </div>
        </header>
    );
}
