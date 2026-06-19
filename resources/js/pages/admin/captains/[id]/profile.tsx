import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageProps } from '@/types';

interface CaptainProfile {
    id: string;
    user_id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    license_type: string;
    endorsement: string;
    tonnage_rating: string;
    years_experience: number;
    boats_worked_on: string;
    bodies_of_water: string;
    geographic_area: string;
    hourly_rate: number;
    status: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    resume_path?: string;
    license_doc_path?: string;
    photo_path?: string;
}

interface CaptainProfilePageProps extends PageProps {
    captain: CaptainProfile;
}

export default function CaptainProfile({ captain }: CaptainProfilePageProps) {
    const handleApprove = () => {
        router.put(`/admin/captains/${captain.id}/approve`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally redirect or show success message
            },
        });
    };

    const handleReject = () => {
        router.put(`/admin/captains/${captain.id}/reject`, {}, {
            preserveScroll: true,
        });
    };

    const handleBack = () => {
        router.visit('/admin/verifications');
    };

    return (
        <>
            <Head title={`Captain Profile - ${captain.full_name}`} />
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl space-y-6 py-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-[#0ea5e9]">Captain Profile</h1>
                                <p className="text-sm text-muted-foreground">Review captain credentials and information</p>
                            </div>
                            <Button variant="outline" onClick={handleBack}>
                                Back to Verifications
                            </Button>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-4">
                            <Badge 
                                variant={captain.status === 'approved' ? 'default' : captain.status === 'rejected' ? 'destructive' : 'secondary'}
                                className="text-sm"
                            >
                                Status: {captain.status.charAt(0).toUpperCase() + captain.status.slice(1)}
                            </Badge>
                            {captain.is_verified && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                    Verified
                                </Badge>
                            )}
                        </div>

                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Basic details about the captain</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                        <p className="text-base">{captain.full_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="text-base">{captain.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{captain.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                                        <p className="text-base">
                                            {captain.address}, {captain.city}, {captain.state} {captain.zip_code}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* License & Certification */}
                        <Card>
                            <CardHeader>
                                <CardTitle>License & Certification</CardTitle>
                                <CardDescription>Captain's license details and certifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">License Type</p>
                                        <p className="text-base">{captain.license_type || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Endorsement</p>
                                        <p className="text-base">{captain.endorsement || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Tonnage Rating</p>
                                        <p className="text-base">{captain.tonnage_rating || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Years of Experience</p>
                                        <p className="text-base">{captain.years_experience} years</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work Experience */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Work Experience</CardTitle>
                                <CardDescription>Previous work history and areas of operation</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Boats Worked On</p>
                                    <p className="text-base">{captain.boats_worked_on || 'Not provided'}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Bodies of Water</p>
                                    <p className="text-base">{captain.bodies_of_water || 'Not provided'}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Geographic Area</p>
                                    <p className="text-base">{captain.geographic_area || 'Not provided'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rate Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rate Information</CardTitle>
                                <CardDescription>Hourly rate and pricing details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Hourly Rate</p>
                                        <p className="text-base">${captain.hourly_rate ? Number(captain.hourly_rate).toFixed(2) : '0.00'}/hour</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Documents</CardTitle>
                                <CardDescription>Uploaded documents and certifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {captain.license_doc_path && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">License Document</p>
                                            <p className="text-sm text-muted-foreground">Official license certification</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={captain.license_doc_path} target="_blank" rel="noopener noreferrer">
                                                View Document
                                            </a>
                                        </Button>
                                    </div>
                                )}
                                {captain.resume_path && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Resume/CV</p>
                                            <p className="text-sm text-muted-foreground">Professional resume</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={captain.resume_path} target="_blank" rel="noopener noreferrer">
                                                View Document
                                            </a>
                                        </Button>
                                    </div>
                                )}
                                {captain.photo_path && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Photo</p>
                                            <p className="text-sm text-muted-foreground">Profile photograph</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={captain.photo_path} target="_blank" rel="noopener noreferrer">
                                                View Photo
                                            </a>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Application Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Application Details</CardTitle>
                                <CardDescription>Submission and review information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                                        <p className="text-base">{new Date(captain.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                        <p className="text-base">{new Date(captain.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {captain.status === 'pending' && (
                            <div className="flex justify-end gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                    onClick={handleReject}
                                >
                                    Reject Application
                                </Button>
                                <Button
                                    className="bg-[#0ea5e9] hover:bg-[#0284c7]"
                                    onClick={handleApprove}
                                >
                                    Approve Application
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
CaptainProfile.layout = {
    breadcrumbs: [
        {
            title: 'My Profile',
            href: '/admin/deckhands',
        },
    ],
    pageHeader: {
        title: 'My Profile',
        description: 'Manage your personal information and security preferences.',
    },
};