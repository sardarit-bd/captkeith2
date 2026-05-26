import { useState } from 'react';
import { Anchor, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { VesselDetail } from '@/pages/yacht/details';
import {
    DetailsCard,
    LabeledValue,
    SectionHeading,
} from './yacht-details-shared';

export function YachtDetailsMainColumn({ vessel }: { vessel: VesselDetail }) {
    return (
        <div className="space-y-6 lg:col-span-2">
            <HeroCard vessel={vessel} />
            <VesselSpecsCard vessel={vessel} />
            <CaptainRequirementsCard vessel={vessel} />
            <LocationCard vessel={vessel} />
        </div>
    );
}

function HeroCard({ vessel }: { vessel: VesselDetail }) {
    const images =
        vessel.allImages && vessel.allImages.length > 0
            ? vessel.allImages
            : vessel.image
              ? [vessel.image]
              : [];

    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

    return (
        <section className="overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white shadow-sm">
            <div className="relative h-48 w-full overflow-hidden sm:h-64 md:h-80">
                {images.length > 0 ? (
                    <>
                        <img
                            key={current}
                            src={images[current]}
                            alt={`${vessel.name} photo ${current + 1}`}
                            className="h-full w-full object-cover transition-opacity duration-300"
                        />

                        {/* Vessel type badge */}
                        <span className="absolute top-4 right-4 rounded-md bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#1f2937] shadow-sm backdrop-blur-sm">
                            {vessel.type}
                        </span>

                        {/* Navigation arrows - only show if more than 1 image */}
                        {images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>

                                {/* Dot indicators */}
                                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setCurrent(i)}
                                            className={`h-1.5 cursor-pointer rounded-full transition-all ${
                                                i === current
                                                    ? 'w-4 bg-white'
                                                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Counter */}
                                <span className="absolute right-4 bottom-3 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                                    {current + 1} / {images.length}
                                </span>
                            </>
                        )}
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-[#e8edf2]">
                        <div className="flex flex-col items-center gap-3">
                            <Anchor className="h-16 w-16 text-[#c4c9d4]" />
                            <p className="text-[12px] text-[#b0b7c3]">
                                No photos uploaded
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnail strip - only show if more than 1 image */}
            {images.length > 1 && (
                <div className="scrollbar-none flex gap-2 overflow-x-auto p-3">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrent(i)}
                            className={`h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
                                i === current
                                    ? 'border-[#3DB3DE] opacity-100'
                                    : 'border-transparent opacity-60 hover:opacity-90'
                            }`}
                        >
                            <img
                                src={src}
                                alt={`Thumbnail ${i + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 divide-x divide-[#f3f4f6] border-t border-[#f1f5f9] p-4 sm:grid-cols-4 sm:gap-6 sm:p-6">
                {[
                    { label: 'Length', value: vessel.lengthFt },
                    { label: 'Draft', value: vessel.draftFt },
                    { label: 'Make', value: vessel.make },
                    { label: 'Model', value: vessel.model },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col gap-1 px-2 sm:px-6"
                    >
                        <p className="text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                            {stat.label}
                        </p>
                        <p className="text-[14px] leading-tight font-bold text-[#111827]">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function VesselSpecsCard({ vessel }: { vessel: VesselDetail }) {
    return (
        <DetailsCard>
            <SectionHeading
                title="Vessel Specifications"
                icon={<Anchor className="h-5 w-5 text-[#3b82f6]" />}
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <LabeledValue label="Type" value={vessel.type} />
                <LabeledValue label="Length" value={vessel.lengthFt} />
                <LabeledValue label="Beam" value={vessel.beamFt} />
                <LabeledValue label="Draft" value={vessel.draftFt} />
                <LabeledValue
                    label="Operating Area"
                    value={vessel.operatingArea}
                />
                <LabeledValue
                    label="Deckhand Required"
                    value={vessel.deckhandRequired}
                />
                <LabeledValue
                    label="Mooring Location"
                    value={vessel.mooringLocation}
                />
                <LabeledValue label="Capacity" value={vessel.capacity} />
            </div>
        </DetailsCard>
    );
}

function CaptainRequirementsCard({ vessel }: { vessel: VesselDetail }) {
    return (
        <DetailsCard>
            <SectionHeading
                title="Captain Requirements"
                icon={<Anchor className="h-5 w-5 text-[#f97316]" />}
            />
            <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-5">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <LabeledValue
                        label="Required License"
                        value={vessel.requiredLicense}
                    />
                    <LabeledValue
                        label="Tonnage Rating"
                        value={vessel.requiredTonnage}
                    />
                    <LabeledValue
                        label="Endorsement"
                        value={vessel.requiredEndorsement}
                    />
                    <LabeledValue
                        label="Min. Experience"
                        value={vessel.requiredExperience}
                    />
                </div>
            </div>
        </DetailsCard>
    );
}

function LocationCard({ vessel }: { vessel: VesselDetail }) {
    return (
        <DetailsCard>
            <SectionHeading
                title="Location"
                icon={<MapPin className="h-5 w-5 text-[#f87171]" />}
            />
            <LabeledValue
                label="Mooring Location"
                value={vessel.mooringLocation}
            />
            <div className="mt-4">
                <LabeledValue
                    label="Operating Area"
                    value={vessel.operatingArea}
                />
            </div>
        </DetailsCard>
    );
}
