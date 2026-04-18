import { Link } from '@inertiajs/react';
import { aboutImages } from '@/components/about/about-data';
import { HomeIcon } from '@/components/home/home-icons';

type AboutCtaSectionProps = {
    bookHref: string;
    captainHref: string;
};

export function AboutCtaSection({ bookHref, captainHref }: AboutCtaSectionProps) {
    return (
        <section className="mx-auto w-full max-w-[98rem] px-6 pb-12 sm:pb-16 md:px-10 md:pb-24">
            <div className="relative flex min-h-[350px] flex-col items-center justify-center overflow-hidden rounded-[20px] px-5 py-12 text-center shadow-2xl sm:px-8 sm:py-16 md:min-h-[450px] md:rounded-[24px] md:px-12 md:py-24">
                <img src={aboutImages.cta} alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />
                <div className="absolute inset-0 bg-[#041728D9]" />

                <div className="relative z-10 mx-auto w-full max-w-[850px]">
                    <h2 className="mb-4 text-[32px] leading-tight font-bold text-white sm:mb-6 sm:text-[40px] md:text-[52px]">
                        Ready To Start Your <span className="captmatch-playfair font-bold italic">Charter Experience?</span>
                    </h2>
                    <p className="mb-8 px-2 text-[15px] leading-relaxed text-[#F9FCFF] sm:mb-10 sm:px-4 sm:text-[16px] md:text-[18px]">
                        Join thousands who trust Captain Match for a seamless and reliable yacht charter experience. We make every journey simple, safe, and fully compliant from start to finish.
                    </p>

                    <div className="flex w-full flex-col items-center justify-center gap-3 px-4 sm:w-auto sm:flex-row sm:gap-4 sm:px-0">
                        <Link
                            href={bookHref}
                            className="group flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#3DB3DE] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#2A9BCA] sm:w-auto sm:text-[16px]"
                        >
                            Book Yacht
                            <HomeIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href={captainHref}
                            className="group flex w-full items-center justify-center gap-2 rounded-[4px] border border-[#3DB3DE99] bg-transparent px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-[#3DB3DE] hover:bg-[#3DB3DE1A] sm:w-auto sm:text-[16px]"
                        >
                            Find a Captain
                            <HomeIcon name="arrow-right" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
