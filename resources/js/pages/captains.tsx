import { Head, router, usePage } from '@inertiajs/react';
import {
    Award,
    CheckCircle2,
    ChevronDown,
    MapPin,
    MessageSquare,
    Search,
    ShieldCheck,
    Star,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { captains } from '@/routes';

interface Captain {
    id: string;
    name: string;
    location: string;
    license: string;
    experience: string;
    endorsement: string[];
    bio: string;
    rate: string;
    availability: string;
    photo: string | null;
    is_verified: boolean;
}

interface Filters {
    license_type?: string;
    min_experience?: string;
}

interface PageProps {
    captains: Captain[];
    filters: Filters;
}

const LICENSE_OPTIONS = [
    { value: '', label: 'All' },
    { value: 'oupv', label: 'OUPV (6-Pack)' },
    { value: 'masters', label: 'Masters' },
];

const EXPERIENCE_OPTIONS = [
    { value: '', label: 'Any' },
    { value: '5', label: '5+ Years' },
    { value: '10', label: '10+ Years' },
    { value: '15', label: '15+ Years' },
];

export default function CaptainsPage() {
    const { captains: initialCaptains, filters } = usePage<PageProps>().props;

    const [licenseType, setLicenseType] = useState(filters.license_type ?? '');
    const [minExperience, setMinExperience] = useState(
        filters.min_experience ?? '',
    );

    const handleSearch = () => {
        router.get(
            '/captains',
            {
                ...(licenseType ? { license_type: licenseType } : {}),
                ...(minExperience ? { min_experience: minExperience } : {}),
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Captains" />

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl space-y-8">
                    {/* Filters */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    License Type
                                </label>
                                <div className="relative">
                                    <select
                                        value={licenseType}
                                        onChange={(e) =>
                                            setLicenseType(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border-none bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#0A273F] focus:outline-none"
                                    >
                                        {LICENSE_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Min Experience
                                </label>
                                <div className="relative">
                                    <select
                                        value={minExperience}
                                        onChange={(e) =>
                                            setMinExperience(e.target.value)
                                        }
                                        className="w-full cursor-pointer appearance-none rounded-lg border-none bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:ring-2 focus:ring-[#0A273F] focus:outline-none"
                                    >
                                        {EXPERIENCE_OPTIONS.map((o) => (
                                            <option
                                                key={o.value}
                                                value={o.value}
                                            >
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div className="hidden lg:block" />

                            <div>
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                                >
                                    <Search className="h-4 w-4" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {initialCaptains.length > 0
                                ? `${initialCaptains.length} Captain${initialCaptains.length !== 1 ? 's' : ''} Found`
                                : 'No Captains Found'}
                        </h2>
                    </section>

                    {initialCaptains.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
                            <User className="mb-4 h-12 w-12 text-gray-300" />
                            <p className="text-sm font-medium text-gray-500">
                                No captains match your filters.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setLicenseType('');
                                    setMinExperience('');
                                    router.get(
                                        '/captains',
                                        {},
                                        { preserveState: false },
                                    );
                                }}
                                className="mt-4 cursor-pointer text-sm font-medium text-[#0A273F] underline hover:text-[#123651]"
                            >
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {initialCaptains.map((captain) => (
                                <article
                                    key={captain.id}
                                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                                >
                                    <div className="mb-4 flex items-start justify-between gap-4">
                                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                            {/* Avatar */}
                                            <div className="relative h-16 w-16 shrink-0">
                                                {captain.photo ? (
                                                    <img
                                                        src={captain.photo}
                                                        alt={captain.name}
                                                        className="h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                                                        <User className="h-8 w-8 text-gray-400" />
                                                    </div>
                                                )}
                                                {captain.is_verified && (
                                                    <span className="absolute -right-1 -bottom-1 rounded-full bg-white p-0.5">
                                                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-xl leading-tight font-bold text-gray-900">
                                                    {captain.name}
                                                </h3>
                                                <div className="mt-3 space-y-1.5">
                                                    {captain.location && (
                                                        <p className="flex items-center gap-2 text-sm text-gray-600">
                                                            <MapPin className="h-4 w-4 text-gray-400" />
                                                            <span>
                                                                {
                                                                    captain.location
                                                                }
                                                            </span>
                                                        </p>
                                                    )}
                                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Award className="h-4 w-4 text-gray-400" />
                                                        <span>
                                                            {captain.license}
                                                        </span>
                                                    </p>
                                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Star className="h-4 w-4 text-gray-400" />
                                                        <span>
                                                            {captain.experience}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {captain.is_verified && (
                                            <span className="inline-flex shrink-0 items-center rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold whitespace-nowrap text-[#065F46]">
                                                Verified
                                            </span>
                                        )}
                                    </div>

                                    {captain.endorsement.length > 0 && (
                                        <div className="mt-2 mb-4 flex flex-wrap gap-2">
                                            {captain.endorsement.map((e) => (
                                                <span
                                                    key={e}
                                                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
                                                >
                                                    {e}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {captain.bio && (
                                        <p className="mb-6 flex-1 text-sm text-gray-500">
                                            {captain.bio}
                                        </p>
                                    )}

                                    <footer className="mt-auto flex items-center justify-between border-t border-gray-50 pt-5">
                                        <div>
                                            <p className="text-lg leading-none font-bold text-gray-900">
                                                {captain.rate}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {captain.availability}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Qualified
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                            >
                                                <MessageSquare className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </footer>
                                </article>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}

CaptainsPage.layout = {
    breadcrumbs: [{ title: 'Captains', href: captains() }],
    pageHeader: {
        title: 'Find Captains',
        description: 'Browse and filter qualified captains for your vessels.',
    },
};
