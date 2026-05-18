import { Link } from '@inertiajs/react';
import { User } from 'lucide-react';
import { useState } from 'react';
import type { Captain } from '@/pages/charterer/captain-select';
import { information, request } from '@/routes/charterer';
import { ChartererCaptainSelectCard } from './charterer-captain-select-card';

interface Props {
    captains: Captain[];
}

export function ChartererCaptainSelectPageContent({ captains }: Props) {
    const [selectedCaptainId, setSelectedCaptainId] = useState(
        captains[0]?.id ?? '',
    );

    if (captains.length === 0) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] px-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                        No qualified captains available
                    </p>
                    <p className="text-xs text-gray-400">
                        Please contact the vessel owner for assistance.
                    </p>
                    <Link
                        href={request()}
                        className="mt-2 rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                    >
                        Back to Request
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 flex min-h-[calc(100vh-200px)] w-full max-w-250 flex-col">
                    <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                        {captains.map((captain) => (
                            <ChartererCaptainSelectCard
                                key={captain.id}
                                captain={captain}
                                selected={selectedCaptainId === captain.id}
                                onSelect={() =>
                                    setSelectedCaptainId(captain.id)
                                }
                            />
                        ))}
                    </section>

                    <footer className="mt-8 flex items-center justify-between gap-4 border-t border-[#e5e7eb] pt-6 pb-4">
                        <Link
                            href={request()}
                            className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-medium text-[#1f2937] shadow-sm transition-colors hover:bg-[#f9fafb]"
                        >
                            Back
                        </Link>

                        <Link
                            href={information()}
                            className="rounded-lg bg-[#0A273F] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                        >
                            Continue with Selected Captain
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
