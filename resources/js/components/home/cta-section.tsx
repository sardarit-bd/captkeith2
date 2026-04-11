import { Link } from '@inertiajs/react';
import { homeTheme } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

export function CtaSection({ ownerHref, captainHref }: { ownerHref: string; captainHref: string }) {
    return (
        <section className="bg-white px-6 md:px-10 lg:px-[30px] py-16 md:py-24">
            <div className="mx-auto max-w-[88rem]">
                <div className="relative overflow-hidden rounded-[24px] px-6 py-16 text-center md:rounded-[40px] md:px-12 md:py-24">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/home/cta.jpg')" }}
                    />
                    <div className="absolute inset-0 bg-[#041728CC]/80" />

                    <div className="relative z-10 mx-auto max-w-5xl">
                        <h2 className="mb-6 text-3xl leading-tight font-bold text-white md:text-[52px]">
                            Ready To Start Your <span className="captmatch-playfair font-semibold italic">Yacht Experience?</span>
                        </h2>
                        <p className="mx-auto mb-10 max-w-4xl text-base leading-relaxed text-white/80 md:text-[20px]">
                            Join thousands who trust Captain Match for a seamless and reliable yacht charter
                            experience. We make every journey simple, safe, and fully compliant from start to finish.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6">
                            <Link
                                href={ownerHref}
                                className="flex w-full items-center justify-center gap-2 rounded-[4px] px-10 py-5 text-[16px] font-semibold text-white transition sm:w-auto"
                                style={{ backgroundColor: homeTheme.secondary }}
                            >
                                Start as Owner
                                <HomeIcon name="arrow-right" className="h-5 w-5" />
                            </Link>

                            <Link
                                href={captainHref}
                                className="group flex w-full items-center justify-center gap-2 rounded-[4px] border border-white/30 px-10 py-5 text-[16px] font-semibold text-white transition hover:bg-white sm:w-auto"
                            >
                                <span className="group-hover:text-[#0D314D]">Join as Captain</span>
                                <HomeIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:text-[#0D314D]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
