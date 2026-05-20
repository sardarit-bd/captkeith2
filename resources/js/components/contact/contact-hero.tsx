import { Link } from '@inertiajs/react';
import { contactHeroBackground } from '@/components/contact/contact-data';
import { home } from '@/routes';

export function ContactHero() {
    return (
        <section className="relative flex h-62.5 w-full items-center justify-center overflow-hidden md:h-87.5">
            <img
                src={contactHeroBackground}
                alt=""
                className="absolute inset-0 h-full w-full rotate-180 object-cover object-center"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{ backgroundColor: 'rgba(13, 49, 77, 0.80)' }}
            />

            <div className="relative z-10 px-6 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold md:text-[52px]">
                    Contact Us
                </h1>
                <nav
                    className="flex items-center justify-center gap-3 text-sm md:text-lg"
                    aria-label="Breadcrumb"
                >
                    <Link
                        href={home.url()}
                        className="text-[20px] opacity-80 transition hover:text-[#35ADD5] hover:opacity-100"
                    >
                        Home
                    </Link>
                    <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-80"
                        aria-hidden="true"
                    >
                        <path
                            d="M1 13L7 7L1 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="text-[20px] font-semibold">
                        Contact Us
                    </span>
                </nav>
            </div>
        </section>
    );
}
