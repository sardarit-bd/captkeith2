import { Link, router } from '@inertiajs/react';
import { Edit2, Trash2, Ship, X } from 'lucide-react';
import { useState } from 'react';
import { captains, charterers } from '@/routes';
import {
    edit as editVessel,
    destroy as destroyVessel,
} from '@/routes/my-yachts';
import type { YachtRecord, YachtTab } from './my-yachts-data';

const tabLabels: Record<YachtTab, string> = {
    details: 'Vessel Details',
    captain: 'Captain Requirements',
    charters: 'Charters',
};

function SectionLabel({ label, value }: { label: string; value: string }) {
    return (
        <div className="">
            <p className="mb-1 text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
    );
}

function DetailsPanel({ yacht }: { yacht: YachtRecord }) {
    return (
        <div className="h-full">
            <h4 className="mb-4 text-base font-semibold text-[#0A0A0A]">
                Vessel Specifications
            </h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
                <SectionLabel label="Type" value={yacht.specs.type} />
                <SectionLabel label="Length" value={yacht.specs.length} />
                <div />
                <SectionLabel label="Draft" value={yacht.specs.draft} />
                <SectionLabel
                    label="Mooring Location"
                    value={yacht.specs.mooringLocation}
                />
                <div />
                <SectionLabel
                    label="Operating Area"
                    value={yacht.specs.operatingArea}
                />
                <SectionLabel
                    label="Deckhand Required"
                    value={yacht.specs.deckhandRequired}
                />
            </div>
        </div>
    );
}

function CaptainRequirementsPanel({ yacht }: { yacht: YachtRecord }) {
    return (
        <div className="flex flex-col">
            <h4 className="mb-1 text-base font-semibold text-[#0A0A0A]">
                Captain Qualification Requirements
            </h4>
            <p className="mb-5 text-sm text-gray-500">
                Criteria used for matching captains
            </p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                <div>
                    <p className="mb-2 text-xs text-gray-500">License Type</p>
                    <div className="flex flex-wrap gap-2">
                        {yacht.captainRequirements.licenseTypes.map(
                            (license) => (
                                <span
                                    key={license}
                                    className="inline-flex items-center rounded-md bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700"
                                >
                                    {license}
                                </span>
                            ),
                        )}
                    </div>
                </div>

                <SectionLabel
                    label="Rating"
                    value={yacht.captainRequirements.rating}
                />

                <div>
                    <p className="mb-2 text-xs text-gray-500">Endorsements</p>
                    <div className="flex flex-wrap gap-2">
                        {yacht.captainRequirements.endorsements.map(
                            (endorsement) => (
                                <span
                                    key={endorsement}
                                    className="inline-flex items-center rounded-md bg-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700"
                                >
                                    {endorsement}
                                </span>
                            ),
                        )}
                    </div>
                </div>

                <SectionLabel
                    label="Minimum Experience"
                    value={yacht.captainRequirements.minimumExperience}
                />
            </div>

            <Link
                href={captains()}
                className="mt-5 inline-flex w-auto self-start rounded-sm bg-[#0A273F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
            >
                Find Matching Captains
            </Link>
        </div>
    );
}

function ChartersPanel({ yacht }: { yacht: YachtRecord }) {
    return (
        <div className="flex h-full min-h-55 w-full flex-col items-start">
            <h4 className="mb-1 text-base font-semibold text-[#0A0A0A]">
                Charter History
            </h4>
            <p className="mb-6 text-sm text-gray-500">
                Past and upcoming charters for this yacht
            </p>

            <p className="mb-6 text-sm text-gray-500">
                {yacht.charters.hasScheduledCharters
                    ? 'Charters available'
                    : 'No charters scheduled yet'}
            </p>

            <Link
                href={charterers()}
                type="button"
                className="rounded-sm bg-[#0A273F] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
            >
                Create Charter
            </Link>
        </div>
    );
}

function YachtCardBody({
    yacht,
    activeTab,
}: {
    yacht: YachtRecord;
    activeTab: YachtTab;
}) {
    if (activeTab === 'captain') {
        return <CaptainRequirementsPanel yacht={yacht} />;
    }

    if (activeTab === 'charters') {
        return <ChartersPanel yacht={yacht} />;
    }

    return <DetailsPanel yacht={yacht} />;
}

export function YachtCard({ yacht }: { yacht: YachtRecord }) {
    const [activeTab, setActiveTab] = useState<YachtTab>(yacht.defaultTab);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = () => {
        setDeleting(true);
        router.delete(destroyVessel({ vessel: yacht.id }).url, {
            onFinish: () => {
                setDeleting(false);
                setShowDeleteModal(false);
            },
        });
    };

    return (
        <>
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Delete Vessel
                            </h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="cursor-pointer rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <p className="mb-6 text-sm text-gray-500">
                            Are you sure you want to delete{' '}
                            <strong>{yacht.name}</strong>? This action cannot be
                            undone and will permanently remove the vessel and
                            all its photos.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 cursor-pointer rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleting ? 'Deleting…' : 'Delete Vessel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <article className="rounded-2xl bg-white p-4">
                <div className="mb-3 flex items-end justify-between px-1">
                    <div>
                        <h3 className="text-2xl leading-tight font-bold text-gray-900">
                            {yacht.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500">
                            {yacht.registrationNo}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={editVessel({ vessel: yacht.id }).url}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm lg:h-107.5 lg:flex-row">
                    <div className="relative h-64 w-full shrink-0 lg:h-full lg:w-112.5">
                        {yacht.image ? (
                            <img
                                src={yacht.image}
                                alt={`${yacht.name} Yacht`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                <Ship className="h-16 w-16 text-gray-300" />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col bg-[#F9FCFF] p-5 lg:p-6">
                        <div className="mb-5 grid w-full grid-cols-1 gap-1 rounded-2xl bg-[#ECECF0] p-1 sm:inline-flex sm:w-fit sm:grid-cols-none sm:gap-0 sm:rounded-full">
                            {(['details', 'captain', 'charters'] as const).map(
                                (tab) => {
                                    const isActive = activeTab === tab;

                                    return (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`w-full cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all sm:w-auto sm:rounded-full sm:px-5 sm:py-1.5 ${
                                                isActive
                                                    ? 'bg-white text-gray-900 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            {tabLabels[tab]}
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                            <YachtCardBody
                                yacht={yacht}
                                activeTab={activeTab}
                            />
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
