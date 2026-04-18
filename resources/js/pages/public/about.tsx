import { Head } from '@inertiajs/react';
import { AboutCtaSection } from '@/components/about/about-cta-section';
import { AboutHero } from '@/components/about/about-hero';
import { AboutProcessSection } from '@/components/about/about-process-section';
import { AboutStorySection } from '@/components/about/about-story-section';
import { AboutWhyChooseSection } from '@/components/about/about-why-choose-section';
import { contact, login, register } from '@/routes';

type AboutPageProps = {
    canRegister?: boolean;
};

export default function AboutPage({ canRegister = true }: AboutPageProps) {
    const captainHref = canRegister ? register.url() : login.url();

    return (
        <>
            <Head title="About Us - CaptMatch" />

            <AboutHero />
            <AboutStorySection />
            <AboutProcessSection />
            <AboutWhyChooseSection />
            <AboutCtaSection bookHref={contact.url()} captainHref={captainHref} />
        </>
    );
}
