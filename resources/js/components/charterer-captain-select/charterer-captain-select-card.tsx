import { Award, MapPin, Star } from 'lucide-react';
import type { CaptainCandidate } from './charterer-captain-select-data';

export function ChartererCaptainSelectCard({
    captain,
    selected,
    onSelect,
}: {
    captain: CaptainCandidate;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`flex h-full w-full cursor-pointer flex-col rounded-2xl border bg-white p-6 text-left shadow-sm transition-all ${
                selected
                    ? 'border-[#0A273F] bg-[#f8fafc] ring-1 ring-[#0A273F]'
                    : 'border-[#e5e7eb] hover:border-[#d1d5db]'
            }`}
        >
            <div className="flex items-start gap-4">
                <img
                    src={captain.avatar}
                    alt={captain.name}
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                />

                <div>
                    <h3 className="text-lg leading-tight font-bold text-[#111827]">
                        {captain.name}
                    </h3>

                    <div className="mt-3 space-y-1.5">
                        <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                            <MapPin className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            <span>{captain.location}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                            <Award className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            <span>{captain.license}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                            <Star className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                            <span>{captain.experience}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {captain.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-medium text-[#4b5563]"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <p className="mt-5 flex-1 text-sm leading-relaxed text-[#6b7280]">
                {captain.bio}
            </p>

            <footer className="mt-6 flex items-center justify-between">
                <p className="text-[20px] leading-none font-bold text-[#111827]">
                    {captain.rate}
                </p>
                <span className="inline-flex items-center rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#059669]">
                    {captain.match}
                </span>
            </footer>
        </button>
    );
}
