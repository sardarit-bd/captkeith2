import { Head } from '@inertiajs/react';
import { ContactContent } from '@/components/contact/contact-content';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactMap } from '@/components/contact/contact-map';

export default function ContactPage() {
    return (
        <>
            <Head title="Contact Us - CaptMatch" />

            <ContactHero />
            <ContactContent />
            <ContactMap />
        </>
    );
}

