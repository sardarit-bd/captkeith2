import { Head } from '@inertiajs/react';
import { AboutSection } from '@/components/home/about-section';
import { CtaSection } from '@/components/home/cta-section';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { login, register } from '@/routes';

type WelcomeProps = {
    canRegister?: boolean;
};

export default function Welcome({ canRegister = true }: WelcomeProps) {
    const registerHref = canRegister ? register.url() : login.url();

    return (
        <>
            <Head title="CaptMatch - Connecting Yacht Owners with Captains" />

            <div>
                <HeroSection ownerHref={registerHref} captainHref={registerHref} />
                <AboutSection />
                <ServicesSection />
                <WhyChooseSection />
                <TestimonialsSection />
                <CtaSection ownerHref={registerHref} captainHref={registerHref} />
            </div>
        </>
    );
}
