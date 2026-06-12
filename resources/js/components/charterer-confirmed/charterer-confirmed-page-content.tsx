import { Link } from '@inertiajs/react';
import {
    Calendar,
    Check,
    Download,
    FileText,
    Printer,
    Ship,
    User,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { dashboard } from '@/routes';
import {
    confirmationDocuments,
    confirmationImportantNote,
    confirmationNextSteps,
    confirmationSummary,
} from './charterer-confirmed-data';

export function ChartererConfirmedPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-[700px] space-y-6">
                    <section className="mb-10 pt-4 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#D1FAE5] bg-[#ECFDF5]">
                            <Check className="h-8 w-8 text-[#10B981]" />
                        </div>
                        <h2 className="mb-2 text-[28px] font-bold text-[#111827] sm:text-[32px]">
                            Charter Confirmed!
                        </h2>
                        <p className="text-[15px] text-[#6b7280]">
                            Your bareboat charter is complete and ready to go
                        </p>
                    </section>

                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
                        <h3 className="mb-5 text-sm font-bold text-[#111827]">
                            Charter Summary
                        </h3>

                        <div className="space-y-4">
                            <SummaryCard
                                icon={<Ship className="h-5 w-5" />}
                                iconColor="text-blue-500"
                                bgColor="bg-[#F4F7FB]"
                                title={confirmationSummary.yacht.name}
                                subtitle={confirmationSummary.yacht.details}
                            />
                            <SummaryCard
                                icon={<User className="h-5 w-5" />}
                                iconColor="text-green-500"
                                bgColor="bg-[#ECFDF5]"
                                title={confirmationSummary.captain.name}
                                subtitle={confirmationSummary.captain.details}
                            />
                            <SummaryCard
                                icon={<Calendar className="h-5 w-5" />}
                                iconColor="text-purple-500"
                                bgColor="bg-[#FDF4FF]"
                                title={confirmationSummary.schedule.date}
                                subtitle={confirmationSummary.schedule.details}
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#edf2f7] bg-white p-6 shadow-sm sm:p-8">
                        <h3 className="mb-5 text-sm font-bold text-[#111827]">
                            Your Documents
                        </h3>

                        <div>
                            {confirmationDocuments.map((document, index) => (
                                <article
                                    key={document.id}
                                    className={`flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center ${
                                        index !==
                                        confirmationDocuments.length - 1
                                            ? 'border-b border-[#f3f4f6]'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText
                                            className={`h-5 w-5 shrink-0 ${document.accentColor}`}
                                        />
                                        <div>
                                            <h4 className="text-sm font-semibold text-[#111827]">
                                                {document.title}
                                            </h4>
                                            <p className="mt-0.5 text-xs text-[#6b7280]">
                                                {document.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="flex items-center gap-2 text-sm font-semibold text-[#374151] transition-colors hover:text-[#35ADD5]"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download
                                    </button>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-blue-50 bg-[#F4F7FB] p-6 sm:p-8">
                        <h3 className="mb-6 text-sm font-bold text-[#111827]">
                            What&apos;s Next?
                        </h3>

                        <div className="space-y-6">
                            {confirmationNextSteps.map((step) => (
                                <article
                                    key={step.id}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white shadow-sm">
                                        {step.id}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#111827]">
                                            {step.title}
                                        </h4>
                                        <p className="mt-0.5 text-sm text-[#4b5563]">
                                            {step.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-xl border border-[#FEF08A] bg-[#FEFCE8] p-5">
                        <p className="text-sm leading-relaxed text-[#A16207]">
                            <span className="font-bold">Important:</span>{' '}
                            {confirmationImportantNote}
                        </p>
                    </section>

                    <footer className="mt-8 flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-sm font-medium text-[#1f2937] shadow-sm transition-colors hover:bg-[#f9fafb] sm:w-auto"
                        >
                            <Printer className="h-4 w-4" />
                            Print Confirmation
                        </button>

                        <Link
                            href={dashboard()}
                            className="w-full rounded-lg bg-[#35ADD5] px-8 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#35ADD5]/70 sm:w-auto"
                        >
                            Return to Home
                        </Link>
                    </footer>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
    icon,
    iconColor,
    bgColor,
    title,
    subtitle,
}: {
    icon: ReactNode;
    iconColor: string;
    bgColor: string;
    title: string;
    subtitle: string;
}) {
    return (
        <article
            className={`flex items-center gap-4 rounded-xl p-4 ${bgColor}`}
        >
            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${iconColor}`}
            >
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-bold text-[#111827]">{title}</h4>
                <p className="mt-0.5 text-xs text-[#6b7280]">{subtitle}</p>
            </div>
        </article>
    );
}
