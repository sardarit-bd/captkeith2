import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Download, FileText } from 'lucide-react';
import { agreement } from '@/routes/charterer';
import { insuranceNote } from './charterer-insurance-data';
import { ChartererInsuranceMainCard } from './charterer-insurance-main-card';
// import { route } from '@/routes';
interface Agreement {
    id: string;
    name: string;
    downloadUrl?: string; 
}
interface PageProps {
    charterEventId?: string;
    agreements?: Agreement[];
}
export function ChartererInsurancePageContent() {

    const { agreements } = usePage<PageProps>().props;
    const response = usePage<PageProps>().props;
    console.log('response', response);
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            {agreements && agreements.length > 0 && (
            <div className="mb-6 rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-[#111827] flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#35ADD5]" />
                    Your Signed Agreements
                </h3>
                <div className="space-y-3">
                    {agreements.map((agreement) => (
                        <a
                            key={agreement.id}
                            href={`/charterer/agreement/${agreement.id}/download`}
                            className="flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-all hover:border-[#3DB3DE] hover:bg-[#EFF8FD]"
                            download
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#35ADD5]/10">
                                    <FileText className="h-5 w-5 text-[#35ADD5]" />
                                </div>
                                <span className="text-sm font-medium text-[#374151]">
                                    {agreement.name}
                                </span>
                            </div>
                            <button className="flex items-center gap-2 rounded-lg bg-[#35ADD5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#35ADD5]/70">
                                <Download className="h-3.5 w-3.5" />
                                Download PDF
                            </button>
                        </a>
                    ))}
                </div>
            </div>
        )}
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-212.5">
                    <ChartererInsuranceMainCard />

                    <section className="mb-8 rounded-xl border border-[#e5e7eb] bg-[#F8FAFC] p-5">
                        <p className="text-sm leading-relaxed text-[#4b5563]">
                            <span className="font-bold text-[#1f2937]">
                                Note:
                            </span>
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
