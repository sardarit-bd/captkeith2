import { Heart, MapPin, MessageSquare, Ship } from 'lucide-react';
import type { YachtMatchRecord } from './yachts-match-data';

export function YachtsMatchCard({ yacht }: { yacht: YachtMatchRecord }) {
    return (
        <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="h-48 w-full overflow-hidden bg-[#f3f4f6] sm:h-56">
                {yacht.image ? (
                    <img
                        src={yacht.image}
                        alt={`${yacht.name} yacht`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Ship className="h-12 w-12 text-[#d1d5db]" />
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-lg leading-tight font-bold text-[#111827]">
                            {yacht.name}
                        </h3>
                        <p className="mt-0.5 text-[13px] text-[#6b7280]">
                            {yacht.registrationNo}
                        </p>
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="mb-0.5 text-[11px] font-medium text-[#6b7280]">
                            Type
                        </p>
                        <p className="text-sm font-semibold text-[#111827]">
                            {yacht.type}
                        </p>
                    </div>
                    <div>
                        <p className="mb-0.5 text-[11px] font-medium text-[#6b7280]">
                            Length
                        </p>
                        <p className="text-sm font-semibold text-[#111827]">
                            {yacht.length}
                        </p>
                    </div>
                </div>

                <p className="mb-3 flex items-center gap-2 text-[13px] text-[#4b5563]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                    {yacht.marina}
                    {yacht.city ? `, ${yacht.city}` : ''}
                    {yacht.state ? `, ${yacht.state}` : ''}
                </p>

                {yacht.operatingArea && (
                    <p className="mb-4 line-clamp-2 text-[12px] text-[#6b7280]">
                        {yacht.operatingArea}
                    </p>
                )}

                <div className="mb-8">
                    <p className="mb-2.5 text-[12px] text-[#6b7280]">
                        Required Qualifications:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {yacht.qualifications.map((q) => (
                            <span
                                key={q}
                                className="rounded-md border border-[#f3f4f6] bg-[#f9fafb] px-2.5 py-1.5 text-[11px] font-medium text-[#374151]"
                            >
                                {q}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                    <button
                        type="button"
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0D314D] py-3 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#0a273f]"
                    >
                        <Heart className="h-4 w-4" />
                        Interested
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-lg border border-[#e5e7eb] p-3 text-[#4b5563] shadow-sm transition-colors hover:bg-[#f9fafb] hover:text-[#111827]"
                    >
                        <MessageSquare className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </article>
    );
}
