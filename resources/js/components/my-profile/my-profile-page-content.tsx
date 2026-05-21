import { usePage } from '@inertiajs/react';
import { DeckhandProfileForm } from './deckhand-profile-form';
import { MyProfileForm } from './my-profile-form';
import { OwnerProfileForm } from './owner-profile-form';

export function MyProfilePageContent() {
    const page = usePage<{ auth?: { role?: string | null } }>();
    const role = page.props.auth?.role;

    if (role === 'deckhand') {
        return (
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
                <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
                    <div className="mx-auto w-full max-w-250">
                        <DeckhandProfileForm />
                    </div>
                </div>
            </div>
        );
    }

    if (role === 'owner') {
        return (
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
                <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-212.5">
                        <OwnerProfileForm />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
                <div className="mx-auto w-full max-w-250">
                    <MyProfileForm />
                </div>
            </div>
        </div>
    );
}
