import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminWithdrawals() {
    const { requests } = usePage().props as any;
    console.log('Withdrawal Requests:', requests);
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const markComplete = (id: string) => {
        if (confirm('Mark this withdrawal as completed?')) {
            router.patch(
                `/admin/withdrawals/${id}/complete`,
                {},
                { preserveScroll: true },
            );
        }
    };

    const cancelRequest = (id: string) => {
        if (confirm('Cancel this withdrawal request?')) {
            router.patch(
                `/admin/withdrawals/${id}/status`,
                { status: 'cancelled' },
                { preserveScroll: true },
            );
        }
    };

    return (
        <>
            <div className="container mx-auto p-6 lg:py-20!">
                <Card>
                    <CardHeader>
                        <CardTitle>Withdrawal Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left">User</th>
                                    <th className="text-left">Role</th>
                                    <th className="text-left">Amount</th>
                                    <th className="text-left">Bank Details</th>
                                    <th className="text-left">Requested</th>
                                    <th className="text-left">Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req: any) => (
                                    <tr key={req.id} className="border-b">
                                        <td>{req.user_name}</td>
                                        <td className="capitalize">
                                            {req.profile_type}
                                        </td>
                                        <td>${req.amount}</td>
                                        <td className="py-2">
                                            <div>{req.bank_name}</div>
                                            <div className="text-xs text-slate-500">
                                                {req.bank_account_holder_name}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Acc: {req.bank_account_number}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                Routing:{' '}
                                                {req.bank_routing_number}
                                            </div>
                                        </td>
                                        <td>
                                            {req.requested_at
                                                ? new Date(
                                                      req.requested_at,
                                                  ).toLocaleDateString()
                                                : '-'}
                                        </td>
                                        <td>
                                            <Badge
                                                className={getStatusColor(
                                                    req.status,
                                                )}
                                            >
                                                {req.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            {req.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() =>
                                                            markComplete(req.id)
                                                        }
                                                    >
                                                        Mark Complete
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            cancelRequest(
                                                                req.id,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {requests.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-4 text-center text-slate-500"
                                        >
                                            No withdrawal requests.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminWithdrawals.layout = {
    breadcrumbs: [
        {
            title: 'withdrawals requests',
            href: '/admin/withdrawals',
        },
    ],
    pageHeader: {
        title: 'Withdrawals Requests',
        description:
            "Welcome back! Here's an overview of your current activities.",
    },
};
