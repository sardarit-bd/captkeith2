import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';
import { charterYachtOptions } from './charterers-data';

export function CharterersFormCard() {
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

            <form className="space-y-6">
                <div>
                    <label
                        htmlFor="charter-yacht"
                        className="mb-2 block text-sm font-semibold text-[#0f172a]"
                    >
                        Select Yacht <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select
                            id="charter-yacht"
                            defaultValue=""
                            className="w-full cursor-pointer appearance-none rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 pr-10 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15"
                        >
                            <option value="" disabled>
                                Choose a yacht
                            </option>
                            {charterYachtOptions.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                        label={
                            <>
                                Date <span className="text-red-500">*</span>
                            </>
                        }
                        htmlFor="charter-date"
                    >
                        <input
                            id="charter-date"
                            type="date"
                            className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15"
                        />
                    </FormField>

                    <FormField
                        label={
                            <>
                                Time <span className="text-red-500">*</span>
                            </>
                        }
                        htmlFor="charter-time"
                    >
                        <input
                            id="charter-time"
                            type="time"
                            className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15"
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
                    >
                        <input
                            id="charter-duration"
                            type="number"
                            defaultValue={6}
                            min={1}
                            className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15"
                        />
                    </FormField>
                </div>

                <FormField label="Special Notes" htmlFor="charter-notes">
                    <textarea
                        id="charter-notes"
                        rows={4}
                        placeholder="Any special instructions or notes..."
                        className="w-full resize-y rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3.5 text-sm text-[#334155] transition outline-none focus:border-[#0A273F] focus:ring-2 focus:ring-[#0A273F]/15"
                    />
                </FormField>
            </form>
        </section>
    );
}

function FormField({
    label,
    htmlFor,
    children,
}: {
    label: ReactNode;
    htmlFor: string;
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
        </div>
    );
}
