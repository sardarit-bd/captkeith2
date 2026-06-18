import { router, usePage } from '@inertiajs/react';
import { FileText, Download, CheckCircle2, Circle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { insurance, information } from '@/routes/charterer';

interface AgreementParties {
    owner?: string;
    charterer: string;
    captain?: string;
}

interface AgreementDoc {
    id: string;
    type: 'bareboat' | 'captain_hire';
    title: string;
    subtitle: string;
    captainProfileId?: string;
    parties: AgreementParties;
    isSigned?: boolean;
}

interface VesselInfo {
    name: string;
    officialNumber: string;
    charterDate: string;
}

interface PageProps {
    charterEventId: string;
    agreements: AgreementDoc[];
    vessel: VesselInfo;
    flash?: { success?: string; error?: string };
}

function BareboatAgreementText({
    parties,
    vessel,
}: {
    parties: AgreementParties;
    vessel: VesselInfo;
}) {
    return (
        <div className="space-y-3 text-sm leading-relaxed text-[#374151]">
            <p className="text-center font-bold tracking-wide text-[#35ADD5] uppercase">
                BAREBOAT/DEMISE CHARTER AGREEMENT
            </p>
            <p>
                This Bareboat Charter Agreement is entered into on{' '}
                <strong>{vessel.charterDate}</strong> between{' '}
                <strong>{parties.owner}</strong>, hereinafter referred to as{' '}
                <strong>OWNER</strong>, and <strong>{parties.charterer}</strong>
                , hereinafter referred to as the <strong>CHARTERER</strong>.
            </p>
            <p>
                WHEREAS, OWNER is the owner or agent for the owner of that
                certain yacht <strong>{vessel.name}</strong> (Official Number:{' '}
                <strong>{vessel.officialNumber}</strong>), which includes all
                equipment, fixtures and other property delivered to CHARTERER
                with said Yacht.
            </p>
            <p className="font-semibold text-[#35ADD5]">1. TERM</p>
            <p>
                The term of the charter shall commence at the agreed-upon start
                time on <strong>{vessel.charterDate}</strong> and end at the
                agreed-upon return time.
            </p>
            <p className="font-semibold text-[#35ADD5]">2. RENTAL</p>
            <p>
                The total rent to be paid by the CHARTERER to the OWNER is as
                specified in the booking arrangement. The full amount shall be
                paid no later than 30 days prior to delivery. A security and
                damage deposit shall be paid by the CHARTERER prior to delivery.
                If Charterer elects to hire a Captain preapproved by The Walston
                Group Inc., the deposit requirement shall be waived.
            </p>
            <p className="font-semibold text-[#35ADD5]">3. INSURANCE</p>
            <p>
                The OWNER agrees to keep the Yacht insured against Fire, Marine
                and Collision risks, and with Protection and Indemnity coverage
                for the term of this charter. An additional policy through vQuip
                insurance agency will be in effect when CHARTERER pays the
                premium in full, providing 3rd party liability coverage up to
                $50,000 per occurrence.
            </p>
            <p className="font-semibold text-[#35ADD5]">4. BAREBOAT CHARTER</p>
            <p>
                This charter shall at all times be construed as a
                bareboat/demise charter. CHARTERER assumes all responsibility
                for any injury, death, property damage, or other claim arising
                during the period of the charter or at any time when the vessel
                is under the control of the CHARTERER.
            </p>
            <p className="font-semibold text-[#35ADD5]">
                5. CHARTERER'S AUTHORITY OVER CREW
            </p>
            <p>
                Any Captain and/or crew members utilized are agents and
                employees of the CHARTERER and not the OWNER. The Captain shall
                not in any way be the agent of the OWNER.
            </p>
            <p className="mt-2 border-t border-[#e5e7eb] pt-2 text-xs text-[#6b7280]">
                The full agreement including all clauses will be available as a
                PDF download after signing.
            </p>
        </div>
    );
}

function CaptainHireAgreementText({
    parties,
    vessel,
}: {
    parties: AgreementParties;
    vessel: VesselInfo;
}) {
    return (
        <div className="space-y-3 text-sm leading-relaxed text-[#374151]">
            <p className="text-center font-bold tracking-wide text-[#35ADD5] uppercase">
                INDEPENDENT CAPTAIN FOR HIRE AGREEMENT
            </p>
            <p>
                This Agreement is entered into on{' '}
                <strong>{vessel.charterDate}</strong> between{' '}
                <strong>{parties.charterer}</strong> (Charterer) and{' '}
                <strong>{parties.captain}</strong> (Captain).
            </p>
            <p className="font-semibold text-[#35ADD5]">1. PURPOSE</p>
            <p>
                This Agreement is entered in connection with a separately
                executed Bareboat Charter Agreement for vessel{' '}
                <strong>{vessel.name}</strong>, charter date{' '}
                <strong>{vessel.charterDate}</strong>. The Charterer has
                independently selected and hired the Captain named above.
            </p>
            <p className="font-semibold text-[#35ADD5]">
                2. INDEPENDENT CONTRACTOR
            </p>
            <p>
                The Captain is an independent contractor and is not an employee,
                agent, or representative of the vessel owner or charter company.
                The Captain shall be solely responsible for compliance with all
                applicable maritime laws and safe vessel operation.
            </p>
            <p className="font-semibold text-[#35ADD5]">
                3. CAPTAIN'S AUTHORITY
            </p>
            <p>
                The Captain shall have final authority regarding safe
                navigation, operation, and management of the vessel, including
                weather conditions, passenger safety, routing, speed, anchoring,
                and docking. The Charterer and guests agree to comply with all
                lawful instructions of the Captain.
            </p>
            <p className="font-semibold text-[#35ADD5]">4. COMPENSATION</p>
            <p>
                The Hirer agrees to pay the Captain the agreed-upon hourly or
                daily rate for the duration of services provided. Payment terms
                shall be strictly adhered to as specified in the booking
                arrangement.
            </p>
            <p className="font-semibold text-[#35ADD5]">5. HOLD HARMLESS</p>
            <p>
                The Charterer agrees to hold harmless and indemnify the Captain
                from claims arising from the actions of the Charterer or guests
                aboard, except in cases of gross negligence or willful
                misconduct by the Captain.
            </p>
            <p className="mt-2 border-t border-[#e5e7eb] pt-2 text-xs text-[#6b7280]">
                The full agreement including all clauses will be available as a
                PDF download after signing.
            </p>
        </div>
    );
}

function AgreementCard({
    doc,
    vessel,
    isSigned,
    onSign,
}: {
    doc: AgreementDoc;
    vessel: VesselInfo;
    isSigned: boolean;
    onSign: (id: string) => void;
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#f0f0f0] bg-[#f8fbff] px-5 py-4">
                <FileText className="h-5 w-5 shrink-0 text-[#35ADD5]" />
                <div>
                    <p className="text-sm font-semibold text-[#35ADD5]">
                        {doc.title}
                    </p>
                    <p className="text-xs text-[#6b7280]">
                        {doc.type === 'bareboat'
                            ? `${doc.parties.owner} ↔ ${doc.parties.charterer}`
                            : `${doc.parties.charterer} ↔ ${doc.parties.captain}`}
                    </p>
                </div>
                {isSigned && (
                    <span className="ml-auto flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Reviewed
                    </span>
                )}
            </div>

            <div className="max-h-[300px] overflow-y-auto bg-white px-5 py-4">
                {doc.type === 'bareboat' ? (
                    <BareboatAgreementText
                        parties={doc.parties}
                        vessel={vessel}
                    />
                ) : (
                    <CaptainHireAgreementText
                        parties={doc.parties}
                        vessel={vessel}
                    />
                )}
            </div>

            <div className="border-t border-[#f0f0f0] bg-[#f8fbff] px-5 py-4">
                <button
                    type="button"
                    onClick={() => onSign(doc.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                        isSigned
                            ? 'cursor-default bg-emerald-600 text-white'
                            : 'bg-[#35ADD5] text-white hover:bg-[#35ADD5]/70 hover:shadow-md'
                    }`}
                >
                    {isSigned ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Signed
                        </>
                    ) : (
                        <>
                            <Circle className="h-4 w-4" />
                            Sign {doc.title}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export function ChartererAgreementPageContent() {
    const { agreements, vessel, charterEventId, flash } =
        usePage<PageProps>().props;
    console.log('agreements', agreements);
    const [signedIds, setSignedIds] = useState<Set<string>>(
        new Set(agreements.filter(a => a.isSigned).map(a => a.id))
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const allSigned = useMemo(
        () =>
            agreements.length > 0 &&
            agreements.every((a) => signedIds.has(a.id)),
        [agreements, signedIds],
    );

    function handleSign(id: string) {
        setSignedIds((prev) => new Set([...prev, id]));
    }

    function handleSubmit() {
        if (!allSigned) return;

        setIsSubmitting(true);
        router.post(
            '/charterer/agreement',
            { acknowledged: true },
            {
                onError: () => setIsSubmitting(false),
                onFinish: () => setIsSubmitting(false),
            },
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 max-w-[850px] space-y-6">
                    {flash?.error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {flash.error}
                        </div>
                    )}

                    {agreements.map((doc) => (
                        <AgreementCard
                            key={doc.id}
                            doc={doc}
                            vessel={vessel}
                            isSigned={signedIds.has(doc.id)}
                            onSign={handleSign}
                        />
                    ))}

                    <label className="group mt-8 flex cursor-pointer items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-colors hover:bg-[#f9fafb] sm:p-6">
                        <div className="shrink-0 pt-0.5">
                            <input
                                type="checkbox"
                                checked={allSigned}
                                readOnly
                                className="h-5 w-5 cursor-pointer rounded border-[#d1d5db] text-[#35ADD5]"
                            />
                        </div>
                        <span className="text-sm leading-relaxed text-[#374151] italic transition-colors group-hover:text-[#111827]">
                            I have read, understood, and agree to the terms of
                            all agreements above. I understand that I am
                            directly hiring the captain as an independent
                            contractor and that the captain is not an employee
                            or agent of the vessel owner.
                        </span>
                    </label>

                    {!allSigned && agreements.length > 0 && (
                        <p className="text-center text-xs text-[#9ca3af]">
                            Please sign all {agreements.length} agreement
                            {agreements.length > 1 ? 's' : ''} above to continue
                            ({signedIds.size} of {agreements.length} signed)
                        </p>
                    )}

                    <footer className="mt-8 flex flex-col-reverse items-center justify-between gap-4 pt-6 sm:flex-row">
                        <Link
                            href={information()}
                            className="w-full rounded-xl border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#4b5563] shadow-sm transition-all duration-200 hover:border-[#d1d5db] hover:bg-[#f3f4f6] sm:w-auto"
                        >
                            Back
                        </Link>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!allSigned || isSubmitting}
                            className={`flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold shadow-sm transition-all duration-200 sm:w-auto ${
                                allSigned && !isSubmitting
                                    ? 'bg-[#35ADD5] text-white hover:-translate-y-0.5 hover:bg-[#35ADD5]/70 hover:shadow-md'
                                    : 'cursor-not-allowed bg-[#35ADD5] text-white opacity-50'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Saving…
                                </>
                            ) : (
                                <>
                                    <Download className="h-4 w-4" />
                                    Continue to Insurance
                                </>
                            )}
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
}
