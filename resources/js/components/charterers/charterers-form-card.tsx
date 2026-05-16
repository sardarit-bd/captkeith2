import { useForm } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CharterYachtOption } from './charterers-data';

interface Props {
    vessels: CharterYachtOption[];
}

type FormData = {
    vessel_id: string;
    charter_date: string;
    start_time: string;
    duration_hours: string;
    special_notes: string;
};

function FormField({
    label,
    htmlFor,
    error,
    children,
}: {
    label: ReactNode;
    htmlFor: string;
    error?: string;
    children: ReactNode;
}) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="mb-2 block text-sm font-semibold text-[#0f172a]"
            >
                {label}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

export function CharterersFormCard({ vessels }: Props) {
    // Read vessel_id from URL query param (set by "Create Charter" button on yacht card)
    const preselectedVesselId =
        new URLSearchParams(window.location.search).get('vessel_id') ?? '';

    const { data, setData, post, processing, errors, reset } =
        useForm<FormData>({
            vessel_id: preselectedVesselId,
            charter_date: '',
            start_time: '',
            duration_hours: '6',
            special_notes: '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/charterers', {
            onSuccess: () => reset(),
        });
    };

    const inputCls =
        'w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15';
    const inputErrCls =
        'w-full rounded-lg border border-red-300 bg-red-50 px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/15';

    return (
        <section className="rounded-2xl border border-[#e8eef4] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <header className="mb-8">
                <h2 className="text-xl font-bold text-[#0f172a]">
                    Charter Details
                </h2>
                <p className="mt-1 text-sm text-[#64748b]">
                    Enter charter information
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                    label={
                        <>
                            Select Yacht <span className="text-red-500">*</span>
                        </>
                    }
                    htmlFor="charter-yacht"
                    error={errors.vessel_id}
                >
                    <div className="relative">
                        <select
                            id="charter-yacht"
                            value={data.vessel_id}
                            onChange={(e) =>
                                setData('vessel_id', e.target.value)
                            }
                            className={`cursor-pointer appearance-none pr-10 ${errors.vessel_id ? inputErrCls : inputCls}`}
                        >
                            <option value="" disabled>
                                Choose a yacht
                            </option>
                            {vessels.length === 0 && (
                                <option value="" disabled>
                                    No vessels found — add one first
                                </option>
                            )}
                            {vessels.map((v) => (
                                <option key={v.value} value={v.value}>
                                    {v.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                    </div>
                </FormField>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                        label={
                            <>
                                Date <span className="text-red-500">*</span>
                            </>
                        }
                        htmlFor="charter-date"
                        error={errors.charter_date}
                    >
                        <input
                            id="charter-date"
                            type="date"
                            value={data.charter_date}
                            onChange={(e) =>
                                setData('charter_date', e.target.value)
                            }
                            className={
                                errors.charter_date ? inputErrCls : inputCls
                            }
                        />
                    </FormField>

                    <FormField
                        label={
                            <>
                                Time <span className="text-red-500">*</span>
                            </>
                        }
                        htmlFor="charter-time"
                        error={errors.start_time}
                    >
                        <input
                            id="charter-time"
                            type="time"
                            value={data.start_time}
                            onChange={(e) =>
                                setData('start_time', e.target.value)
                            }
                            className={
                                errors.start_time ? inputErrCls : inputCls
                            }
                        />
                    </FormField>

                    <FormField
                        label={
                            <>
                                Duration (hours){' '}
                                <span className="text-red-500">*</span>
                            </>
                        }
                        htmlFor="charter-duration"
                        error={errors.duration_hours}
                    >
                        <input
                            id="charter-duration"
                            type="number"
                            min={1}
                            value={data.duration_hours}
                            onChange={(e) =>
                                setData('duration_hours', e.target.value)
                            }
                            className={
                                errors.duration_hours ? inputErrCls : inputCls
                            }
                        />
                    </FormField>
                </div>

                <FormField
                    label="Special Notes"
                    htmlFor="charter-notes"
                    error={errors.special_notes}
                >
                    <textarea
                        id="charter-notes"
                        rows={4}
                        placeholder="Any special instructions or notes..."
                        value={data.special_notes}
                        onChange={(e) =>
                            setData('special_notes', e.target.value)
                        }
                        className={`resize-y ${errors.special_notes ? inputErrCls : inputCls}`}
                    />
                </FormField>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A273F] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {processing ? 'Saving…' : 'Save Charter'}
                </button>
            </form>
        </section>
    );
}
