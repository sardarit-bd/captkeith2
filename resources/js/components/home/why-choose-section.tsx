import { homeTheme, whyChooseCards, whyChooseList } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

export function WhyChooseSection() {
    return (
        <section id="why" className="overflow-hidden bg-white py-16 md:py-24">
            <div className="mx-auto max-w-[98rem] px-6 md:px-10 lg:px-[30px]">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
                    <div className="text-left">
                        <span className="mb-4 block text-[24px] font-semibold uppercase" style={{ color: homeTheme.secondary }}>
                            Why Choose Us
                        </span>
                        <h2 className="mb-8 text-3xl leading-tight font-bold md:text-[44px]" style={{ color: homeTheme.primary }}>
                            The Trusted Platform <br className="hidden md:block" />
                            <span className="captmatch-playfair font-bold italic">For Maritime Charters</span>
                        </h2>
                        <p className="mb-10 max-w-xl text-base leading-relaxed md:text-[18px]" style={{ color: homeTheme.secondaryText }}>
                            Captain Match was built by maritime professionals who understand the complexities of USCG
                            regulations, demise charters, and the charter industry.
                        </p>

                        <div className="space-y-6">
                            {whyChooseList.map((item) => (
                                <div key={item} className="flex items-center gap-4">
                                    <div
                                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2"
                                        style={{ borderColor: homeTheme.secondary }}
                                    >
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                            <path d="M10 3L4.5 8.5L2 6" stroke={homeTheme.secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <span className="font-medium" style={{ color: homeTheme.secondaryText }}>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {whyChooseCards.map((card) => (
                            <div key={card.title} className="rounded-[16px] border border-slate-100 p-8 transition hover:shadow-md" style={{ backgroundColor: homeTheme.cardBg }}>
                                <div
                                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-[8px]"
                                    style={{ backgroundColor: homeTheme.primary }}
                                >
                                    <HomeIcon name={card.icon} className="h-6 w-6" stroke="white" />
                                </div>
                                <h3 className="mb-4 text-lg leading-tight font-bold" style={{ color: homeTheme.primary }}>
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: homeTheme.secondaryText }}>
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
