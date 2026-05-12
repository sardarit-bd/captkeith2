import { Head, Link } from '@inertiajs/react';
import { ChevronDown, FileText, Plus, Trash2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
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

const MIN_IMAGES = 6;

interface PreviewImage {
    id: string;
    url: string;
    file: File;
}

interface AttachedDocument {
    id: string;
    file: File;
}

export default function CreateYachtPage() {
    const [images, setImages] = useState<PreviewImage[]>([]);
    const [documents, setDocuments] = useState<AttachedDocument[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const newImages: PreviewImage[] = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));
        setImages((prev) => [...prev, ...newImages]);
        // Reset input so same file can be re-selected
        if (imageInputRef.current) imageInputRef.current.value = '';
    };

    const removeImage = (id: string) => {
        setImages((prev) => {
            const removed = prev.find((img) => img.id === id);
            if (removed) URL.revokeObjectURL(removed.url);
            return prev.filter((img) => img.id !== id);
        });
    };

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const newDocs: AttachedDocument[] = files.map((file) => ({
            id: crypto.randomUUID(),
            file,
        }));
        setDocuments((prev) => [...prev, ...newDocs]);
        if (documentInputRef.current) documentInputRef.current.value = '';
    };

    const removeDocument = (id: string) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    };

    const missingSlots = Math.max(0, MIN_IMAGES - images.length);

    return (
        <>
            <Head title="Add New Yacht" />

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <form className="space-y-10">

                        {/* ── Basic Information ── */}
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                                <p className="mt-1 text-sm text-gray-500">Enter your vessel details</p>
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
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Type *</label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                            <option value="">Select type</option>
                                            {yachtTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Length (ft) *</label>
                                    <input
                                        type="number"
                                        placeholder="65"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Draft (ft) *</label>
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
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Mooring Location *</label>
                                    <input
                                        type="text"
                                        placeholder="Miami Beach Marina"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Operating Area *</label>
                                    <input
                                        type="text"
                                        placeholder="South Florida Waters"
                                        className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]"
                                    />
                                </div>
                            </div>

                            {/* ── Vessel Documents ── */}
                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Vessel Documents
                                </label>
                                <p className="mb-3 text-xs text-gray-500">
                                    Attach registration papers, insurance, or any relevant vessel documents (PDF, DOC, DOCX)
                                </p>

                                {/* Attached documents list */}
                                {documents.length > 0 && (
                                    <div className="mb-3 space-y-2">
                                        {documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5"
                                            >
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0A273F]/10">
                                                        <FileText className="h-4 w-4 text-[#0A273F]" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium text-gray-800">
                                                            {doc.file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {(doc.file.size / 1024).toFixed(1)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeDocument(doc.id)}
                                                    className="ml-3 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => documentInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-[#0A273F] hover:bg-white hover:text-[#0A273F]"
                                >
                                    <Plus className="h-4 w-4" />
                                    Attach Document
                                </button>
                                <input
                                    ref={documentInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    className="hidden"
                                    onChange={handleDocumentChange}
                                />
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* ── Photos ── */}
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Add at least {MIN_IMAGES} photos of your yacht
                                </p>
                            </div>

                            {/* Status badge */}
                            <div className="mb-4 flex items-center gap-2">
                                <span
                                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                        images.length >= MIN_IMAGES
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-amber-50 text-amber-700'
                                    }`}
                                >
                                    {images.length} / {MIN_IMAGES} minimum photos
                                    {images.length < MIN_IMAGES && (
                                        <span className="ml-1">
                                            — {missingSlots} more required
                                        </span>
                                    )}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {/* Uploaded image previews */}
                                {images.map((img, index) => (
                                    <div
                                        key={img.id}
                                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Yacht photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                                            <button
                                                type="button"
                                                onClick={() => removeImage(img.id)}
                                                className="scale-75 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-all group-hover:scale-100 group-hover:opacity-100 hover:bg-red-50"
                                            >
                                                <X className="h-3.5 w-3.5 text-gray-700 hover:text-red-500" />
                                            </button>
                                        </div>
                                        {/* Index badge */}
                                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                ))}

                                {/* Empty required slots */}
                                {Array.from({ length: missingSlots }).map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="aspect-square rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex items-center justify-center"
                                    >
                                        <span className="text-[10px] font-medium text-gray-300">
                                            Required
                                        </span>
                                    </div>
                                ))}

                                {/* Add more button — always visible */}
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()}
                                    className="group aspect-square flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white text-gray-400 transition-all hover:border-[#0A273F] hover:bg-gray-50 hover:text-[#0A273F]"
                                >
                                    <Upload className="mb-1.5 h-5 w-5 transition-transform group-hover:scale-110" />
                                    <span className="text-[11px] font-medium leading-tight text-center px-1">
                                        {images.length === 0 ? 'Upload Photos' : 'Add More'}
                                    </span>
                                </button>
                            </div>

                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </section>

                        <hr className="border-gray-100" />

                        {/* ── Captain Requirements ── */}
                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">Captain Requirements</h3>
                                <p className="mt-1 text-sm text-gray-500">Set qualification criteria for captain matching</p>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">Required License Type *</label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                        <option value="">Select license type</option>
                                        {licenseTypes.map((licenseType) => (
                                            <option key={licenseType} value={licenseType}>{licenseType}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-semibold text-gray-900">Required Endorsements</label>
                                <div className="space-y-3">
                                    {endorsements.map((endorsement) => (
                                        <label key={endorsement} className="group flex cursor-pointer items-center gap-3">
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
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">Rating *</label>
                                    <div className="relative">
                                        <select className="w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]">
                                            <option value="">Select rating</option>
                                            {ratings.map((rating) => (
                                                <option key={rating} value={rating}>{rating}</option>
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

                        {/* ── Actions ── */}
                        <div className="flex flex-col gap-4 pt-6 sm:flex-row">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={images.length < MIN_IMAGES}
                                title={images.length < MIN_IMAGES ? `Please upload at least ${MIN_IMAGES} photos` : ''}
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

                        {/* Minimum photo warning near submit */}
                        {images.length < MIN_IMAGES && (
                            <p className="text-xs text-amber-600">
                                ⚠ Please upload at least {MIN_IMAGES} photos before submitting.
                            </p>
                        )}
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