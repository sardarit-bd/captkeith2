import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PageProps } from '@/types';

interface DeckhandProfile {
    id: string;
    user_id: string;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    years_experience: number;
    has_server_experience: boolean;
    has_bartending_experience: boolean;
    hourly_rate: number;
    status: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    resume_path?: string;
    photo_path?: string;
}

interface DeckhandProfilePageProps extends PageProps {
    deckhand: DeckhandProfile;
}

export default function DeckhandProfile({ deckhand }: DeckhandProfilePageProps) {
    const handleApprove = () => {
        router.put(`/admin/deckhands/${deckhand.id}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleReject = () => {
        router.put(`/admin/deckhands/${deckhand.id}/reject`, {}, {
            preserveScroll: true,
        });
    };

    const handleBack = () => {
        router.visit('/admin/verifications');
    };

    return (
        <AppLayout>
            {/* <Head title={`Deckhand Profile - ${deckhand.full_name}`} /> */}
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl space-y-6 py-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-[#0ea5e9]">Deckhand Profile</h1>
                                <p className="text-sm text-muted-foreground">Review deckhand credentials and information</p>
                            </div>
                            <Button variant="outline" onClick={handleBack}>
                                Back to Verifications
                            </Button>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-4">
                            <Badge 
                                variant={deckhand.status === 'approved' ? 'default' : deckhand.status === 'rejected' ? 'destructive' : 'secondary'}
                                className="text-sm"
                            >
                                Status: {deckhand.status.charAt(0).toUpperCase() + deckhand.status.slice(1)}
                            </Badge>
                            {deckhand.is_verified && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                    Verified
                                </Badge>
                            )}
                        </div>

                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Basic details about the deckhand</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                        <p className="text-base">{deckhand.full_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                                        <p className="text-base">{deckhand.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                        <p className="text-base">{deckhand.phone || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Address</p>
                                        <p className="text-base">
                                            {deckhand.address}, {deckhand.city}, {deckhand.state} {deckhand.zip_code}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Experience & Skills */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Experience & Skills</CardTitle>
                                <CardDescription>Work experience and special skills</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Years of Experience</p>
                                        <p className="text-base">{deckhand.years_experience} years</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Server Experience</p>
                                        <Badge variant={deckhand.has_server_experience ? 'default' : 'secondary'}>
                                            {deckhand.has_server_experience ? 'Yes' : 'No'}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Bartending Experience</p>
                                        <Badge variant={deckhand.has_bartending_experience ? 'default' : 'secondary'}>
                                            {deckhand.has_bartending_experience ? 'Yes' : 'No'}
                                        </Badge>
                                    </div>
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
                                       <p className="text-base">${deckhand.hourly_rate ? Number(deckhand.hourly_rate).toFixed(2) : '0.00'}/hour</p>
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
                                {deckhand.resume_path && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Resume/CV</p>
                                            <p className="text-sm text-muted-foreground">Professional resume</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={deckhand.resume_path} target="_blank" rel="noopener noreferrer">
                                                View Document
                                            </a>
                                        </Button>
                                    </div>
                                )}
                                {deckhand.photo_path && (
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div>
                                            <p className="font-medium">Photo</p>
                                            <p className="text-sm text-muted-foreground">Profile photograph</p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={deckhand.photo_path} target="_blank" rel="noopener noreferrer">
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
                                        <p className="text-base">{new Date(deckhand.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                        <p className="text-base">{new Date(deckhand.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        {deckhand.status === 'pending' && (
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
        </AppLayout>
    );
}



DeckhandProfile.layout = {
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