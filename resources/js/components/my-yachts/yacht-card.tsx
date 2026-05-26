import { Link, router } from '@inertiajs/react';
import { AlertTriangle, Edit2, Ship, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import type { YachtRecord, YachtTab } from './my-yachts-data';
import {
    edit as editVessel,
    destroy as destroyVessel,
} from '@/routes/my-yachts';
import { show as showVessel } from '@/routes/vessels';

const tabLabels: Record<YachtTab, string> = {
    details: 'Vessel Details',
    captain: 'Captain Requirements',
    charters: 'Charters',
};

function SectionLabel({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="mb-1 text-[11px] font-medium tracking-wider text-[#9ca3af] uppercase">
                {label}
            </p>
            <p className="text-[14px] font-semibold text-[#111827]">{value}</p>
        </div>
    );
}

function DetailsPanel({ yacht }: { yacht: YachtRecord }) {
    return (
        <div>
            <h4 className="mb-5 text-[14px] font-bold text-[#0D314D]">
                Vessel Specifications
            </h4>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
                <SectionLabel label="Type" value={yacht.specs.type} />
                <SectionLabel label="Length" value={yacht.specs.length} />
                <SectionLabel label="Draft" value={yacht.specs.draft} />
                <SectionLabel
                    label="Mooring Location"
                    value={yacht.specs.mooringLocation}
                />
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
    const raw = yacht.captainRequirementsRaw;
    const params = new URLSearchParams();

    if (raw.license_type) {
        params.set('license_type', raw.license_type);
    }

    if (raw.min_experience) {
        params.set('min_experience', String(raw.min_experience));
    }

    const captainsUrl = `/captains?${params.toString()}`;

    return (
        <div className="flex flex-col">
            <h4 className="mb-1 text-[14px] font-bold text-[#0D314D]">
                Captain Qualification Requirements
            </h4>
            <p className="mb-5 text-[13px] text-[#9ca3af]">
                Criteria used for matching captains
            </p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                <div>
                    <p className="mb-2 text-[11px] font-medium tracking-wider text-[#9ca3af] uppercase">
                        License Type
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {yacht.captainRequirements.licenseTypes.map(
                            (license) => (
                                <span
                                    key={license}
                                    className="inline-flex items-center rounded-lg bg-[#EFF8FD] px-2.5 py-1 text-[12px] font-medium text-[#3DB3DE]"
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
                    <p className="mb-2 text-[11px] font-medium tracking-wider text-[#9ca3af] uppercase">
                        Endorsements
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {yacht.captainRequirements.endorsements.map(
                            (endorsement) => (
                                <span
                                    key={endorsement}
                                    className="inline-flex items-center rounded-lg bg-[#f3f4f6] px-2.5 py-1 text-[12px] font-medium text-[#374151]"
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
                href={captainsUrl}
                className="mt-6 inline-flex w-auto items-center gap-2 self-start rounded-xl bg-[#0D314D] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#123651] hover:shadow-md"
            >
                Find Matching Captains
            </Link>
        </div>
    );
}

function ChartersPanel({ yacht }: { yacht: YachtRecord }) {
    const createCharterUrl = `/charterers?vessel_id=${yacht.id}`;

    return (
        <div className="flex h-full min-h-48 w-full flex-col items-start">
            <h4 className="mb-1 text-[14px] font-bold text-[#0D314D]">
                Charter History
            </h4>
            <p className="mb-5 text-[13px] text-[#9ca3af]">
                Past and upcoming charters for this yacht
            </p>

            {yacht.charters.hasScheduledCharters ? (
                <div className="mb-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[13px] font-medium text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Charters available
                </div>
            ) : (
                <div className="mb-5 inline-flex items-center gap-2 rounded-xl bg-[#f9fafb] px-3 py-2 text-[13px] font-medium text-[#9ca3af]">
                    <span className="h-2 w-2 rounded-full bg-[#d1d5db]" />
                    No charters scheduled yet
                </div>
            )}

            <Link
                href={createCharterUrl}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D314D] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#123651] hover:shadow-md"
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#f1f5f9] px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </div>
                                <h3 className="text-[16px] font-bold text-[#111827]">
                                    Delete Vessel
                                </h3>
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#374151]"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="px-6 py-5">
                            <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                                <p className="text-[13px] leading-relaxed text-red-700">
                                    This action cannot be undone. This will
                                    permanently delete{' '}
                                    <strong>{yacht.name}</strong> and all its
                                    photos.
                                </p>
                            </div>
                            <p className="text-[13px] text-[#6b7280]">
                                Are you sure you want to continue?
                            </p>
                        </div>

                        <div className="flex gap-3 border-t border-[#f1f5f9] bg-[#fafbfc] px-6 py-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 cursor-pointer rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#374151] transition-colors hover:bg-[#f9fafb]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                                {deleting ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8z"
                                            />
                                        </svg>
                                        Deleting…
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        Delete Vessel
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <article className="overflow-hidden rounded-2xl border border-[#edf0f7] bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between border-b border-[#f1f5f9] bg-linear-to-r from-[#f8faff] to-white px-5 py-4 sm:px-6">
                    <div>
                        <Link
                            href={showVessel.url(yacht.id)}
                            className="text-[20px] font-bold text-[#0D314D] transition-colors hover:text-[#3DB3DE]"
                        >
                            {yacht.name}
                        </Link>
                        <p className="mt-0.5 text-[12px] text-[#9ca3af]">
                            {yacht.registrationNo}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={editVessel({ vessel: yacht.id }).url}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#374151] shadow-sm transition-all hover:border-[#3DB3DE] hover:text-[#3DB3DE]"
                        >
                            <Edit2 className="h-3.5 w-3.5" />
                            Edit
                        </Link>
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(true)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#e5e7eb] bg-white px-3.5 py-2 text-[13px] font-semibold text-[#374151] shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="relative h-64 w-full shrink-0 lg:h-auto lg:w-96 xl:w-105">
                        {yacht.image ? (
                            <img
                                src={yacht.image}
                                alt={`${yacht.name}`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full min-h-64 w-full items-center justify-center bg-linear-to-br from-[#f0f4f8] to-[#e8edf2]">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                                        <Ship className="h-8 w-8 text-[#c4c9d4]" />
                                    </div>
                                    <p className="text-[12px] text-[#b0b7c3]">
                                        No photo
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-1 flex-col bg-[#fafcff] p-5 lg:p-6">
                        <div className="mb-5 inline-flex w-full rounded-xl bg-[#edf0f7] p-1 sm:w-auto">
                            {(['details', 'captain', 'charters'] as const).map(
                                (tab) => {
                                    const isActive = activeTab === tab;

                                    return (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 cursor-pointer rounded-lg px-4 py-2 text-[13px] font-semibold transition-all sm:flex-none sm:px-5 ${
                                                isActive
                                                    ? 'bg-white text-[#0D314D] shadow-sm'
                                                    : 'text-[#6b7280] hover:text-[#374151]'
                                            }`}
                                        >
                                            {tabLabels[tab]}
                                        </button>
                                    );
                                },
                            )}
                        </div>
                        <div className="min-h-0 flex-1 overflow-y-auto">
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
