export type ComplianceOverallStatus =
    | 'Cleared for Sail'
    | 'Action Required'
    | 'Awaiting Docs'
    | 'Blocked / Void';

export type ComplianceDocumentStatus =
    | 'Executed'
    | 'Pending Signature'
    | 'Insurance Pending'
    | 'Protocol Broken';

export type ComplianceLogRecord = {
    id: string;
    charterCode: string;
    dateTime: string;
    duration: string;
    vesselName: string;
    owner: string;
    charterer: string;
    captain: string;
    captainMissing?: boolean;
    charterAgreementStatus: ComplianceDocumentStatus;
    captainAgreementStatus: ComplianceDocumentStatus;
    insuranceStatus: ComplianceDocumentStatus;
    insurancePolicyCode?: string;
    overallStatus: ComplianceOverallStatus;
    actionLabel: string;
};

export const complianceWindowFilters = [
    'Next 7 Days',
    'Next 30 Days',
    'Past Charters',
] as const;

export const complianceStatusFilters = [
    'All Statuses',
    'Fully Compliant',
    'Pending Agreements',
    'Pending Insurance',
    'Flagged',
] as const;

export const complianceStats = [
    {
        id: 'fully-compliant',
        label: 'Fully Compliant',
        value: 142,
        colorClass: 'bg-emerald-50 text-emerald-600',
    },
    {
        id: 'pending-signatures',
        label: 'Pending Signatures',
        value: 18,
        colorClass: 'bg-blue-50 text-blue-600',
    },
    {
        id: 'awaiting-insurance',
        label: 'Awaiting Insurance',
        value: 5,
        colorClass: 'bg-orange-50 text-orange-500',
    },
] as const;

export const complianceLogRecords: ComplianceLogRecord[] = [
    {
        id: 'ch-8924',
        charterCode: '#CH-8924',
        dateTime: 'Apr 24, 2026 • 09:00 AM',
        duration: '6 hours',
        vesselName: 'Sea Dream',
        owner: 'William H.',
        charterer: 'Mark R.',
        captain: 'John Carter',
        charterAgreementStatus: 'Executed',
        captainAgreementStatus: 'Executed',
        insuranceStatus: 'Executed',
        insurancePolicyCode: '#VQ-8821',
        overallStatus: 'Cleared for Sail',
        actionLabel: 'Audit Pack',
    },
    {
        id: 'ch-8925',
        charterCode: '#CH-8925',
        dateTime: 'Apr 28, 2026 • 12:00 PM',
        duration: '4 hours',
        vesselName: 'Harbor Light',
        owner: 'Robert T.',
        charterer: 'Sarah M.',
        captain: 'Alex V.',
        charterAgreementStatus: 'Executed',
        captainAgreementStatus: 'Executed',
        insuranceStatus: 'Insurance Pending',
        overallStatus: 'Action Required',
        actionLabel: 'Remind Charterer',
    },
    {
        id: 'ch-8928',
        charterCode: '#CH-8928',
        dateTime: 'May 02, 2026 • 10:00 AM',
        duration: '8 hours',
        vesselName: 'Windward',
        owner: 'Sarah Jenkins',
        charterer: 'David L.',
        captain: 'Mike Davis',
        charterAgreementStatus: 'Executed',
        captainAgreementStatus: 'Pending Signature',
        insuranceStatus: 'Pending Signature',
        overallStatus: 'Awaiting Docs',
        actionLabel: 'View Details',
    },
    {
        id: 'ch-8910',
        charterCode: '#CH-8910',
        dateTime: 'Apr 22, 2026 • 08:00 AM',
        duration: '4 hours',
        vesselName: 'Blue Current',
        owner: 'Owner ID #44',
        charterer: 'Lisa P.',
        captain: 'Missing',
        captainMissing: true,
        charterAgreementStatus: 'Protocol Broken',
        captainAgreementStatus: 'Protocol Broken',
        insuranceStatus: 'Protocol Broken',
        overallStatus: 'Blocked / Void',
        actionLabel: 'Review Log',
    },
];
