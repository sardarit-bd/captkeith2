import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ContactInfo = {
    title: string;
    value: string;
    href?: string;
    note?: string;
    icon: LucideIcon;
};

export const contactHeroBackground = '/images/home/testimonial.jpg';

export const contactInfoList: readonly ContactInfo[] = [
    {
        title: 'Email',
        value: 'info@captmatch.com',
        href: 'mailto:info@captmatch.com',
        note: "We'll respond within 24 hours",
        icon: Mail,
    },
    {
        title: 'Phone',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
        note: 'Mon-Fri, 9am-6pm EST',
        icon: Phone,
    },
    {
        title: 'Office',
        value: '123 Marina Bay\nMiami, FL 33131',
        icon: MapPin,
    },
    {
        title: 'Business Hours',
        value: 'Monday - Friday: 9am - 6pm\nSaturday: 10am - 4pm\nSunday: Closed',
        icon: Clock3,
    },
] as const;

export const contactSubjects = ['Charter Inquiry', 'Captain Application', 'Vessel Listing', 'Support'] as const;
