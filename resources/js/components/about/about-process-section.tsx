import { ChevronRight } from 'lucide-react';
import { processSteps } from '@/components/about/about-data';

export function AboutProcessSection() {
    return (
        <section className="w-full bg-[#F9FCFF] py-12 sm:py-16 md:py-24">
            <div className="mx-auto max-w-392 px-6 md:px-10">
                <h2 className="mb-12 text-center text-[32px] font-bold text-[#0D314D] sm:mb-16 sm:text-[40px] md:mb-20 md:text-[48px]">
                    How It Works
                </h2>

                <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-6">
                    {processSteps.map((step, index) => {
                        const stepNumber = index + 1;
                        const hasConnector = index < processSteps.length - 1;

                        return (
                            <article
                                key={step.title}
                                className="relative flex flex-1 flex-col items-center text-center"
                            >
                                {hasConnector && (
                                    <div className="absolute top-10 left-[calc(50%+3rem)] z-0 hidden w-[calc(100%-6rem)] items-center justify-center md:flex">
                                        <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                                        <div className="mx-1 flex-1 border-t-[1.5px] border-dashed border-gray-300" />
                                        <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
                                    </div>
                                )}

                                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-[#015291] to-[#0D314D] text-[24px] font-bold text-white sm:mb-6 sm:h-20 sm:w-20 sm:text-[28px]">
                                    {stepNumber}
                                </div>
                                <h3 className="mb-2 text-[18px] font-bold text-[#2D3748] sm:mb-3 sm:text-[20px]">
                                    {step.title}
                                </h3>
                                <p className="max-w-70 text-[15px] leading-relaxed text-[#718096] sm:text-[16px]">
                                    {step.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
