import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { ChevronDown, FileText, Plus, Trash2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { myYachts } from '@/routes';
import {
    create as myYachtsCreate,
    store as myYachtsStore,
    update as myYachtsUpdate,
} from '@/routes/my-yachts';

const VESSEL_TYPES = [
    { value: 'power', label: 'Power' },
    { value: 'sailing', label: 'Sailing' },
] as const;

const LICENSE_TYPES = [
    { value: 'oupv', label: 'OUPV (6-Pack)' },
    { value: 'masters', label: 'Masters' },
] as const;

const ENDORSEMENTS = [
    { value: 'inland', label: 'Inland' },
    { value: 'near_coastal', label: 'Near Coastal' },
    { value: 'unlimited', label: 'Unlimited' },
] as const;

const MIN_PHOTOS = 6;

interface ExistingPhoto {
    id: string;
    url: string;
}

interface PreviewPhoto {
    id: string;
    url: string;
    file: File;
}

interface PreviewDocument {
    id: string;
    file: File;
}

interface VesselData {
    id: string;
    name: string;
    official_number: string;
    make: string;
    model: string;
    vessel_type: string;
    length_ft: string;
    beam_ft: string;
    draft_ft: string;
    marina_name: string;
    marina_address: string;
    marina_city: string;
    marina_state: string;
    marina_zip: string;
    operating_area: string;
    required_license_type: string;
    required_endorsement: string;
    required_tonnage_rating: string;
    required_years_experience: string;
    requires_deckhand: boolean;
    existing_photos: ExistingPhoto[];
}

type VesselFormData = {
    name: string;
    official_number: string;
    make: string;
    model: string;
    vessel_type: string;
    length_ft: string;
    beam_ft: string;
    draft_ft: string;
    marina_name: string;
    marina_address: string;
    marina_city: string;
    marina_state: string;
    marina_zip: string;
    operating_area: string;
    required_license_type: string;
    required_endorsement: string;
    required_tonnage_rating: string;
    required_years_experience: string;
    requires_deckhand: boolean;
    photos: File[];
    documents: File[];
};

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

const inputCls =
    'w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]';
const inputErrCls =
    'w-full rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm placeholder-gray-400 transition-colors focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';
const selectCls =
    'w-full appearance-none rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 transition-colors focus:border-[#0A273F] focus:outline-none focus:ring-1 focus:ring-[#0A273F]';
const selectErrCls =
    'w-full appearance-none rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-gray-700 transition-colors focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

export default function CreateYachtPage() {
    const { vessel } = usePage<{ vessel?: VesselData }>().props;
    const isEditing = !!vessel;

    const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>(
        vessel?.existing_photos ?? [],
    );

    const [newPhotos, setNewPhotos] = useState<PreviewPhoto[]>([]);
    const [documents, setDocuments] = useState<PreviewDocument[]>([]);

    const photoInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, transform } =
        useForm<VesselFormData>({
            name: vessel?.name ?? '',
            official_number: vessel?.official_number ?? '',
            make: vessel?.make ?? '',
            model: vessel?.model ?? '',
            vessel_type: vessel?.vessel_type ?? '',
            length_ft: vessel?.length_ft ?? '',
            beam_ft: vessel?.beam_ft ?? '',
            draft_ft: vessel?.draft_ft ?? '',
            marina_name: vessel?.marina_name ?? '',
            marina_address: vessel?.marina_address ?? '',
            marina_city: vessel?.marina_city ?? '',
            marina_state: vessel?.marina_state ?? '',
            marina_zip: vessel?.marina_zip ?? '',
            operating_area: vessel?.operating_area ?? '',
            required_license_type: vessel?.required_license_type ?? '',
            required_endorsement: vessel?.required_endorsement ?? '',
            required_tonnage_rating: vessel?.required_tonnage_rating ?? '',
            required_years_experience: vessel?.required_years_experience ?? '',
            requires_deckhand: vessel?.requires_deckhand ?? false,
            photos: [],
            documents: [],
        });

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const previews: PreviewPhoto[] = files.map((file) => ({
            id: crypto.randomUUID(),
            url: URL.createObjectURL(file),
            file,
        }));
        setNewPhotos((prev) => [...prev, ...previews]);

        if (photoInputRef.current) {
            photoInputRef.current.value = '';
        }
    };

    const removeNewPhoto = (id: string) => {
        setNewPhotos((prev) => {
            const removed = prev.find((p) => p.id === id);

            if (removed) {
                URL.revokeObjectURL(removed.url);
            }

            return prev.filter((p) => p.id !== id);
        });
    };

    const removeExistingPhoto = (id: string) => {
        setExistingPhotos((prev) => prev.filter((p) => p.id !== id));
    };

    const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const newDocs: PreviewDocument[] = files.map((file) => ({
            id: crypto.randomUUID(),
            file,
        }));
        setDocuments((prev) => [...prev, ...newDocs]);

        if (documentInputRef.current) {
            documentInputRef.current.value = '';
        }
    };

    const removeDocument = (id: string) => {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
    };

    const totalPhotoCount = existingPhotos.length + newPhotos.length;
    const missingSlots = Math.max(0, MIN_PHOTOS - totalPhotoCount);

    const canSubmit =
        (isEditing || totalPhotoCount >= MIN_PHOTOS) && !processing;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('name', data.name);
            formData.append('official_number', data.official_number);
            formData.append('make', data.make);
            formData.append('model', data.model);
            formData.append('vessel_type', data.vessel_type);
            formData.append('length_ft', data.length_ft);
            formData.append('beam_ft', data.beam_ft);
            formData.append('draft_ft', data.draft_ft);
            formData.append('marina_name', data.marina_name);
            formData.append('marina_address', data.marina_address);
            formData.append('marina_city', data.marina_city);
            formData.append('marina_state', data.marina_state);
            formData.append('marina_zip', data.marina_zip);
            formData.append('operating_area', data.operating_area);
            formData.append(
                'required_license_type',
                data.required_license_type,
            );
            formData.append('required_endorsement', data.required_endorsement);
            formData.append(
                'required_tonnage_rating',
                data.required_tonnage_rating,
            );
            formData.append(
                'required_years_experience',
                data.required_years_experience,
            );
            formData.append(
                'requires_deckhand',
                data.requires_deckhand ? '1' : '0',
            );
            newPhotos.forEach((p) => formData.append('photos[]', p.file));
            documents.forEach((d) => formData.append('documents[]', d.file));

            router.post(`/my-yachts/${vessel.id}?_method=PUT`, formData, {
                onSuccess: () => {
                    setNewPhotos([]);
                    setDocuments([]);
                },
            });
        } else {
            transform((formData) => ({
                ...formData,
                photos: newPhotos.map((p) => p.file),
                documents: documents.map((d) => d.file),
            }));

            post(myYachtsStore.url(), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setNewPhotos([]);
                    setDocuments([]);
                },
            });
        }
    };

    return (
        <>
            <Head title={isEditing ? 'Edit Yacht' : 'Add New Yacht'} />

            <div className="flex h-full flex-1 flex-col overflow-x-auto bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <form onSubmit={handleSubmit} className="space-y-10">
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
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Vessel Name{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Sea Dream"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        className={
                                            errors.name ? inputErrCls : inputCls
                                        }
                                    />
                                    <FieldError message={errors.name} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Official Number{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="US-1234567"
                                        value={data.official_number}
                                        onChange={(e) =>
                                            setData(
                                                'official_number',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.official_number
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError
                                        message={errors.official_number}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Make
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Hatteras"
                                        value={data.make}
                                        onChange={(e) =>
                                            setData('make', e.target.value)
                                        }
                                        className={
                                            errors.make ? inputErrCls : inputCls
                                        }
                                    />
                                    <FieldError message={errors.make} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Model{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="GT65"
                                        value={data.model}
                                        onChange={(e) =>
                                            setData('model', e.target.value)
                                        }
                                        className={
                                            errors.model
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.model} />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Type{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={data.vessel_type}
                                            onChange={(e) =>
                                                setData(
                                                    'vessel_type',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                errors.vessel_type
                                                    ? selectErrCls
                                                    : selectCls
                                            }
                                        >
                                            <option value="">
                                                Select type
                                            </option>
                                            {VESSEL_TYPES.map((t) => (
                                                <option
                                                    key={t.value}
                                                    value={t.value}
                                                >
                                                    {t.label}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <FieldError message={errors.vessel_type} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Length (ft){' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="65"
                                        min="1"
                                        value={data.length_ft}
                                        onChange={(e) =>
                                            setData('length_ft', e.target.value)
                                        }
                                        className={
                                            errors.length_ft
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.length_ft} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Beam (ft){' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="18"
                                        min="1"
                                        value={data.beam_ft}
                                        onChange={(e) =>
                                            setData('beam_ft', e.target.value)
                                        }
                                        className={
                                            errors.beam_ft
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.beam_ft} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Draft (ft){' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="5.5"
                                        min="0.1"
                                        value={data.draft_ft}
                                        onChange={(e) =>
                                            setData('draft_ft', e.target.value)
                                        }
                                        className={
                                            errors.draft_ft
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.draft_ft} />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Marina Name{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Miami Beach Marina"
                                        value={data.marina_name}
                                        onChange={(e) =>
                                            setData(
                                                'marina_name',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.marina_name
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.marina_name} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Marina Address{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="300 Alton Rd"
                                        value={data.marina_address}
                                        onChange={(e) =>
                                            setData(
                                                'marina_address',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.marina_address
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError
                                        message={errors.marina_address}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        City{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Miami Beach"
                                        value={data.marina_city}
                                        onChange={(e) =>
                                            setData(
                                                'marina_city',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.marina_city
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.marina_city} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        State{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="FL"
                                        maxLength={50}
                                        value={data.marina_state}
                                        onChange={(e) =>
                                            setData(
                                                'marina_state',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.marina_state
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.marina_state} />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        ZIP Code{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="33139"
                                        maxLength={10}
                                        value={data.marina_zip}
                                        onChange={(e) =>
                                            setData(
                                                'marina_zip',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.marina_zip
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError message={errors.marina_zip} />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Operating Area{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="South Florida Waters"
                                    value={data.operating_area}
                                    onChange={(e) =>
                                        setData(
                                            'operating_area',
                                            e.target.value,
                                        )
                                    }
                                    className={
                                        errors.operating_area
                                            ? inputErrCls
                                            : inputCls
                                    }
                                />
                                <FieldError message={errors.operating_area} />
                            </div>

                            <div className="mt-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Vessel Documents
                                </label>
                                <p className="mb-3 text-xs text-gray-500">
                                    Attach registration papers, insurance, or
                                    any relevant vessel documents (PDF, DOC,
                                    DOCX — max 20 MB each)
                                </p>

                                {documents.length > 0 && (
                                    <div className="mb-3 space-y-2">
                                        {documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0A273F]/10">
                                                        <FileText className="h-4 w-4 text-[#0A273F]" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium text-gray-800">
                                                            {doc.file.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {(
                                                                doc.file.size /
                                                                1024
                                                            ).toFixed(1)}{' '}
                                                            KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeDocument(doc.id)
                                                    }
                                                    className="ml-3 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {Object.entries(errors)
                                    .filter(([key]) =>
                                        key.startsWith('documents'),
                                    )
                                    .map(([key, msg]) => (
                                        <FieldError key={key} message={msg} />
                                    ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        documentInputRef.current?.click()
                                    }
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

                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Photos
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {isEditing
                                        ? 'Manage existing photos or upload new ones'
                                        : `Add at least ${MIN_PHOTOS} photos of your yacht (JPG, PNG, WEBP — max 10 MB each)`}
                                </p>
                            </div>

                            {!isEditing && (
                                <div className="mb-4 flex items-center gap-2">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                            totalPhotoCount >= MIN_PHOTOS
                                                ? 'bg-emerald-50 text-emerald-700'
                                                : 'bg-amber-50 text-amber-700'
                                        }`}
                                    >
                                        {totalPhotoCount} / {MIN_PHOTOS} minimum
                                        photos
                                        {totalPhotoCount < MIN_PHOTOS && (
                                            <span className="ml-1">
                                                — {missingSlots} more required
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}

                            {(errors.photos ||
                                Object.keys(errors).some((k) =>
                                    k.startsWith('photos.'),
                                )) && (
                                <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                    {errors.photos && (
                                        <p className="text-xs text-red-600">
                                            {errors.photos}
                                        </p>
                                    )}
                                    {Object.entries(errors)
                                        .filter(([key]) =>
                                            key.startsWith('photos.'),
                                        )
                                        .map(([key, msg]) => (
                                            <p
                                                key={key}
                                                className="text-xs text-red-600"
                                            >
                                                {msg}
                                            </p>
                                        ))}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {existingPhotos.map((photo, index) => (
                                    <div
                                        key={`existing-${photo.id}`}
                                        className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`Yacht photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingPhoto(
                                                        photo.id,
                                                    )
                                                }
                                                className="scale-75 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-all group-hover:scale-100 group-hover:opacity-100 hover:bg-red-50"
                                            >
                                                <X className="h-3.5 w-3.5 text-gray-700 hover:text-red-500" />
                                            </button>
                                        </div>
                                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                            {index + 1}
                                        </span>
                                    </div>
                                ))}

                                {newPhotos.map((photo, index) => (
                                    <div
                                        key={photo.id}
                                        className="group relative aspect-square overflow-hidden rounded-xl border border-blue-100 bg-gray-50"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`New photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeNewPhoto(photo.id)
                                                }
                                                className="scale-75 rounded-full bg-white/90 p-1.5 opacity-0 shadow transition-all group-hover:scale-100 group-hover:opacity-100 hover:bg-red-50"
                                            >
                                                <X className="h-3.5 w-3.5 text-gray-700 hover:text-red-500" />
                                            </button>
                                        </div>
                                        <span className="absolute bottom-1.5 left-1.5 rounded-md bg-blue-500/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
                                            New
                                        </span>
                                    </div>
                                ))}

                                {!isEditing &&
                                    Array.from({ length: missingSlots }).map(
                                        (_, i) => (
                                            <div
                                                key={`empty-${i}`}
                                                className="flex aspect-square items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50"
                                            >
                                                <span className="text-[10px] font-medium text-gray-300">
                                                    Required
                                                </span>
                                            </div>
                                        ),
                                    )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        photoInputRef.current?.click()
                                    }
                                    className="group flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white text-gray-400 transition-all hover:border-[#0A273F] hover:bg-gray-50 hover:text-[#0A273F]"
                                >
                                    <Upload className="mb-1.5 h-5 w-5 transition-transform group-hover:scale-110" />
                                    <span className="px-1 text-center text-[11px] leading-tight font-medium">
                                        {totalPhotoCount === 0
                                            ? 'Upload Photos'
                                            : 'Add More'}
                                    </span>
                                </button>
                            </div>

                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </section>

                        <hr className="border-gray-100" />

                        <section>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Captain Requirements
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Set qualification criteria for captain
                                    matching
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Required License Type{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={data.required_license_type}
                                        onChange={(e) =>
                                            setData(
                                                'required_license_type',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.required_license_type
                                                ? selectErrCls
                                                : selectCls
                                        }
                                    >
                                        <option value="">
                                            Select license type
                                        </option>
                                        {LICENSE_TYPES.map((lt) => (
                                            <option
                                                key={lt.value}
                                                value={lt.value}
                                            >
                                                {lt.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                                <FieldError
                                    message={errors.required_license_type}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm font-semibold text-gray-900">
                                    Required Endorsement{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={data.required_endorsement}
                                        onChange={(e) =>
                                            setData(
                                                'required_endorsement',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.required_endorsement
                                                ? selectErrCls
                                                : selectCls
                                        }
                                    >
                                        <option value="">
                                            Select endorsement
                                        </option>
                                        {ENDORSEMENTS.map((e) => (
                                            <option
                                                key={e.value}
                                                value={e.value}
                                            >
                                                {e.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                </div>
                                <FieldError
                                    message={errors.required_endorsement}
                                />
                            </div>

                            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Required Tonnage Rating{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        min="0"
                                        value={data.required_tonnage_rating}
                                        onChange={(e) =>
                                            setData(
                                                'required_tonnage_rating',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.required_tonnage_rating
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError
                                        message={errors.required_tonnage_rating}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                                        Minimum Experience (years){' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="5"
                                        min="0"
                                        value={data.required_years_experience}
                                        onChange={(e) =>
                                            setData(
                                                'required_years_experience',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.required_years_experience
                                                ? inputErrCls
                                                : inputCls
                                        }
                                    />
                                    <FieldError
                                        message={
                                            errors.required_years_experience
                                        }
                                    />
                                </div>
                            </div>

                            <label className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={data.requires_deckhand}
                                    onChange={(e) =>
                                        setData(
                                            'requires_deckhand',
                                            e.target.checked,
                                        )
                                    }
                                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#0A273F] focus:ring-[#0A273F]"
                                />
                                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                                    Deckhand Required
                                </span>
                            </label>
                        </section>

                        <div className="flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                title={
                                    !isEditing && totalPhotoCount < MIN_PHOTOS
                                        ? `Please upload at least ${MIN_PHOTOS} photos`
                                        : undefined
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
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
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            />
                                        </svg>
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        {isEditing
                                            ? 'Save Changes'
                                            : 'Add Vessel'}
                                    </>
                                )}
                            </button>

                            <Link
                                href={myYachts.url()}
                                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                        </div>

                        {!isEditing && totalPhotoCount < MIN_PHOTOS && (
                            <p className="text-xs text-amber-600">
                                ⚠ Please upload at least {MIN_PHOTOS} photos
                                before submitting.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

CreateYachtPage.layout = (
    page: React.ReactNode & { props?: { vessel?: VesselData } },
) => {
    const vessel = (page as any)?.props?.vessel;
    const isEditing = !!vessel;

    return {
        breadcrumbs: isEditing
            ? [
                  { title: 'My Yachts', href: myYachts.url() },
                  { title: 'Edit Yacht' },
              ]
            : [
                  { title: 'My Yachts', href: myYachts.url() },
                  { title: 'Add New Yacht' },
              ],
        pageHeader: {
            title: isEditing ? 'Edit Yacht' : 'Add New Yacht',
            description: isEditing
                ? 'Update your vessel details and captain requirements.'
                : 'List your vessel and set captain requirements.',
        },
    };
};
