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
import { MapPin } from 'lucide-react';

interface PendingVessel {
    id: string | number;
    name: string;
    vessel_type: string;
    owner?: {
        name: string;
        email: string;
    };
    location?: string;
    home_port?: string;
}

interface AdminVesselsTableProps {
    vessels: PendingVessel[];
}

export default function AdminVesselsTable({ vessels }: AdminVesselsTableProps) {
    const handleApproveVessel = (vesselId: string | number) => {
        router.patch(`/admin/vessels/${vesselId}/approve`, {}, {
            preserveScroll: true,
        });
    };

    const handleRejectVessel = (vesselId: string | number) => {
        router.patch(`/admin/vessels/${vesselId}/reject`, {}, {
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
                    <h3 className="text-lg font-semibold text-[#0ea5e9]">Pending Vessel Listings</h3>
                    <p className="text-sm text-muted-foreground">Yachts waiting for platform approval</p>
                </div>
                <Button variant="link" className="text-[#0ea5e9] hover:text-[#0284c7]" onClick={() => router.visit('/admin/vessel-inventory')}>
                    View All
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="border-b bg-muted/50">
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">Vessel Info</TableHead>
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">Owner</TableHead>
                        <TableHead className="text-xs font-medium uppercase text-muted-foreground">Location</TableHead>
                        <TableHead className="text-right text-xs font-medium uppercase text-muted-foreground">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vessels.map((vessel) => (
                        <TableRow key={vessel.id} className="border-b last:border-0">
                            <TableCell>
                                <div>
                                    <div className="font-medium text-[#0ea5e9]">{vessel.name}</div>
                                    {/* <div className="text-sm text-gray-500">{vessel.vessel_type || 'Sailing'}</div> */}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div>{vessel.owner?.name || 'Unknown'}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {/* <MapPin className="h-3 w-3 text-gray-400" />     */}
                                    <span className="text-sm text-gray-600">
                                        {vessel.location || vessel.home_port || 'Location not set'}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                        <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white"
                                        onClick={() => handleViewProfile(vessel.id, vessel.type)}
                                    >
                                        View Profile
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        className="bg-[#0ea5e9] hover:bg-[#0284c7]"
                                        onClick={() => handleApproveVessel(vessel.id)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-500 text-red-500 hover:bg-red-50"
                                        onClick={() => handleRejectVessel(vessel.id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {vessels.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                No pending vessels found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}