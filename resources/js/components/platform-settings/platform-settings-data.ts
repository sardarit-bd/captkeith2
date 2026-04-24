import type { LucideIcon } from 'lucide-react';
import {
    BellRing,
    BookOpen,
    Layout,
    Plug,
    Shield,
} from 'lucide-react';

export type PlatformSettingsTabId =
    | 'general'
    | 'uscg'
    | 'vquip'
    | 'notifications'
    | 'security';

export type PlatformSettingsTab = {
    id: PlatformSettingsTabId;
    label: string;
    icon: LucideIcon;
};

export const platformSettingsTabs: PlatformSettingsTab[] = [
    {
        id: 'general',
        label: 'General Preferences',
        icon: Layout,
    },
    {
        id: 'uscg',
        label: 'USCG Taxonomy',
        icon: BookOpen,
    },
    {
        id: 'vquip',
        label: 'Integrations (VQUIP)',
        icon: Plug,
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: BellRing,
    },
    {
        id: 'security',
        label: 'Security & Access',
        icon: Shield,
    },
];

export const uscgLicenseTypes = [
    {
        id: 'oupv',
        title: 'OUPV (6-Pack)',
        description: 'Operator of uninspected passenger vessels',
        enabled: true,
    },
    {
        id: 'masters',
        title: 'Masters License',
        description: 'Requires specific tonnage and endorsement ratings',
        enabled: true,
    },
] as const;

export const tonnageRatings = [
    'OUPV',
    '25 Gross Ton',
    '50 Gross Ton',
    '100 Gross Ton',
    '200 Gross Ton',
    '500 Gross Ton',
] as const;

export const geographicEndorsements = ['Inland', 'Near Coastal', 'Unlimited'] as const;

export const notificationTriggers = [
    {
        id: 'new-captain-registration',
        title: 'New Captain Registration',
        description:
            'Alert when a captain joins and requires document verification.',
        enabled: true,
    },
    {
        id: 'new-vessel-listing',
        title: 'New Vessel Listing',
        description: 'Alert when an owner adds a yacht needing spec approval.',
        enabled: true,
    },
    {
        id: 'charter-agreement-executed',
        title: 'Charter Agreement Executed',
        description: 'Daily digest of completed demise charters.',
        enabled: false,
    },
    {
        id: 'compliance-flag',
        title: 'Compliance Flag / Void Charter',
        description: 'Immediate alert if a demise constraint is broken.',
        enabled: true,
        disabled: true,
    },
] as const;
