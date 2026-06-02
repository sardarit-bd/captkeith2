import { BadgeCheck, BadgeDollarSign, Clock3, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const aboutTheme = {
    overlay: '#041728',
    primary: '#35ADD5',
    secondary: '#35ADD5',
    body: '#364153',
} as const;

export const aboutImages = {
    hero: '/images/home/testimonial.jpg',
    story: '/images/home/about.jpg',
    mission: '/images/about-us/about2.jpg',
    vision: '/images/about-us/about3.jpg',
    cta: '/images/home/cta.jpg',
} as const;

export const storyParagraphs: readonly string[] = [
    'Captain Match simplifies the complexities of legal yacht charters by connecting boat owners, charterers, and licensed captains through a compliant and transparent platform.',
    'Founded by maritime professionals who understood the challenges of navigating USCG regulations, we built a platform that makes legal yacht charters accessible to everyone.',
    'We ensure every charter follows USCG regulations while maximizing opportunities for owners and captains. Our mission is to make yacht chartering safe, legal, and effortless for all parties involved.',
] as const;

export type MissionVisionItem = {
    title: string;
    description: string;
    icon: 'target' | 'eye';
    backgroundImage: string;
};

export const missionVisionItems: readonly MissionVisionItem[] = [
    {
        title: 'Our Mission',
        description:
            'To create the most trusted and compliant yacht charter marketplace, connecting qualified captains with boat owners and charterers while ensuring every voyage meets the highest safety and legal standards.',
        icon: 'target',
        backgroundImage: aboutImages.mission,
    },
    {
        title: 'Our Vision',
        description:
            'To become the leading platform for legal yacht charters nationwide, setting the industry standard for compliance, transparency, and customer satisfaction in maritime services.',
        icon: 'eye',
        backgroundImage: aboutImages.vision,
    },
] as const;

export type ProcessStep = {
    title: string;
    description: string;
};

export const processSteps: readonly ProcessStep[] = [
    {
        title: 'Browse & Select',
        description: 'Choose from our curated selection of yachts and verified captains based on your needs.',
    },
    {
        title: 'Ensure Compliance',
        description: 'We guide you through USCG demise charter requirements and insurance options.',
    },
    {
        title: 'Enjoy Your Voyage',
        description: 'Experience your charter with confidence, knowing everything is legal and safe.',
    },
] as const;

export type WhyChooseCard = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export const whyChooseCards: readonly WhyChooseCard[] = [
    {
        title: 'USCG Compliance',
        description: 'Every charter agreement meets federal maritime regulations.',
        icon: Shield,
    },
    {
        title: 'Verified Captains',
        description: 'All captains hold valid USCG licenses and pass background checks.',
        icon: BadgeCheck,
    },
    {
        title: 'Quick Matching',
        description: 'Find the right captain for your vessel in under 24 hours.',
        icon: Clock3,
    },
    {
        title: 'Premium Insurance',
        description: 'Comprehensive coverage for owners, captains, and charterers.',
        icon: BadgeDollarSign,
    },
] as const;
