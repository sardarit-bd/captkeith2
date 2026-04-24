import { AccountPreferencesAvailability } from './account-preferences-availability';
import { AccountPreferencesCurrentStatus } from './account-preferences-current-status';
import { AccountPreferencesManageAvailability } from './account-preferences-manage-availability';
import { AccountPreferencesNotifications } from './account-preferences-notifications';
import { AccountPreferencesPrivacy } from './account-preferences-privacy';

export function AccountPreferencesPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
                <div className="mx-auto max-w-[1000px] space-y-6">
                    <AccountPreferencesCurrentStatus />
                    <AccountPreferencesAvailability />
                    <AccountPreferencesManageAvailability />
                    <AccountPreferencesNotifications />
                    <AccountPreferencesPrivacy />
                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
}
