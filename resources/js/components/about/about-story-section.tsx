import { Eye, Target } from 'lucide-react';
import { aboutImages, aboutTheme, missionVisionItems, storyParagraphs } from '@/components/about/about-data';
import type { MissionVisionItem } from '@/components/about/about-data';

function MissionVisionCard({ item }: { item: MissionVisionItem }) {
    const Icon = item.icon === 'target' ? Target : Eye;

    return (
        <article className="relative flex min-h-[350px] flex-col justify-center overflow-hidden rounded-[20px] p-8 sm:p-10 md:min-h-[380px] md:p-14">
            <div className="absolute inset-0 bg-[#1D2B3C]" />
            <img src={item.backgroundImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay" aria-hidden="true" />
            <div className="absolute inset-0 bg-[#1E2939]/10" />

            <div className="relative z-10">
                <Icon className="mb-4 h-12 w-12 text-white sm:mb-6 sm:h-16 sm:w-16" strokeWidth={2.2} aria-hidden="true" />
                <h3 className="mb-3 text-[28px] font-bold text-white sm:mb-4 sm:text-[32px]">{item.title}</h3>
                <p className="text-[16px] leading-relaxed text-[#F9FCFF] md:text-[18px]">{item.description}</p>
            </div>
        </article>
    );
}

export function AboutStorySection() {
    return (
        <section className="py-12 sm:py-16 md:py-24">
            <div className="mx-auto max-w-[98rem] px-6 md:px-10">
                <div className="mb-12 grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 sm:mb-16">
                    <div className="flex flex-col justify-center">
                        <h2 className="mb-4 text-[32px] leading-tight font-bold sm:mb-6 sm:text-[40px] md:mb-8 md:text-[48px]" style={{ color: aboutTheme.primary }}>
                            Our Story
                        </h2>

                        <div className="space-y-4 sm:space-y-6">
                            {storyParagraphs.map((paragraph) => (
                                <p key={paragraph} className="text-[16px] leading-relaxed md:text-[18px]" style={{ color: aboutTheme.body }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="relative mt-6 h-[300px] w-full overflow-hidden rounded-2xl shadow-lg sm:h-[400px] md:h-[500px] lg:mt-0">
                        <img src={aboutImages.story} alt="Yacht captain on deck" className="absolute inset-0 h-full w-full object-cover object-center" />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                    {missionVisionItems.map((item) => (
                        <MissionVisionCard key={item.title} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
