import {
    AlertCircle,
    Anchor,
    ArrowRight,
    CheckCircle2,
    FileText,
    MapPin,
} from 'lucide-react';
import { yachtDetailsData } from './yacht-details-data';
import { DetailsCard, LabeledValue, SectionHeading } from './yacht-details-shared';

export function YachtDetailsMainColumn() {
    return (
        <div className="space-y-6 lg:col-span-2">
            <DetailsHeroCard />
            <RequirementsCard />
            <CharterDetailsCard />
            <RouteLocationCard />
            <VesselInfoCard />
            <AdditionalInfoCard />
        </div>
    );
}

function DetailsHeroCard() {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#f1f5f9] bg-white shadow-sm">
            <div className="relative mb-1.5 h-48 w-full overflow-hidden sm:h-64 md:h-80">
                <img
                    src={yachtDetailsData.heroImage}
                    alt={`${yachtDetailsData.yachtName} Yacht`}
                    className="h-full w-full object-cover"
                />
                <span className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#1f2937] shadow-sm backdrop-blur-sm">
                    {yachtDetailsData.yachtType}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 divide-x divide-[#f3f4f6] p-4 sm:grid-cols-4 sm:gap-6 sm:p-6">
                {yachtDetailsData.quickStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1 px-2 sm:px-6">
                        <p className="text-[11px] font-medium tracking-wider text-[#6b7280] uppercase">
                            {stat.label}
                        </p>
                        <p className="text-[14px] font-bold leading-tight text-[#111827]">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function RequirementsCard() {
    return (
        <DetailsCard>
            <SectionHeading
                title="Charter Requirements"
                icon={<AlertCircle className="h-5 w-5 text-[#f97316]" />}
            />

            <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-5">
                <p className="mb-4 text-[13px] font-semibold text-[#9a3412]">
                    Please ensure you meet all requirements before accepting this
                    charter
                </p>

                <div className="space-y-4">
                    <LabeledValue
                        label="License Required"
                        value={yachtDetailsData.requirements.license}
                    />
                    <LabeledValue
                        label="Experience Required"
                        value={yachtDetailsData.requirements.experience}
                    />

                    <div>
                        <p className="mb-2 text-[12px] text-[#6b7280]">
                            Required Certifications
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {yachtDetailsData.requirements.certifications.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1.5 rounded border border-[#e5e7eb] bg-white px-2.5 py-1 text-[12px] font-medium text-[#374151] shadow-sm"
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5 text-[#3b82f6]" />
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-[12px] text-[#6b7280]">Special Skills</p>
                        <div className="flex flex-wrap gap-2">
                            {yachtDetailsData.requirements.specialSkills.map((item) => (
                                <span
                                    key={item}
                                    className="rounded bg-[#f3f4f6] px-2.5 py-1 text-[12px] font-medium text-[#374151]"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <LabeledValue
                            label="Languages"
                            value={yachtDetailsData.requirements.languages}
                        />
                        <LabeledValue
                            label="Dress Code"
                            value={yachtDetailsData.requirements.dressCode}
                        />
                    </div>
                </div>
            </div>
        </DetailsCard>
    );
}

function CharterDetailsCard() {
    return (
        <DetailsCard>
            <SectionHeading
                title="Charter Details"
                icon={<FileText className="h-5 w-5 text-[#60a5fa]" />}
            />

            <div className="mb-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <LabeledValue
                    label="Charter Type"
                    value={yachtDetailsData.charterDetails.charterType}
                />
                <LabeledValue
                    label="Occasion"
                    value={yachtDetailsData.charterDetails.occasion}
                />
                <LabeledValue
                    label="Guest Composition"
                    value={yachtDetailsData.charterDetails.guestComposition}
                />
                <LabeledValue
                    label="Catering"
                    value={yachtDetailsData.charterDetails.catering}
                />
            </div>

            <div className="mb-6">
                <LabeledValue
                    label="Planned Activities"
                    value={yachtDetailsData.charterDetails.activities}
                />
            </div>

            <div className="rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-4">
                <p className="mb-1 text-[12px] text-[#6b7280]">Special Requests</p>
                <p className="text-[13px] font-medium text-[#2563eb]">
                    {yachtDetailsData.charterDetails.specialRequests}
                </p>
            </div>
        </DetailsCard>
    );
}

function RouteLocationCard() {
    const weather = yachtDetailsData.route.weather;

    return (
        <DetailsCard>
            <SectionHeading
                title="Route & Location"
                icon={<MapPin className="h-5 w-5 text-[#f87171]" />}
            />

            <div className="mb-6 space-y-5">
                <LabeledValue
                    label="Departure Point"
                    value={yachtDetailsData.route.departure}
                />

                <div>
                    <p className="mb-1 text-[12px] text-[#6b7280]">Planned Route</p>
                    <div className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-[#111827]">
                        {yachtDetailsData.route.stops.map((stop, index) => (
                            <div key={stop} className="flex items-center gap-2">
                                <span>{stop}</span>
                                {index < yachtDetailsData.route.stops.length - 1 ? (
                                    <ArrowRight className="h-3 w-3 text-[#9ca3af]" />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-[#f9fafb] p-4 sm:p-5">
                <p className="mb-3 text-[12px] font-semibold tracking-wider text-[#6b7280] uppercase">
                    Weather Forecast
                </p>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <LabeledValue label="Condition" value={weather.condition} />
                    <LabeledValue label="Temperature" value={weather.temperature} />
                    <LabeledValue label="Wind Speed" value={weather.windSpeed} />
                    <LabeledValue label="Wave Height" value={weather.waveHeight} />
                    <div className="sm:hidden">
                        <LabeledValue label="Visibility" value={weather.visibility} />
                    </div>
                </div>
            </div>
        </DetailsCard>
    );
}

function VesselInfoCard() {
    return (
        <DetailsCard>
            <SectionHeading
                title="Vessel Information"
                icon={<Anchor className="h-5 w-5 text-[#3b82f6]" />}
            />

            <div className="mb-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
                <LabeledValue label="Length" value={yachtDetailsData.vessel.length} />
                <LabeledValue label="Year" value={yachtDetailsData.vessel.year} />
                <LabeledValue
                    label="Capacity"
                    value={yachtDetailsData.vessel.capacity}
                />
                <LabeledValue label="Crew" value={yachtDetailsData.vessel.crew} />
            </div>

            <div>
                <p className="mb-2 text-[12px] text-[#6b7280]">Amenities</p>
                <div className="flex flex-wrap gap-2">
                    {yachtDetailsData.vessel.amenities.map((item) => (
                        <span
                            key={item}
                            className="rounded bg-[#f3f4f6] px-2.5 py-1 text-[12px] font-medium text-[#374151]"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </DetailsCard>
    );
}

function AdditionalInfoCard() {
    return (
        <section className="flex items-start gap-3 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-6 shadow-sm">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#16a34a]" />
            <div>
                <h4 className="mb-1 text-[14px] font-bold text-[#166534]">
                    Additional Information
                </h4>
                <p className="text-[13px] leading-relaxed text-[#15803d]">
                    {yachtDetailsData.additionalInfo}
                </p>
            </div>
        </section>
    );
}
