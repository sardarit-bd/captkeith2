import { requestSteps } from './charterer-request-data';

export function ChartererRequestNextStepsCard() {
    return (
        <section className="rounded-2xl border border-[#edf2f7] bg-[#f9fafb] p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 text-base font-bold text-[#111827]">
                Next Steps
            </h3>

            <div className="space-y-6">
                {requestSteps.map((step) => (
                    <article key={step.id} className="flex items-start gap-4">
                        <div
                            className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold shadow-sm ${
                                step.active
                                    ? 'bg-[#0A273F] text-white'
                                    : 'border border-[#e5e7eb] bg-white text-[#4b5563]'
                            }`}
                        >
                            {step.id}
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-[#111827]">
                                {step.title}
                            </h4>
                            <p className="mt-0.5 text-sm text-[#6b7280]">
                                {step.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
