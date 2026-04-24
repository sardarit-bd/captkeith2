import { Head } from '@inertiajs/react';
import { CharterersInvitePageContent } from '@/components/charterers-invite/charterers-invite-page-content';
import { invite } from '@/routes/chartarere';

export default function ChartarereInvitePage() {
    return (
        <>
            <Head title="Charterers Invite" />
            <CharterersInvitePageContent />
        </>
    );
}

ChartarereInvitePage.layout = {
    breadcrumbs: [
        {
            title: 'Charterers',
            href: invite(),
        },
    ],
    pageHeader: {
        title: 'Charter Invite',
        description: 'Share invite links and track captain responses.',
    },
};
