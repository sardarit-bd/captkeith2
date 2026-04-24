import { FileText } from 'lucide-react';
import type { AgreementDocument } from './charterer-agreement-data';

export function ChartererAgreementDocumentCard({
    document,
}: {
    document: AgreementDocument;
}) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#edf2f7] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
            <header className="flex items-center gap-3 border-b border-[#f3f4f6] px-6 py-5 sm:px-8">
                <FileText className="h-5 w-5 text-[#374151]" />
                <h3 className="text-base font-bold text-[#111827]">
                    {document.title}
                </h3>
            </header>

            <div className="p-6 sm:p-8">
                <div className="mb-6 h-64 overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white p-6 sm:h-80 sm:p-8">
                    <h4 className="mb-6 text-center text-sm font-bold tracking-wide text-[#111827]">
                        {document.heading}
                    </h4>

                    <div className="space-y-4 text-sm leading-relaxed text-[#374151]">
                        {document.clauses.map((clause) => (
                            <p key={clause.id}>
                                {clause.title ? (
                                    <strong>{clause.title}</strong>
                                ) : null}
                                {clause.title ? <br /> : null}
                                {clause.body}
                            </p>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A273F] px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#123651]"
                >
                    {document.buttonLabel}
                </button>
            </div>
        </section>
    );
}
