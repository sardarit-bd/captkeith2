import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { insurance } from '@/routes/charterer';
import { information } from '@/routes/charterer';
import {
    acknowledgementText,
    agreementDocuments,
} from './charterer-agreement-data';
import { ChartererAgreementDocumentCard } from './charterer-agreement-document-card';

export function ChartererAgreementPageContent() {
    const [isAcknowledged, setIsAcknowledged] = useState(false);

    const continueButtonClassName = useMemo(
        () =>
            `w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                isAcknowledged
                    ? 'bg-[#0A273F] text-white hover:bg-[#123651] hover:shadow-md hover:-translate-y-0.5'
                    : 'cursor-not-allowed bg-[#0A273F] text-white opacity-50'
            }`,
        [isAcknowledged],
    );

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-[850px] space-y-6">
                    {agreementDocuments.map((document) => (
                        <ChartererAgreementDocumentCard
                            key={document.id}
                            document={document}
                        />
                    ))}

                    <label className="group mt-8 flex cursor-pointer items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-colors hover:bg-[#f9fafb] sm:p-6">
                        <div className="shrink-0 pt-0.5">
                            <input
                                type="checkbox"
                                checked={isAcknowledged}
                                onChange={(event) =>
                                    setIsAcknowledged(event.target.checked)
                                }
                                className="h-5 w-5 cursor-pointer rounded border-[#d1d5db] text-[#0A273F]"
                            />
                        </div>
                        <span className="text-sm leading-relaxed text-[#374151] italic transition-colors group-hover:text-[#111827]">
                            {acknowledgementText}
                        </span>
                    </label>

                    <footer className="mt-8 flex flex-col-reverse items-center justify-between gap-4 pt-6 sm:flex-row">
                        <Link
                            href={information()}
                            className="w-full rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] sm:w-auto"
                        >
                            Back
                        </Link>

                        {isAcknowledged ? (
                            <Link
                                href={insurance()}
                                className={continueButtonClassName}
                            >
                                Continue to Insurance
                            </Link>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className={continueButtonClassName}
                            >
                                Continue to Insurance
                            </button>
                        )}
                    </footer>
                </div>
            </div>
        </div>
    );
}
