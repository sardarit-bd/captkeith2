import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminWithdrawals() {
    const { requests } = usePage().props;

    const markComplete = (id: string) => {
        if (confirm('Mark this withdrawal as completed?')) {
            router.patch(route('admin.withdrawals.complete', id));
        }
    };

    return (
        <>
            <div className="container mx-auto p-6 lg:py-20!">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Withdrawal Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left">User</th>
                                    <th className="text-left">Role</th>
                                    <th className="text-left">Amount</th>
                                    <th className="text-left">Requested</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req: any) => (
                                    <tr key={req.id}>
                                        <td>{req.user?.name || 'Unknown'}</td>
                                        <td className="capitalize">
                                            {req.profile_type}
                                        </td>
                                        <td>${req.amount}</td>
                                        <td>
                                            {new Date(
                                                req.requested_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    markComplete(req.id)
                                                }
                                            >
                                                Mark Complete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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
