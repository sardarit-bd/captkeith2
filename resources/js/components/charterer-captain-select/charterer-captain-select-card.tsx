import { Link } from '@inertiajs/react';
import {
    Anchor,
    Briefcase,
    MapPin,
    ShieldCheck,
    User,
    Waves,
} from 'lucide-react';
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
            className={`w-full cursor-pointer overflow-hidden rounded-2xl border bg-white text-left transition-all ${
                selected
                    ? 'border-[#0A273F] ring-1 ring-[#0A273F]'
                    : 'border-[#e5e7eb] hover:border-[#d1d5db]'
            }`}
        >
            {selected && (
                <div className="flex items-center gap-1.5 bg-[#0A273F] px-3 py-1">
                    <ShieldCheck className="h-3 w-3 text-white" />
                    <span className="text-[11px] font-medium text-white">
                        Selected
                    </span>
                </div>
            )}

            <div className="flex items-start gap-4 p-5">
                <div className="relative shrink-0">
                    {captain.photo ? (
                        <img
                            src={captain.photo}
                            alt={captain.name}
                            className="h-18 w-18 rounded-full border border-[#e5e7eb] object-cover"
                        />
                    ) : (
                        <div className="flex h-18 w-18 items-center justify-center rounded-full border border-[#e5e7eb] bg-gray-100">
                            <User className="h-7 w-7 text-gray-400" />
                        </div>
                    )}
                    {captain.isVerified && (
                        <span className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-100">
                            <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        </span>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            {/* Clickable name → captain profile. stopPropagation so it doesn't toggle selection */}
                            <Link
                                href={`/captains/${captain.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[15px] leading-tight font-semibold text-[#111827] hover:text-[#0A273F] hover:underline"
                            >
                                {captain.name}
                            </Link>
                            {captain.license && captain.license !== '—' && (
                                <p className="mt-0.5 text-[12px] text-[#6b7280]">
                                    {captain.license}
                                    {captain.tonnage &&
                                        captain.tonnage !== '—' && (
                                            <span className="ml-1.5 text-[#9ca3af]">
                                                · {captain.tonnage}
                                            </span>
                                        )}
                                </p>
                            )}
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            {captain.isVerified && (
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                                    Verified
                                </span>
                            )}
                            {captain.rate && captain.rate !== '—' && (
                                <span className="text-[15px] font-semibold text-[#111827]">
                                    {captain.rate}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-3">
                        {captain.location && captain.location !== '—' && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                {captain.location}
                            </span>
                        )}
                        {captain.experience && captain.experience !== '—' && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <Briefcase className="h-3.5 w-3.5 shrink-0" />
                                {captain.experience}
                            </span>
                        )}
                        {captain.geographicArea && (
                            <span className="flex items-center gap-1 text-[12px] text-[#6b7280]">
                                <Anchor className="h-3.5 w-3.5 shrink-0" />
                                {captain.geographicArea}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {(captain.bio ||
                captain.endorsements.length > 0 ||
                captain.bodiesOfWater) && (
                <div className="space-y-2.5 border-t border-[#f1f5f9] px-5 py-3.5">
                    {captain.bio && (
                        <p className="line-clamp-2 text-[12px] leading-relaxed text-[#6b7280]">
                            {captain.bio}
                        </p>
                    )}
                    {captain.bodiesOfWater && (
                        <p className="flex items-center gap-1.5 text-[12px] text-[#6b7280]">
                            <Waves className="h-3.5 w-3.5 shrink-0 text-[#9ca3af]" />
                            {captain.bodiesOfWater}
                        </p>
                    )}
                    {captain.endorsements.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {captain.endorsements.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-0.5 text-[11px] text-[#4b5563]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="flex gap-5 border-t border-[#f1f5f9] bg-[#f9fafb] px-5 py-2.5">
                {captain.canProvideDeckhand && (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Can provide deckhand
                    </span>
                )}
            </div>
        </button>
    );
}
