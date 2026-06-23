import { usePage, useForm } from '@inertiajs/react';
import { YachtsMatchGrid } from './yachts-match-grid';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import { requestApproval } from '@/routes/my-profile';
import { myProfile } from '@/routes'; 
export function YachtsMatchPageContent() {
    const page = usePage<{
        profileMissing?: boolean;
        is_verified?: boolean;
        status?: string | null;
    }>();

    const profileMissing = page.props.profileMissing ?? false;
    const isVerified = page.props.is_verified ?? false;
    const status = page.props.status ?? null;
    
    const { post, processing } = useForm({});

const handleRequestApproval = () => {
    post(requestApproval());
};

    // If profile exists but is not verified (and not just missing entirely)
    if (!profileMissing && !isVerified) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] p-8">
                <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">Verification Required</h2>
                    <p className="mb-6 text-gray-600">
                        {status === 'rejected' 
                            ? 'Your previous request was rejected. Please update your profile and try again.' 
                            : 'Your profile is not yet verified by an admin. You must be verified to view yacht matches.'}
                    </p>
                    
                    <div className="flex flex-col gap-3">
                        <Button 
                            onClick={handleRequestApproval} 
                            disabled={processing}
                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {processing ? 'Sending Request...' : 'Request Admin Approval'}
                        </Button>
                        
                        <Button 
                            variant="outline" 
                            onClick={() => window.location.href = myProfile()}
                            className="w-full"
                        >
                            Go to Profile
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-350 py-2 sm:py-4">
                    <YachtsMatchGrid />
                </div>
            </div>
        </div>
    );
}