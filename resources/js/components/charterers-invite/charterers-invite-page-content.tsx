import { CharterersInviteActions } from './charterers-invite-actions';
import { CharterersInviteCaptainsList } from './charterers-invite-captains-list';
import { charterInviteLink, inviteCaptains } from './charterers-invite-data';
import { CharterersInviteSuccessBanner } from './charterers-invite-success-banner';

export function CharterersInvitePageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-[1000px] space-y-6 py-2 sm:py-4">
                    <CharterersInviteSuccessBanner
                        inviteLink={charterInviteLink}
                    />
                    <CharterersInviteCaptainsList captains={inviteCaptains} />
                    <CharterersInviteActions />
                </div>
            </div>
        </div>
    );
}
