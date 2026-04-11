import { homeTheme } from '@/components/home/home-data';

export function TestimonialsSection() {
    return (
        <section className="relative flex min-h-[600px] w-full items-center justify-start overflow-hidden py-20 md:py-32">
            <div
                className="absolute inset-0 rotate-180 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/home/testimonial.jpg')" }}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13, 49, 77, 0.80)' }} />

            <div className="relative z-10 max-w-[98rem] px-6 md:px-10 lg:px-40">
                <div className="max-w-2xl text-left">
                    <span className="mb-4 block text-[24px] font-semibold uppercase" style={{ color: homeTheme.secondary }}>
                        Client Testimonials
                    </span>

                    <h2 className="mb-12 text-3xl leading-tight font-bold text-white md:text-[52px]">
                        What Our <span className="captmatch-playfair font-normal italic font-semibold">Client Say</span>
                    </h2>

                    <div className="mb-8 flex max-w-3xl items-center justify-between">
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <svg key={`star-${index}`} width="24" height="24" viewBox="0 0 24 24" fill="#F97316" aria-hidden="true">
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            ))}
                        </div>

                        <div className="opacity-90">
                            <img src="/images/home/invert.png" alt="" className="h-[54px] w-[54px]" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="mb-12 max-w-3xl">
                        <p className="text-lg leading-relaxed font-light text-white md:text-[20px] italic font-poppins">
                            "As a captain, CaptMatch has opened up amazing opportunities. The platform is professional, the vessels are top-quality, and the charterers are always well-informed. Highly recommend! The platform handles all compliance issues, and I can trust that my yacht is in good hands."
                        </p>
                    </div>

                    <div className="flex max-w-3xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                        <div className="flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                                alt="Captain Sarah Martinez"
                                className="h-14 w-14 rounded-full border-2 object-cover"
                                style={{ borderColor: homeTheme.secondary }}
                            />
                            <div>
                                <h4 className="mb-1 text-xl leading-none font-semibold text-white">Captain Sarah Martinez</h4>
                                <p className="text-base text-[#F9FCFF]">
                                    Professional Captain
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-[10px] self-center md:self-auto">
                            <button
                                type="button"
                                className="group flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-white p-[7px] shadow-lg transition"
                                aria-label="Previous testimonial"
                            >
                                <img
                                    src="/images/home/arrow-left.png"
                                    alt=""
                                    className="h-full w-full transition-transform group-hover:-translate-x-1"
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                type="button"
                                className="group flex h-[48px] w-[48px] items-center justify-center rounded-[12px] p-[7px] shadow-lg transition"
                                style={{ backgroundColor: homeTheme.secondary }}
                                aria-label="Next testimonial"
                            >
                                <img
                                    src="/images/home/arrow-right.png"
                                    alt=""
                                    className="h-full w-full transition-transform group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
