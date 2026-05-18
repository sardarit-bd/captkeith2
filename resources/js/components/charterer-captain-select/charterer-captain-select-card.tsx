import { Award, MapPin, ShieldCheck, Star, User } from 'lucide-react';
import type { Captain } from '@/pages/charterer/captain-select';

export function ChartererCaptainSelectCard({
    captain,
    selected,
    onSelect,
}: {
    captain: Captain;
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
                <div className="relative shrink-0">
                    {captain.photo ? (
                        <img
                            src={captain.photo}
                            alt={captain.name}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-9 w-9 text-gray-400" />
                        </div>
                    )}
                    {captain.isVerified && (
                        <span className="absolute -right-1 -bottom-1 rounded-full bg-white p-0.5 shadow-sm">
                            <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        </span>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg leading-tight font-bold text-[#111827]">
                            {captain.name}
                        </h3>
                        {captain.isVerified && (
                            <span className="inline-flex shrink-0 items-center rounded-full bg-[#D1FAE5] px-2.5 py-1 text-xs font-semibold text-[#065F46]">
                                Verified
                            </span>
                        )}
                    </div>

                    <div className="mt-3 space-y-1.5">
                        {captain.location && captain.location !== '—' && (
                            <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                                <MapPin className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                <span>{captain.location}</span>
                            </p>
                        )}
                        {captain.license && captain.license !== '—' && (
                            <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                                <Award className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                <span>{captain.license}</span>
                            </p>
                        )}
                        {captain.experience && captain.experience !== '—' && (
                            <p className="flex items-center gap-2 text-sm text-[#4b5563]">
                                <Star className="h-4 w-4 shrink-0 text-[#9ca3af]" />
                                <span>{captain.experience}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {captain.endorsements.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                    {captain.endorsements.map((tag) => (
                        <span
                            key={tag}
                            className="rounded border border-[#e5e7eb] bg-white px-2.5 py-1 text-xs font-medium text-[#4b5563]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {captain.bio && (
                <p className="mt-5 line-clamp-3 flex-1 text-sm leading-relaxed text-[#6b7280]">
                    {captain.bio}
                </p>
            )}

            {captain.rate && captain.rate !== '—' && (
                <footer className="mt-6">
                    <p className="text-[20px] leading-none font-bold text-[#111827]">
                        {captain.rate}
                    </p>
                </footer>
            )}
        </button>
    );
}
