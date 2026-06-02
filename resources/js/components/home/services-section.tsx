import { homeTheme, serviceCards } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

export function ServicesSection() {
    return (
        <section id="services" className=" bg-[#f9fcff] overflow-hidden py-16 md:py-24">
            <div className="mx-auto max-w-[98rem] px-6 md:px-10">
                <div className="mb-16 grid grid-cols-1 items-center gap-12 md:mb-20 lg:grid-cols-2">
                    <div className="text-left">
                        <span className="mb-4 block text-[24px] font-medium uppercase" style={{ color: homeTheme.secondary }}>
                            Our Services
                        </span>
                        <h2 className="mb-6 text-3xl leading-tight font-bold md:text-[44px]">
                            Our Services That <br className="hidden md:block" />
                            <span className="captmatch-playfair font-medium italic">Simplify Your Journey</span>
                        </h2>
                        <p className="max-w-xl text-base leading-relaxed text-[##737C8A] md:text-[20px]">
                            Our services are designed to make yacht chartering effortless and stress-free. We handle
                            the details so you can focus on enjoying your time on the water.
                        </p>
                    </div>
                    <div>
                        <img
                            src="/images/home/service.jpg"
                            alt="Yacht in crystal water"
                            className="h-[250px] w-full rounded-[12px] object-cover shadow-2xl md:h-[350px] md:rounded-[20px]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                    {serviceCards.map((card) => (
                        <div key={card.title} className="rounded-[12px] bg-white p-8 shadow-sm transition hover:shadow-md md:rounded-[16px] md:p-10">
                            <div
                                className="mb-8 flex h-12 w-12 items-center justify-center rounded-[8px]"
                                style={{ background: 'linear-gradient(to right, #015291, #35ADD5)' }}
                            >
                                {card.image ? (
                                    <img
                                        src={card.image}
                                        alt={`${card.title} icon`}
                                        className="h-6 w-6 object-contain"
                                        style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
                                    />
                                ) : (
                                    <HomeIcon name={card.icon} className="h-6 w-6" stroke="#ffffff" />
                                )}
                            </div>
                            <h3 className="mb-4 text-2xl font-semibold" style={{ color: homeTheme.primary }}>
                                {card.title}
                            </h3>
                            <p className="text-[15px] leading-relaxed" style={{ color: homeTheme.secondaryText }}>
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
