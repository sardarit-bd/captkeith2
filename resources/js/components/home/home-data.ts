export const homeTheme = {
    primary: '#0D314D',
    secondary: '#35ADD5',
    footerBg: '#101828',
    menuText: '#2B2B2B',
    secondaryText: '#737C8A',
    cardBg: '#F8FAFC',
} as const;

export const heroBackground = '/images/home/hero-bg.jpg';

export const aboutImages = [
    {
        src: '/images/home/about.jpg',
        alt: 'Yacht from above',
    },
    {
        src: '/images/home/about2.jpg',
        alt: 'Yacht cruising',
    },
    {
        src: '/images/home/about3.jpg',
        alt: 'Dining on yacht',
    },
] as const;

export const serviceCards = [
    {
        title: 'Captain Matching',
        description:
            'Choose from a list of verified, licensed captains approved for your selected vessel, ensuring safety and reliability.',
        icon: 'captain',
        image: '/images/home/service-captain.png',
    },
    {
        title: 'Legal Compliance Support',
        description:
            'We help ensure your charter follows all required regulations, making your experience safe and legally compliant.',
        icon: 'legal',
    },
    {
        title: 'Voyage Insurance Integration',
        description:
            'Easily purchase voyage-specific liability insurance directly during booking for peace of mind.',
        icon: 'shield',
    },
] as const;

export const whyChooseList = [
    'Built for real-world charter needs',
    'Clear and transparent process',
    'Reliable platform experience',
] as const;

export const whyChooseCards = [
    {
        title: 'USCG Compliance',
        description: 'Every charter agreement meets federal maritime regulations.',
        icon: 'shield',
    },
    {
        title: 'Verified Captains',
        description: 'All captains hold valid USCG licenses & pass background checks.',
        icon: 'check',
    },
    {
        title: 'Quick Matching',
        description: 'Find the right captain for your vessel in under 24 hours.',
        icon: 'clock',
    },
    {
        title: 'Premium Insurance',
        description: 'Comprehensive coverage for owners, captains, and charterers.',
        icon: 'award',
    },
] as const;

export const footerQuickLinks = ['Home', 'Yachts', 'Captains', 'About Us'] as const;

export const footerSupportLinks = [
    'Safety & Compliance',
    'Pricing',
    'FAQs',
    'Testimonials',
    'Contact Us',
] as const;
