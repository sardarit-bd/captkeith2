import { usePage, useForm } from '@inertiajs/react';
import { DeckhandProfileForm } from './deckhand-profile-form';
import { MyProfileForm } from './my-profile-form';
import { OwnerProfileForm } from './owner-profile-form';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import { requestApproval } from '@/routes/my-profile';

export function MyProfilePageContent() {
    const page = usePage<{ 
        auth?: { role?: string | null };
        is_verified?: boolean;
        status?: string | null;
        is_profile_complete?: boolean;
    }>();
    
    const role = page.props.auth?.role;
    const isVerified = page.props.is_verified ?? false;
    const status = page.props.status ?? null;
    const isProfileComplete = page.props.is_profile_complete ?? false;

    const { post, processing } = useForm({});

const handleRequestApproval = () => {
    if (!isProfileComplete) {
        alert('Please fill in all required profile fields first.');
        return;
    }
    // Use it like this:
    post(requestApproval()); 
};

    const renderActionButton = () => {
        if (isVerified) {
            return (
                <div className="mt-6 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                        Verified
                    </span>
                </div>
            );
        }

        if (status === 'pending') {
            return (
                <div className="mt-6 flex justify-center">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
                        Pending Admin Approval
                    </span>
                </div>
            );
        }

        // Not verified and not pending (could be null or rejected)
        return (
            <div className="mt-6 flex justify-center">
                <Button 
                    onClick={handleRequestApproval} 
                    disabled={!isProfileComplete || processing}
                    className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Sending...' : 'Request Admin Approval'}
                </Button>
            </div>
        );
    };

    if (role === 'deckhand') {
        return (
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
                <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
                    <div className="mx-auto w-full max-w-250">
                        <DeckhandProfileForm />
                        {renderActionButton()}
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
                    {renderActionButton()}
                </div>
            </div>
        </div>
    );
}