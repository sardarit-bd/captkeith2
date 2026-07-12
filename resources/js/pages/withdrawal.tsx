import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Withdrawal() {
    const { balance, settings, history, bankDetails } = usePage().props as any;
    const [amount, setAmount] = useState('');
    const [bankName, setBankName] = useState(bankDetails?.bank_name || '');
    const [bankAccountHolderName, setBankAccountHolderName] = useState(
        bankDetails?.bank_account_holder_name || '',
    );
    const [bankAccountNumber, setBankAccountNumber] = useState(
        bankDetails?.bank_account_number || '',
    );
    const [bankRoutingNumber, setBankRoutingNumber] = useState(
        bankDetails?.bank_routing_number || '',
    );
    const [processing, setProcessing] = useState(false);

    const fee = amount
        ? (parseFloat(amount) * (settings.fee_percentage / 100)).toFixed(2)
        : '0.00';
    const netAmount = amount
        ? (parseFloat(amount) - parseFloat(fee)).toFixed(2)
        : '0.00';

    const bankDetailsFilled =
        bankName.trim() !== '' &&
        bankAccountHolderName.trim() !== '' &&
        bankAccountNumber.trim() !== '' &&
        bankRoutingNumber.trim() !== '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        router.post(
            '/withdrawal',
            {
                amount,
                bank_name: bankName,
                bank_account_holder_name: bankAccountHolderName,
                bank_account_number: bankAccountNumber,
                bank_routing_number: bankRoutingNumber,
            },
            {
                onFinish: () => setProcessing(false),
                onSuccess: () => setAmount(''),
            },
        );
    };

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

    return (
        <>
            {/* <Head title="Withdrawals" /> */}
            <div className="container mx-auto space-y-6 p-6 lg:pt-20!">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Available Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                ${balance.available_balance}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Earned
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${balance.current_balance}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                ${balance.pending_withdrawal}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Withdrawn
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                ${balance.total_withdrawn}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Request Withdrawal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Amount (Min: ${settings.min_amount})
                                </label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min={settings.min_amount}
                                    max={balance.available_balance}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="mt-1"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium">
                                        Bank Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={bankName}
                                        onChange={(e) =>
                                            setBankName(e.target.value)
                                        }
                                        placeholder="Enter bank name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Account Holder Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={bankAccountHolderName}
                                        onChange={(e) =>
                                            setBankAccountHolderName(
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter account holder name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Account Number
                                    </label>
                                    <Input
                                        type="text"
                                        value={bankAccountNumber}
                                        onChange={(e) =>
                                            setBankAccountNumber(e.target.value)
                                        }
                                        placeholder="Enter account number"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Routing Number
                                    </label>
                                    <Input
                                        type="text"
                                        value={bankRoutingNumber}
                                        onChange={(e) =>
                                            setBankRoutingNumber(e.target.value)
                                        }
                                        placeholder="Enter routing number"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {amount && parseFloat(amount) > 0 && (
                                <div className="space-y-1 rounded-lg bg-slate-50 p-4 text-sm">
                                    <div className="flex justify-between">
                                        <span>
                                            Fee ({settings.fee_percentage}%):
                                        </span>
                                        <span>-${fee}</span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Net Payout:</span>
                                        <span>${netAmount}</span>
                                    </div>
                                </div>
                            )}
                            <Button
                                type="submit"
                                disabled={
                                    processing ||
                                    !amount ||
                                    !bankDetailsFilled ||
                                    parseFloat(amount) >
                                        balance.available_balance ||
                                    parseFloat(amount) < settings.min_amount
                                }
                            >
                                {processing
                                    ? 'Processing...'
                                    : 'Request Withdrawal'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left">Date</th>
                                    <th className="py-2 text-left">Amount</th>
                                    <th className="py-2 text-left">Fee</th>
                                    <th className="py-2 text-left">Net</th>
                                    <th className="py-2 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((req: any) => (
                                    <tr key={req.id} className="border-b">
                                        <td className="py-2">
                                            {req.created_at}
                                        </td>
                                        <td>${req.amount}</td>
                                        <td>-${req.fee}</td>
                                        <td>${req.net_amount}</td>
                                        <td>
                                            <Badge
                                                className={getStatusColor(
                                                    req.status,
                                                )}
                                            >
                                                {req.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                                {history.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="py-4 text-center text-slate-500"
                                        >
                                            No withdrawal history.
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
Withdrawal.layout = {
    breadcrumbs: [
        {
            title: 'Withdrawals',
            href: '/withdrawals',
        },
    ],
    pageHeader: {
        title: 'Withdrawals',
        description:
            'Manage your withdrawal requests and view your transaction history.',
    },
};
