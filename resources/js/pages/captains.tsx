import { Head } from '@inertiajs/react';
import {
    Award,
    CheckCircle2,
    ChevronDown,
    MapPin,
    MessageSquare,
    Search,
    Star,
} from 'lucide-react';
import { captains } from '@/routes';

type CaptainCard = {
    name: string;
    location: string;
    license: string;
    experience: string;
    match: string;
    endorsements: string[];
    bio: string;
    rate: string;
    availability: string;
};

const captainCards: CaptainCard[] = [
    {
        name: 'Captain James Morrison',
        location: 'Miami, FL',
        license: 'USCG Master 200 Ton',
        experience: '12 years experience',
        match: '95% Match',
        endorsements: ['Near Coastal', 'Sailing', 'Towing'],
        bio: 'Experienced captain with over 12 years navigating South Florida and Caribbean waters.',
        rate: '$150/hr',
        availability: 'Available',
    },
    {
        name: 'Captain Sarah Chen',
        location: 'Fort Lauderdale, FL',
        license: 'USCG Master 100 Ton',
        experience: '8 years experience',
        match: '92% Match',
        endorsements: ['Sailing', 'Auxiliary Sail'],
        bio: 'Specialized in sailing vessels with extensive experience in bareboat charters.',
        rate: '$125/hr',
        availability: 'Available',
    },
    {
        name: 'Captain Mike Rodriguez',
        location: 'Key West, FL',
        license: 'USCG Master 100 Ton',
        experience: '15 years experience',
        match: '98% Match',
        endorsements: ['Near Coastal'],
        bio: '15+ years captaining luxury yachts throughout the Caribbean and Gulf Coast.',
        rate: '$175/hr',
        availability: 'Available',
    },
];

export default function CaptainsPage() {
    return (
        <>
            <Head title="Captains" />

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-7xl space-y-8">
                    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    License Type
                                </label>
                                <div className="relative">
                                    <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A273F]">
                                        <option value="all">All</option>
                                        <option value="100ton">
                                            USCG Master 100 Ton
                                        </option>
                                        <option value="200ton">
                                            USCG Master 200 Ton
                                        </option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Min Experience
                                </label>
                                <div className="relative">
                                    <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-gray-50 px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A273F]">
                                        <option value="any">Any</option>
                                        <option value="5">5+ Years</option>
                                        <option value="10">10+ Years</option>
                                        <option value="15">15+ Years</option>
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Max Distance (mi)
                                </label>
                                <input
                                    type="number"
                                    defaultValue={50}
                                    className="w-full rounded-lg border-none bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0A273F]"
                                />
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                                >
                                    <Search className="h-4 w-4" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Suggested Captains
                        </h2>
                    </section>

                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {captainCards.map((captain) => (
                            <article
                                key={captain.name}
                                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
                            >
                                <div className="mb-4 flex items-start justify-between gap-4">
                                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                                        <div className="h-16 w-16 shrink-0 rounded-full bg-[#C4C4C4]" />
                                        <div>
                                            <h3 className="text-xl leading-tight font-bold text-gray-900">
                                                {captain.name}
                                            </h3>

                                            <div className="mt-3 space-y-1.5">
                                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="h-4 w-4 text-gray-400" />
                                                    <span>{captain.location}</span>
                                                </p>
                                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Award className="h-4 w-4 text-gray-400" />
                                                    <span>{captain.license}</span>
                                                </p>
                                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Star className="h-4 w-4 text-gray-400" />
                                                    <span>{captain.experience}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold text-[#065F46]">
                                        {captain.match}
                                    </span>
                                </div>

                                <div className="mb-4 mt-4 flex flex-wrap gap-2">
                                    {captain.endorsements.map((endorsement) => (
                                        <span
                                            key={endorsement}
                                            className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
                                        >
                                            {endorsement}
                                        </span>
                                    ))}
                                </div>

                                <p className="mb-6 flex-1 text-sm text-gray-500">
                                    {captain.bio}
                                </p>

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
                </div>
            </div>
        </>
    );
}

CaptainsPage.layout = {
    breadcrumbs: [
        {
            title: 'Captains',
            href: captains(),
        },
    ],
    pageHeader: {
        title: 'Find Captains',
        description: 'Browse and filter qualified captains for your vessels.',
    },
};
