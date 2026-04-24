import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { information } from '@/routes/charterer';
import { request } from '@/routes/charterer';
import { captainCandidates } from './charterer-captain-select-data';
import { ChartererCaptainSelectCard } from './charterer-captain-select-card';

export function ChartererCaptainSelectPageContent() {
    const [selectedCaptainId, setSelectedCaptainId] = useState(
        captainCandidates[0]?.id ?? '',
    );

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 flex min-h-[calc(100vh-200px)] w-full max-w-[1000px] flex-col">
                    <section className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                        {captainCandidates.map((captain) => (
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
