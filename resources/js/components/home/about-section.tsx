import { aboutImages, homeTheme } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

export function AboutSection() {
    return (
        <section id="about" className="overflow-hidden bg-white py-16 md:py-24">
            <div className="mx-auto max-w-[98rem] px-6 md:px-10">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="relative flex gap-4 md:gap-6">
                        <div className="flex w-1/2 items-center">
                            <img
                                src={aboutImages[0].src}
                                alt={aboutImages[0].alt}
                                className="h-[350px] w-full rounded-[12px] object-cover shadow-xl md:h-[500px] md:rounded-[20px]"
                            />
                        </div>
                        <div className="flex w-1/2 flex-col justify-center gap-4 md:gap-6">
                            <img
                                src={aboutImages[1].src}
                                alt={aboutImages[1].alt}
                                className="h-[170px] w-full rounded-[12px] object-cover shadow-lg md:h-[240px] md:rounded-[20px]"
                            />
                            <img
                                src={aboutImages[2].src}
                                alt={aboutImages[2].alt}
                                className="h-[170px] w-full rounded-[12px] object-cover shadow-lg md:h-[240px] md:rounded-[20px]"
                            />
                        </div>
                    </div>

                    <div className="text-left">
                        <span className="mb-4 block text-[24px] font-medium uppercase" style={{ color: homeTheme.secondary }}>
                            About Us
                        </span>
                        <h2 className="mb-6 text-3xl font-bold leading-tight md:text-[44px]" style={{ color: homeTheme.primary }}>
                            Simplifying The <span className="captmatch-playfair font-bold italic">Charter</span>
                            <br className="hidden md:block" />& <span className="captmatch-playfair font-bold italic">Captain Experience</span>
                        </h2>
                        <p className="mb-10 max-w-xl text-base leading-relaxed md:text-[20px]" style={{ color: homeTheme.secondaryText }}>
                            Captain Match simplifies the complexities of legal yacht charters by connecting boat
                            owners, charterers, and licensed captains through a compliant and transparent platform.
                            We ensure every charter follows USCG regulations while maximizing opportunities for owners
                            and captains.
                        </p>

                        <a
                            href="#"
                            className="group inline-flex items-center gap-3 rounded-[4px] px-8 py-4 text-[16px] font-medium text-white transition"
                            style={{ backgroundColor: homeTheme.primary }}
                        >
                            Learn More
                            <HomeIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
