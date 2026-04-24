import { Link } from '@inertiajs/react';
import { agreement } from '@/routes/charterer';
import { insuranceNote } from './charterer-insurance-data';
import { ChartererInsuranceMainCard } from './charterer-insurance-main-card';

export function ChartererInsurancePageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-[850px]">
                    <ChartererInsuranceMainCard />

                    <section className="mb-8 rounded-xl border border-[#e5e7eb] bg-[#F8FAFC] p-5">
                        <p className="text-sm leading-relaxed text-[#4b5563]">
                            <span className="font-bold text-[#1f2937]">
                                Note:
                            </span>{' '}
                            {insuranceNote}
                        </p>
                    </section>

                    <footer>
                        <Link
                            href={agreement()}
                            className="inline-flex w-full items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-8 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f9fafb] sm:w-auto"
                        >
                            Back
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}
