export type ProfileSelectOption = {
    value: string;
    label: string;
};

export type ProfileToggleOption = {
    id: string;
    label: string;
    checked?: boolean;
};

export const licenseTypes: ProfileSelectOption[] = [
    { value: 'oupv', label: 'OUPV (Six-Pack)' },
    { value: 'masters', label: 'Master' },
];

export const endorsementOptions: ProfileSelectOption[] = [
    { value: 'inland', label: 'Inland' },
    { value: 'near_coastal', label: 'Near Coastal' },
    { value: 'unlimited', label: 'Unlimited' },
];

export const workPreferenceOptions: ProfileToggleOption[] = [
    {
        id: 'can_provide_deckhand',
        label: 'Available to work as deckhand',
    },
];
