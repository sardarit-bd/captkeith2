import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Plus, Upload } from 'lucide-react';
import { myYachts } from '@/routes';
import { create as createMyYacht } from '@/routes/my-yachts';

const yachtTypes = ['Power', 'Sail', 'Catamaran'] as const;
const licenseTypes = [
    'USCG Master 100 Ton',
    'USCG Master 200 Ton',
    'USCG Master 500 Ton',
] as const;
const ratings = ['Master', 'Mate', 'OOUV'] as const;
const endorsements = [
    'Near Coastal',
    'Sailing',
    'Auxiliary Sail',
    'Towing',
    'Assistance Towing',
] as const;

export default function CreateYachtPage() {
    return (
        <>
            <Head title="Add New Yacht" />

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    {/* <div className="mb-10">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Add New Yacht
                        </h2>
                        <p className="mt-2 text-gray-500">
                            List your vessel and set captain requirements
                        </p>
                    </div> */}

                    <form className="space-y-10">
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Basic Information
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Enter your vessel details
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold">
                                        Vessel Name <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Sea Dream"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Official Number *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="US-1234567"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Type *
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                            <option value="">Select type</option>
                                            {yachtTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Length (ft) *
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="65"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Draft (ft) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="5.5"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Mooring Location *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Miami Beach Marina"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Operating Area *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="South Florida Waters"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Photos
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Add photos of your yacht
                                </p>
                            </div>

                            <label className="group flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 transition-all hover:border-[#0A273F] hover:bg-gray-50 hover:text-[#0A273F]">
                                <Upload className="mb-2 h-6 w-6 transition-transform group-hover:scale-110" />
                                <span className="text-sm font-medium">
                                    Upload Photo
                                </span>
                                <input type="file" className="hidden" />
                            </label>
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Captain Requirements
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Set qualification criteria for captain matching
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Required License Type *
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                        <option value="">Select license type</option>
                                        {licenseTypes.map((licenseType) => (
                                            <option
                                                key={licenseType}
                                                value={licenseType}
                                            >
                                                {licenseType}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-semibold text-gray-900">
                                    Required Endorsements
                                </label>
                                <div className="space-y-3">
                                    {endorsements.map((endorsement) => (
                                        <label
                                            key={endorsement}
                                            className="group flex cursor-pointer items-center gap-3"
                                        >
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#0A273F] focus:ring-[#0A273F]"
                                            />
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                                {endorsement}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Rating *
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                            <option value="">Select rating</option>
                                            {ratings.map((rating) => (
                                                <option key={rating} value={rating}>
                                                    {rating}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Minimum Experience (years) *
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="5"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>
                            </div>

                            <label className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#0A273F] focus:ring-[#0A273F]"
                                />
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                                    Deckhand Required
                                </span>
                            </label>
                        </section>

                        <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                            >
                                <Plus className="h-4 w-4" />
                                Add Vessel
                            </button>

                            <Link
                                href={myYachts()}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

CreateYachtPage.layout = {
    breadcrumbs: [
        {
            title: 'My Yachts',
            href: myYachts(),
        },
        {
            title: 'Add New Yacht',
            href: createMyYacht(),
        },
    ],
    pageHeader: {
        title: 'Add New Yacht',
        description: 'List your vessel and set captain requirements.',
    },
};
