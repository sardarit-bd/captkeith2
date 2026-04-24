export const confirmationSummary = {
    yacht: {
        name: 'Sea Dream',
        details: 'Power • 65ft',
    },
    captain: {
        name: 'Captain James Morrison',
        details: 'USCG Master 200 Ton',
    },
    schedule: {
        date: '4/20/2026',
        details: '09:00 • 6 hours',
    },
};

export const confirmationDocuments = [
    {
        id: 'vessel-charter-agreement',
        title: 'Vessel Charter Agreement',
        subtitle: 'Signed on 4/15/2026',
        accentColor: 'text-blue-500',
    },
    {
        id: 'captain-hire-agreement',
        title: 'Captain Hire Agreement',
        subtitle: 'Signed on 4/15/2026',
        accentColor: 'text-green-500',
    },
    {
        id: 'insurance-policy',
        title: 'Insurance Policy (VQUIP)',
        subtitle: 'Policy #VQ-BKJK7VV58',
        accentColor: 'text-purple-500',
    },
] as const;

export const confirmationNextSteps = [
    {
        id: 1,
        title: 'Confirmation Email Sent',
        description: 'Check your email for all charter details and documents',
    },
    {
        id: 2,
        title: 'Captain Will Contact You',
        description:
            'Your captain will reach out 24-48 hours before the charter',
    },
    {
        id: 3,
        title: 'Meet at the Marina',
        description: 'Arrive at Miami Beach Marina at 09:00',
    },
] as const;

export const confirmationImportantNote =
    'This is a bareboat charter. You (the charterer) have hired the captain independently. The captain is not an employee of the vessel owner. Please review all signed agreements for full details of your legal obligations.';
