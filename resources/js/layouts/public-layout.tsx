import { usePage } from '@inertiajs/react';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { contact, dashboard, home, login } from '@/routes';

const defaultNavLinks = [
    { label: 'Home', href: home.url() },
    { label: 'Yachts', href: '#' },
    { label: 'Captains', href: '#' },
    { label: 'Contact', href: contact.url() },
];

type PublicPageProps = {
    auth?: {
        user?: unknown;
    };
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<PublicPageProps>().props;
    const isAuthenticated = !!auth?.user;

    return (
        <div className="captmatch-home min-h-screen overflow-x-hidden bg-white text-[#2B2B2B]">
            <Navbar
                navLinks={defaultNavLinks}
                authHref={isAuthenticated ? dashboard.url() : login.url()}
                authLabel={isAuthenticated ? 'Dashboard' : 'Sign In/ Sign Up'}
            />
            {children}
            <Footer />
        </div>
    );
}
