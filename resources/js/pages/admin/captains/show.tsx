import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

interface CaptainShowProps {
    captain: {
        id: string;
        user_id: string;
        full_name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zip_code: string;
        license_type: string;
        endorsement: string;
        tonnage_rating: number;
        years_experience: number;
        hourly_rate: number;
        status: 'pending' | 'approved' | 'rejected';
        is_verified: boolean;
        resume_path: string | null;
        license_doc_path: string | null;
        photo_path: string | null;
        created_at: string;
        updated_at: string;
    };
}

export default function CaptainShow({ captain }: CaptainShowProps) {
    const handleApprove = () => {
        router.patch(`/admin/captains/${captain.id}/approve`, {}, {
            onSuccess: () => {
                // Success handled by Inertia
            },
        });
    };

    const handleReject = () => {
        router.patch(`/admin/captains/${captain.id}/reject`, {}, {
            onSuccess: () => {
                // Success handled by Inertia
            },
        });
    };

    const getStatusBadge = () => {
        const variants = {
            pending: 'bg-yellow-500',
            approved: 'bg-green-500',
            rejected: 'bg-red-500',
        };

        return (
            <Badge className={variants[captain.status as keyof typeof variants] || 'bg-gray-500'}>
                {captain.status.charAt(0).toUpperCase() + captain.status.slice(1)}
            </Badge>
        );
    };

    return (
        <>
            {/* <Head title={`Captain Profile - ${captain.full_name}`} /> */}
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.visit('/dashboard')}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{captain.full_name}</h1>
                        <p className="text-muted-foreground">Captain Profile</p>
                    </div>
                    <div className="flex gap-2">
                        {getStatusBadge()}
                        {captain.is_verified && (
                            <Badge variant="secondary" className="bg-blue-500">
                                Verified
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Full Name
                                </label>
                                <p className="mt-1">{captain.full_name}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Email
                                </label>
                                <p className="mt-1">{captain.email}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Phone
                                </label>
                                <p className="mt-1">{captain.phone}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Address
                                </label>
                                <p className="mt-1">
                                    {captain.address}<br />
                                    {captain.city}, {captain.state} {captain.zip_code}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* License & Qualifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>License & Qualifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    License Type
                                </label>
                                <p className="mt-1">{captain.license_type}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Endorsement
                                </label>
                                <p className="mt-1">{captain.endorsement}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Tonnage Rating
                                </label>
                                <p className="mt-1">{captain.tonnage_rating} tons</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Years of Experience
                                </label>
                                <p className="mt-1">{captain.years_experience} years</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rate Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Rate Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Hourly Rate
                                </label>
                                <p className="mt-1 text-2xl font-bold">
                                    ${captain.hourly_rate}/hour
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Documents */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Documents</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {captain.resume_path && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Resume
                                    </label>
                                    <div className="mt-1">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={captain.resume_path} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {captain.license_doc_path && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        License Document
                                    </label>
                                    <div className="mt-1">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={captain.license_doc_path} target="_blank" rel="noopener noreferrer">
                                                View License
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                {captain.status === 'pending' && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Approval Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4">
                                <Button
                                    onClick={handleApprove}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Approve Captain
                                </Button>
                                <Button
                                    onClick={handleReject}
                                    variant="destructive"
                                >
                                    Reject Captain
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

CaptainShow.layout = {
    breadcrumbs: [
        {
            title: 'My Profile',
            href: '/captains/[id]',
        },
    ],
    pageHeader: {
        title: 'My Profile',
        description: 'Manage your personal information and security preferences. yoyo',
    },
};