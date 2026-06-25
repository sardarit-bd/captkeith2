import { usePage, useForm, router } from '@inertiajs/react';
import { YachtsMatchGrid } from './yachts-match-grid';
import { Button } from '@/components/ui/button';
import { requestApproval } from '@/routes/my-profile';
import { Toaster } from '../ui/sonner';
import { useEffect } from 'react';

type VerificationStatus = 'pending' | 'approved' | 'rejected' | null;

interface PageProps {
    auth: {
        user: {
            captain_profile?: {
                is_verified: VerificationStatus;
            } | null;
            deckhand_profile?: {
                is_verified: VerificationStatus;
            } | null;
        };
    };
}

export function YachtsMatchPageContent() {
    const page = usePage<PageProps>();
    const isVerified = page.props.auth?.user?.captain_profile?.is_verified || page.props.auth?.user?.deckhand_profile?.is_verified ||null;
    const flash =page.props.flash;
    const { post, processing } = useForm({});
    let error=null;
    const handleRequestApproval = () => {
        console.log(requestApproval.url());
        try {
              const result=post(requestApproval.url());
                
        } catch (error) {
           alert("Something went wrong. Please try again.");
        }
      
    };
    useEffect(() => {
       if(flash?.error){
        error=flash?.error;

       }
    },[flash]);
    if (isVerified !== 'approved') {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center bg-[#F6FDFF] p-8">
                <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-sm">
                    {isVerified === 'pending' && (
                        <>
                             <p className="text-sm text-red-500">{flash?.error}</p>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">Approval Pending</h2>
                            
                       
                            <p className="text-gray-600">
                                Your request has been sent and is currently being reviewed by an admin.
                                We&apos;ll notify you once a decision is made.
                            </p>
                        </>
                    )}

                    {isVerified === 'rejected' && (
                        <>
                         <p className="text-sm text-red-500">{flash?.error}</p>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">Request Rejected</h2>
                            <p className="mb-6 text-gray-600">
                                The admin rejected your request. Please update your profile and request again.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleRequestApproval}
                                    disabled={processing}
                                    className="w-full bg-[#35AED5] text-white hover:bg-[#35AED5]/70"
                                >
                                    {processing ? 'Sending Request...' : 'Request Admin Approval'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => (router.visit("/my-profile"))}
                                    className="w-full"
                                >
                                    Go to Profile
                                </Button>
                            </div>
                        </>
                    )}

                    {isVerified === null && (
                        <>
                        <p className="text-sm text-red-500">{flash?.error}</p>
                            <h2 className="mb-2 text-2xl font-bold text-gray-900">Verification Required</h2>
                            <p className="mb-6 text-gray-600">
                                Your profile is not yet verified by an admin. You must be verified to view yacht matches.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleRequestApproval}
                                    disabled={processing}
                                    className="w-full bg-[#35AED5] text-white hover:bg-[#35AED5]/70"
                                >
                                    {processing ? 'Sending Request...' : 'Request Admin Approval'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => (router.visit("/my-profile"))}
                                    className="w-full"
                                >
                                    Go to Profile
                                </Button>
                            </div>
                        </>
                    )}
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