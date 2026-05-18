import { Compass, MapPin, Ship } from 'lucide-react';
import type { CharterRequestYacht } from './charterer-request-data';

type Props = {
    yacht: CharterRequestYacht;
};

export function ChartererRequestYachtCard({ yacht }: Props) {
    return (
        <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
            <header className="mb-6 flex items-center gap-2">
                <Ship className="h-5 w-5 text-[#111827]" />
                <h3 className="text-base font-bold text-[#111827]">
                    Yacht Details
                </h3>
            </header>

            <div className="flex flex-col items-start gap-6 md:flex-row lg:gap-8">
                {yacht.image ? (
                    <img
                        src={yacht.image}
                        alt={yacht.name}
                        className="h-48 w-full shrink-0 rounded-xl object-cover md:h-[220px] md:w-[380px]"
                    />
                ) : (
                    <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-xl bg-[#f3f4f6] md:h-[220px] md:w-[380px]">
                        <Ship className="h-12 w-12 text-[#d1d5db]" />
                    </div>
                )}

                <div className="flex-1 space-y-6">
                    <div>
                        <h4 className="text-2xl leading-tight font-bold text-[#111827]">
                            {yacht.name}
                        </h4>
                        <p className="mt-1 text-sm text-[#6b7280]">
                            {yacht.registrationNumber}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <DetailsItem label="Type" value={yacht.type} />
                        <DetailsItem label="Length" value={yacht.length} />
                    </div>

                    <div className="space-y-3 pt-2">
                        <p className="flex items-center gap-2.5 text-sm text-[#4b5563]">
                            <MapPin className="h-4 w-4 text-[#9ca3af]" />
                            <span>{yacht.marina}</span>
                        </p>
                        <p className="flex items-center gap-2.5 text-sm text-[#4b5563]">
                            <Compass className="h-4 w-4 text-[#9ca3af]" />
                            <span>Operating Area: {yacht.operatingArea}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DetailsItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="mb-1 text-xs text-[#6b7280]">{label}</p>
            <p className="text-sm font-semibold text-[#111827]">{value}</p>
        </div>
    );
}
