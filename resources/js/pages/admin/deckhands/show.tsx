import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';

interface DeckhandShowProps {
    deckhand: {
        id: string;
        user_id: string;
        full_name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zip_code: string;
        years_experience: number;
        hourly_rate: number;
        has_server_experience: boolean;
        has_bartending_experience: boolean;
        status: 'pending' | 'approved' | 'rejected';
        resume_path: string | null;
        photo_path: string | null;
        created_at: string;
        updated_at: string;
    };
}

export default function DeckhandShow({ deckhand }: DeckhandShowProps) {
    const handleApprove = () => {
        router.put(`/admin/deckhands/${deckhand.id}/approve`, {}, {
            onSuccess: () => {
                // Success handled by Inertia
            },
        });
    };

    const handleReject = () => {
        router.put(`/admin/deckhands/${deckhand.id}/reject`, {}, {
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
            <Badge className={variants[deckhand.status as keyof typeof variants] || 'bg-gray-500'}>
                {deckhand.status.charAt(0).toUpperCase() + deckhand.status.slice(1)}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title={`Deckhand Profile - ${deckhand.full_name}`} />
            
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
                        <h1 className="text-3xl font-bold">{deckhand.full_name}</h1>
                        <p className="text-muted-foreground">Deckhand Profile</p>
                    </div>
                    <div>{getStatusBadge()}</div>
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
                                <p className="mt-1">{deckhand.full_name}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Email
                                </label>
                                <p className="mt-1">{deckhand.email}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Phone
                                </label>
                                <p className="mt-1">{deckhand.phone}</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Address
                                </label>
                                <p className="mt-1">
                                    {deckhand.address}<br />
                                    {deckhand.city}, {deckhand.state} {deckhand.zip_code}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Experience & Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Experience & Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Years of Experience
                                </label>
                                <p className="mt-1">{deckhand.years_experience} years</p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Server Experience
                                </label>
                                <p className="mt-1">
                                    <Badge variant={deckhand.has_server_experience ? 'default' : 'secondary'}>
                                        {deckhand.has_server_experience ? 'Yes' : 'No'}
                                    </Badge>
                                </p>
                            </div>
                            <Separator />
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">
                                    Bartending Experience
                                </label>
                                <p className="mt-1">
                                    <Badge variant={deckhand.has_bartending_experience ? 'default' : 'secondary'}>
                                        {deckhand.has_bartending_experience ? 'Yes' : 'No'}
                                    </Badge>
                                </p>
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
                                    ${deckhand.hourly_rate}/hour
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
                            {deckhand.resume_path && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                        Resume
                                    </label>
                                    <div className="mt-1">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={deckhand.resume_path} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Actions */}
                {deckhand.status === 'pending' && (
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
                                    Approve Deckhand
                                </Button>
                                <Button
                                    onClick={handleReject}
                                    variant="destructive"
                                >
                                    Reject Deckhand
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}