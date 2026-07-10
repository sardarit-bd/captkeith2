import { Download, FileText, CheckCircle2 } from 'lucide-react';

interface Agreement {
    id: string;
    name: string;
    downloadUrl: string;
}

interface PageProps {
    charterEventId: string;
    agreements: Agreement[];
    flash?: { success?: string; error?: string };
}

export default function ChartererInsurancePageContent({
    agreements,
}: PageProps) {
    return (
        <div className="mx-auto max-w-3xl space-y-6 p-6">
            <div className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm">
                <h2 className="mb-2 text-xl font-bold text-[#111827]">
                    Your Signed Agreements
                </h2>
                <p className="mb-6 text-sm text-[#6b7280]">
                    Below are the 3 agreements you have signed (1 with Owner, 2
                    with Captains). You can download them anytime.
                </p>

                <div className="space-y-4">
                    {agreements.length === 0 ? (
                        <p className="text-center text-sm text-gray-500">
                            No signed agreements found yet.
                        </p>
                    ) : (
                        agreements.map((agreement) => (
                            <div
                                key={agreement.id}
                                className="flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 transition-colors hover:bg-[#f3f4f6]"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#111827]">
                                            {agreement.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-emerald-600">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            Signed & Ready
                                        </div>
                                    </div>
                                </div>

                                {/* Download Button */}
                                <a
                                    href={agreement.downloadUrl}
                                    className="flex items-center gap-2 rounded-lg bg-[#35ADD5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#35ADD5]/70"
                                >
                                    <Download className="h-4 w-4" />
                                    Download
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
