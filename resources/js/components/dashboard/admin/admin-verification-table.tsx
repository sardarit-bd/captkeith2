import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { router } from '@inertiajs/react';

interface VerificationItem {
    id: string;
    user_id: string;
    user?: {
        id: string;
        name: string;
        email: string;
    };
    type: 'captain' | 'deckhand';
    full_name?: string;
    license_type?: string;
    submitted_at?: string;
}

interface AdminVerificationTableProps {
    verifications: VerificationItem[];
}

export function AdminVerificationTable({ verifications }: AdminVerificationTableProps) {
    const handleApprove = (id: string, profileType: 'captain' | 'deckhand') => {
        router.put(`/admin/${profileType}s/${id}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleReject = (id: string, profileType: 'captain' | 'deckhand') => {
        router.put(`/admin/${profileType}s/${id}/reject`, {}, {
            preserveScroll: true,
        });
    };

    const handleViewProfile = (userId: string, profileType: 'captain' | 'deckhand') => {
        router.visit(`/admin/${profileType}s/${userId}/profile`);
    };

    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <h3 className="text-lg font-semibold text-[#0ea5e9]">Credential Verifications</h3>
                    <p className="text-sm text-muted-foreground">Captains and deckhands awaiting license review</p>
                </div>
                <Button variant="link" className="text-[#0ea5e9] hover:text-[#0284c7]" onClick={() => router.visit('/admin/verifications')}>
                    View All
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b bg-muted/50">
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">User</TableHead>
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">Type</TableHead>
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">License/Details</TableHead>
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">Submitted</TableHead>
                        <TableHead className="text-right text-xs font-medium uppercase text-muted-foreground">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {verifications.map((item) => (
                        <TableRow key={item.id} className="border-b last:border-0">
                            <TableCell>
                                <div className="font-medium text-[#0ea5e9]">
                                    {item.full_name || item.user?.name || 'Unknown User'}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className="capitalize">
                                    {item.type}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {item.license_type || 'N/A'}
                            </TableCell>
                            <TableCell>
                                {item.submitted_at ? new Date(item.submitted_at).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
                                        onClick={() => handleViewProfile(item.id, item.type)}
                                    >
                                        View Profile
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="bg-[#0ea5e9] hover:bg-[#0284c7]"
                                        onClick={() => handleApprove(item.id, item.type)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-50"
                                        onClick={() => handleReject(item.id, item.type)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {verifications.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                No pending verifications
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}