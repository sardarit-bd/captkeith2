import { whyChooseCards } from '@/components/about/about-data';

function PremiumInsuranceIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white sm:h-[20px] sm:w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="9" r="5" />
            <path d="M9.5 14.8 8.5 20l3.5-2.1 3.5 2.1-1-5.2" />
            <path d="M13.6 7.4c-.4-.4-1-.7-1.7-.7-1 0-1.8.6-1.8 1.4 0 .8.7 1.1 1.8 1.4 1 .3 1.7.6 1.7 1.4 0 .8-.8 1.4-1.8 1.4-.8 0-1.5-.3-2-.8" />
            <path d="M12 6v6" />
        </svg>
    );
}

export function AboutWhyChooseSection() {
    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-24">
            <div className="mx-auto max-w-[98rem] px-6 md:px-10">
                <h2 className="mb-10 text-center text-[32px] font-bold text-[#0D314D] sm:mb-12 sm:text-[40px] md:mb-16 md:text-[48px]">Why Choose Us?</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    {whyChooseCards.map((card) => (
                        <article key={card.title} className="rounded-[16px] border border-[#E2E8F0] bg-white p-6 transition-shadow duration-300 hover:shadow-md md:p-8">
                            <div className="mb-5 flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-gradient-to-r from-[#015291] to-[#0D314D] sm:mb-6 sm:h-[40px] sm:w-[40px]">
                                {card.title === 'Premium Insurance' ? (
                                    <PremiumInsuranceIcon />
                                ) : (
                                    <card.icon className="h-4 w-4 text-white sm:h-[18px] sm:w-[18px]" strokeWidth={2} aria-hidden="true" />
                                )}
                            </div>
                            <h3 className="mb-2 text-[18px] font-bold text-black sm:mb-3 sm:text-[20px]">{card.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#718096] sm:text-[16px]">{card.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
