import { ShieldCheck } from 'lucide-react';
import { complianceEvents } from './admin-dashboard-data';

export function AdminComplianceLog() {
    return (
        <section className="rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center text-[#11395d]">
                    <ShieldCheck className="mr-2 h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold">Recent Compliance Events</h3>
                </div>
                <button
                    type="button"
                    className="text-sm font-medium text-[#35ADD5] transition-colors hover:text-[#0ea5c6]"
                >
                    Go to Full Log
                </button>
            </header>

            <div className="space-y-3">
                {complianceEvents.map((event, index) => (
                    <article
                        key={event.id}
                        className={`flex flex-col justify-between gap-2 py-2 sm:flex-row sm:items-center ${
                            index < complianceEvents.length - 1
                                ? 'border-b border-slate-100'
                                : ''
                        }`}
                    >
                        <p className="text-sm text-slate-600">{event.message}</p>
                        <span className="shrink-0 text-xs text-slate-400">
                            {event.timestamp}
                        </span>
                    </article>
                ))}
            </div>
        </section>
    );
}
