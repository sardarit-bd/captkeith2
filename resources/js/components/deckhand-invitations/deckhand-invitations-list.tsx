import { Ship } from 'lucide-react';

import { DeckhandInvitationCard } from './deckhand-invitations-card';
import type { DeckhandInvitationRecord } from './deckhand-invitations-data';

interface Props {
    invitations: DeckhandInvitationRecord[];
}

export function DeckhandInvitationsList({ invitations }: Props) {
    if (invitations.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#EFF6FF]">
                    <Ship className="h-8 w-8 text-[#2563eb]" />
                </span>
                <h3 className="mb-2 text-[18px] font-semibold text-[#0f172a]">
                    No invitations yet
                </h3>
                <p className="max-w-sm text-[14px] text-[#6b7280]">
                    When a vessel owner invites you to work as deckhand on their vessel, the
                    invitation will appear here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-[13px] text-[#6b7280]">
                {invitations.length}{' '}
                {invitations.length === 1 ? 'invitation' : 'invitations'} from
                vessel owners
            </p>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">
                {invitations.map((invitation) => (
                    <DeckhandInvitationCard
                        key={invitation.id}
                        invitation={invitation}
                    />
                ))}
            </section>
        </div>
    );
}