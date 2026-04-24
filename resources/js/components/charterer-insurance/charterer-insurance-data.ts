export const insuranceCoverageItems = [
    'Hull damage and loss coverage',
    'Liability protection up to $2,000,000',
    'Medical payments coverage',
    'Personal property protection',
    'Emergency towing and assistance',
] as const;

export const insuranceSummary = {
    coverageAmount: '$2,000,000',
    charterDuration: '6 hours',
    premium: '$295',
};

export const insuranceNote =
    "This is a demo integration. In production, you would be redirected to VQUIP's secure payment portal to complete your insurance purchase.";
