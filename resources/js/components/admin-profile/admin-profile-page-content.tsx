import { AdminProfileActions } from './admin-profile-actions';
import { AdminProfileAvatarCard } from './admin-profile-avatar-card';
import { AdminProfilePersonalCard } from './admin-profile-personal-card';
import { AdminProfileSecurityCard } from './admin-profile-security-card';

export function AdminProfilePageContent() {
    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl space-y-6 pb-12 pt-4">
                    <AdminProfileAvatarCard />
                    <AdminProfilePersonalCard />
                    <AdminProfileSecurityCard />
                    <AdminProfileActions />
                </div>
            </div>
        </div>
    );
}
