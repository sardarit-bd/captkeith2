import { usePage } from '@inertiajs/react';

import type { OwnerInvitationRecord } from './invitations-data';
import { InvitationsList } from './invitations-list';

type PageProps = {
    invitations: OwnerInvitationRecord[];
};

export function InvitationsPageContent() {
    const { invitations } = usePage<PageProps>().props;

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                    <InvitationsList invitations={invitations} />
                </div>
            </div>
        </div>
    );
}
