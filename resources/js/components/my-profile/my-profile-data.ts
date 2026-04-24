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
    { value: '200ton', label: 'USCG Master 200 Ton' },
    { value: '100ton', label: 'USCG Master 100 Ton' },
];

export const ratingOptions: ProfileSelectOption[] = [
    { value: 'master', label: 'Master' },
    { value: 'mate', label: 'Mate' },
];

export const endorsementOptions: ProfileToggleOption[] = [
    { id: 'near-coastal', label: 'Near Coastal', checked: true },
    { id: 'sailing', label: 'Sailing', checked: true },
    { id: 'auxiliary-sail', label: 'Auxiliary Sail' },
    { id: 'towing', label: 'Towing' },
    { id: 'assistance-towing', label: 'Assistance Towing' },
];

export const workPreferenceOptions: ProfileToggleOption[] = [
    { id: 'deckhand-availability', label: 'Available to work as deckhand' },
    {
        id: 'charter-availability',
        label: 'Currently available for charters',
        checked: true,
    },
];

export const additionalQualifications: string[] = [
    'STCW Basic Safety',
    'Maritime First Aid',
    'Radar Observer',
    'Advanced Firefighting',
    'Dynamic Positioning',
];
