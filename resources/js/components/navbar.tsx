import { Link } from '@inertiajs/react';
import { homeTheme } from '@/components/home/home-data';
import { HomeIcon } from '@/components/home/home-icons';

type NavLink = {
    label: string;
    href: string;
};

export function Navbar({
    navLinks,
    authHref,
    authLabel,
}: {
    navLinks: NavLink[];
    authHref: string;
    authLabel: string;
}) {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white py-4 shadow-sm">
            <div className="mx-auto flex w-full max-w-8xl items-center justify-between px-6">
                <img
                    src="/images/logo1.svg"
                    alt="CaptMatch"
                    className="h-auto w-32 md:w-40"
                />
                <div className="hidden items-center space-x-8 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[16px] font-medium transition hover:opacity-80"
                            style={{ color: homeTheme.menuText }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <Link
                    href={authHref}
                    className="flex items-center gap-2 rounded-[4px] px-4 py-3 text-sm font-medium text-white transition md:px-6 md:py-[18px] md:text-[16px]"
                    style={{ backgroundColor: homeTheme.primary }}
                >
                    <span className="whitespace-nowrap">{authLabel}</span>
                    <HomeIcon
                        name="arrow-right"
                        className="h-4 w-4 md:h-5 md:w-5"
                    />
                </Link>
            </div>
        </nav>
    );
}
