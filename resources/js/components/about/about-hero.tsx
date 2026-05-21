import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { aboutImages, aboutTheme } from '@/components/about/about-data';
import { home } from '@/routes';

export function AboutHero() {
    return (
        <section className="relative flex min-h-75 w-full items-center justify-center overflow-hidden md:min-h-105">
            <img
                src={aboutImages.hero}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{ backgroundColor: `${aboutTheme.overlay}D9` }}
            />

            <div className="relative z-10 mt-8 flex w-full flex-col items-center px-6 text-center text-white md:mt-0">
                <h1 className="mb-4 text-[36px] leading-tight font-bold md:mb-6 md:text-[52px]">
                    About Us
                </h1>
                <nav
                    className="flex flex-wrap items-center justify-center text-[16px] md:text-[20px]"
                    aria-label="Breadcrumb"
                >
                    <Link
                        href={home.url()}
                        className="opacity-85 transition hover:text-[#35ADD5] hover:opacity-100"
                    >
                        Home
                    </Link>
                    <ChevronRight
                        className="mx-2 h-4 w-4 opacity-80 md:mx-3 md:h-5 md:w-5"
                        aria-hidden="true"
                    />
                    <span className="font-semibold">About Us</span>
                </nav>
            </div>
        </section>
    );
}
