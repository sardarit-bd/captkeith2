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

interface Vessel {
    id: string;
    name: string;
    vessel_type: string;
    status?: 'pending' | 'approved' | 'rejected' | 'inactive';
    owner?: {
        name: string;
        email: string;
    };
    submitted_at?: string;
}

interface AdminVesselTableProps {
    vessels: Vessel[];
}

export function AdminVesselTable({ vessels }: AdminVesselTableProps) {
    const getStatusBadge = (status?: string) => {
        const safeStatus = status || 'inactive';
        const variants: Record<string, string> = {
            pending: 'bg-yellow-500',
            approved: 'bg-green-500',
            rejected: 'bg-red-500',
            inactive: 'bg-gray-500',
        };

        return (
            <Badge className={variants[safeStatus] || 'bg-gray-500'}>
                {safeStatus.charAt(0).toUpperCase() + safeStatus.slice(1)}
            </Badge>
        );
    };

    const handleApprove = (vesselId: string) => {
        router.put(`/admin/vessels/${vesselId}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleReject = (vesselId: string) => {
        router.put(`/admin/vessels/${vesselId}/reject`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Vessel Info</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vessels.map((vessel) => (
                        <TableRow key={vessel.id}>
                            <TableCell>
                                <div className="font-medium">{vessel.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    {vessel.vessel_type}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="font-medium">{vessel.owner?.name || 'Unknown'}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {vessel.owner?.email || 'No email'}
                                    </div>
                                    {/* Status badge in owner card */}
                                    <div className="mt-1">
                                        {getStatusBadge(vessel.status)}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm text-muted-foreground">
                                    Location info
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {vessel.status === 'pending' && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="default"
                                                className="bg-green-600 hover:bg-green-700"
                                                onClick={() => handleApprove(vessel.id)}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleReject(vessel.id)}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {vessels.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                No pending vessels
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}