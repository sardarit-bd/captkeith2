import { Link } from '@inertiajs/react';
import { heroBackground, homeTheme } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

export function HeroSection({ ownerHref, captainHref }: { ownerHref: string; captainHref: string }) {
    return (
        <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden md:h-[85vh]">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${heroBackground}')` }}
            />
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(13, 49, 77, 0.60)' }} />

            <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center text-white">
                <h1 className="hero-heading mb-6 font-bold">
                    Connecting Yacht Owners <br />
                    <span className="captmatch-playfair font-bold italic">With USCG-Licensed Captains</span>
                </h1>

                <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed font-light opacity-90 md:mb-12 md:text-[20px]">
                    Captain Match connects Yacht owners with USCG-licensed captains through fully compliant
                    charter agreements, ensuring safe and legally sound operations.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6">
                    <Link
                        href={ownerHref}
                        className="flex w-full items-center justify-center gap-2 rounded-[4px] px-8 py-4 text-[16px] font-semibold text-white transition sm:w-auto md:px-10 md:py-5"
                        style={{ backgroundColor: homeTheme.secondary }}
                    >
                        List Your Yacht
                        <HomeIcon name="arrow-right" className="h-5 w-5" />
                    </Link>

                    <Link
                        href={captainHref}
                        className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-white px-8 py-4 text-[16px] font-semibold transition sm:w-auto md:px-10 md:py-5"
                        style={{ color: homeTheme.primary }}
                    >
                        Join as Captain
                        <HomeIcon name="arrow-right" className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
