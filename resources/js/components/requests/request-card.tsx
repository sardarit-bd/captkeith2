import { Check, MessageSquare, X } from 'lucide-react';
import type { CaptainRequestRecord } from './requests-data';

const statusStyles: Record<CaptainRequestRecord['status'], string> = {
    pending: 'bg-[#111827] text-white',
    accepted: 'bg-[#14532d] text-white',
    declined: 'bg-[#7f1d1d] text-white',
};

export function RequestCard({ request }: { request: CaptainRequestRecord }) {
    return (
        <article className="rounded-xl border border-[#eef2f6] bg-white p-6 shadow-sm">
            <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src={request.image}
                        alt={request.yachtName}
                        className="h-16 w-16 shrink-0 rounded-lg border border-[#f3f4f6] object-cover"
                    />

                    <div>
                        <h3 className="text-[15px] font-bold text-[#111827]">
                            {request.yachtName}
                        </h3>
                        <p className="text-[13px] text-[#6b7280]">{request.yachtSpec}</p>
                        <p className="text-[13px] text-[#6b7280]">{request.marina}</p>
                    </div>
                </div>

                <span
                    className={`inline-flex self-start rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase ${statusStyles[request.status]}`}
                >
                    {request.status}
                </span>
            </header>

            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <RequestInfoItem label="Date" value={request.date} />
                <RequestInfoItem label="Time" value={request.time} />
                <RequestInfoItem label="Duration" value={request.duration} />
            </div>

            <section className="mb-6">
                <p className="mb-1 text-[12px] font-medium text-[#6b7280]">Special Notes</p>
                <p className="text-[14px] text-[#1f2937]">{request.specialNotes}</p>
            </section>

            <footer className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#111827] px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#1f2937]"
                >
                    <Check className="h-4 w-4" />
                    Accept Request
                </button>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <X className="h-4 w-4" />
                    Decline
                </button>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e5e7eb] bg-white px-5 py-2.5 text-[13px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    <MessageSquare className="h-4 w-4" />
                    Message Owner
                </button>
            </footer>
        </article>
    );
}

function RequestInfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="mb-1 text-[12px] font-medium text-[#6b7280]">{label}</p>
            <p className="text-[15px] font-bold text-[#111827]">{value}</p>
        </div>
    );
}
