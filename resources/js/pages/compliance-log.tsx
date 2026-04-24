import { Head } from '@inertiajs/react';
import { ComplianceLogPageContent } from '@/components/compliance-log/compliance-log-page-content';
import { complianceLog } from '@/routes';

export default function ComplianceLogPage() {
    return (
        <>
            <Head title="Compliance Log" />
            <ComplianceLogPageContent />
        </>
    );
}

ComplianceLogPage.layout = {
    breadcrumbs: [
        {
            title: 'Compliance Log',
            href: complianceLog(),
        },
    ],
    pageHeader: {
        title: 'Compliance Ledger',
        description:
            'Audit trail for demise charters, agreements, and VQUIP insurance.',
    },
};
