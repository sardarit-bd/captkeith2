import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { footerQuickLinks, footerSupportLinks, homeTheme } from '@/components/home/home-data';

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'X', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

export function Footer() {
    return (
        <footer className="overflow-hidden px-6 pt-20 pb-10 text-white" style={{ backgroundColor: homeTheme.footerBg }}>
            <div className="mx-auto max-w-8xl">
                <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-8">
                        <img src="/images/logo2.svg" alt="CaptMatch" className="h-auto w-32 md:w-40" />
                        <p className="max-w-xs text-[14px] leading-relaxed text-[#F9FCFF]">
                            Connecting boat owners, charterers, and USCG-licensed captains for safe and legal yacht
                            charters.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-semibold transition hover:border-[#35ADD5] hover:bg-[#35ADD5]"
                                    aria-label={item.name}
                                >
                                    <item.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <FooterLinkColumn title="Quick Links" links={footerQuickLinks} />
                    <FooterLinkColumn title="Support" links={footerSupportLinks} />

                    <div>
                        <h3 className="mb-8 text-xl font-bold">Get in Touch</h3>
                        <ul className="space-y-6 text-[15px] leading-[1.3] text-[#D1D5DC]">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#35ADD5]" aria-hidden="true" />
                                <span>123 Travel Street, Adventure City, TC 12345</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#35ADD5]" aria-hidden="true" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#35ADD5]" aria-hidden="true" />
                                <span>info@captmatch.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
                    <p className="text-center text-sm text-[#99A1AF] md:text-left">© 2026 Captain Match. All rights reserved.</p>
                    <div className="flex items-center gap-8 text-sm text-[#99A1AF]">
                        <a href="#" className="transition hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="transition hover:text-white">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLinkColumn({ title, links }: { title: string; links: readonly string[] }) {
    return (
        <div>
            <h3 className="mb-8 text-xl font-bold">{title}</h3>
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link}>
                        <a href="#" className="text-[15px] leading-[1.3] text-[#D1D5DC] transition hover:text-[#35ADD5]">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
