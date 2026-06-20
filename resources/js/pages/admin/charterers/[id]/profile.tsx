import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Save, Loader2, Calendar, User, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface ChartererProfilePageProps extends PageProps {
    user: {
        id: string;
        name: string;
        email: string;
        status: string;
        created_at: string;
    };
    chartererProfile: {
        id: string;
        full_name: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        date_of_birth?: string;
        total_charters?: number;
    };
}

export default function ChartererProfile({ user, chartererProfile }: ChartererProfilePageProps) {
    const [activeTab, setActiveTab] = useState<'personal' | 'account'>('personal');

    const { data, setData, put, processing, errors, reset } = useForm({
        // Personal Information
        full_name: chartererProfile.full_name || '',
        phone: chartererProfile.phone || '',
        address: chartererProfile.address || '',
        city: chartererProfile.city || '',
        state: chartererProfile.state || '',
        zip: chartererProfile.zip || '',
        country: chartererProfile.country || '',
        date_of_birth: chartererProfile.date_of_birth || '',
        
        // Account Information
        email: user.email,
        password: '',
        password_confirmation: '',
        status: user.status,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(route('admin.charterers.update', user.id), {
            onSuccess: () => {
                toast.success('Charterer profile updated successfully');
                reset('password', 'password_confirmation');
            },
            onError: (error) => {
                toast.error('Failed to update charterer profile');
            },
        });
    };

    const handleBack = () => {
        router.get(route('admin.users'));
    };

    return (
        <>
            {/* <Head title={`Charterer Profile - ${chartererProfile.full_name}`} /> */}
            
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl py-6">
                        {/* Header */}
                        <div className="mb-6 flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleBack}
                                className="h-10 w-10"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-[#35ADD5]">Charterer Profile</h1>
                                <p className="text-sm text-slate-600">Manage charterer information and account settings</p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="mb-6 grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Charters</CardTitle>
                                    <CreditCard className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{chartererProfile.total_charters || 0}</div>
                                    <p className="text-xs text-slate-500">Completed charters</p>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                                    <Calendar className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {new Date(user.created_at).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            year: 'numeric' 
                                        })}
                                    </div>
                                    <p className="text-xs text-slate-500">Registration date</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                                    <User className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold capitalize">{user.status}</div>
                                    <p className="text-xs text-slate-500">Current status</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tab Navigation */}
                        <div className="mb-6 flex gap-2 border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === 'personal'
                                        ? 'border-b-2 border-[#35ADD5] text-[#35ADD5]'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Personal Information
                            </button>
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${
                                    activeTab === 'account'
                                        ? 'border-b-2 border-[#35ADD5] text-[#35ADD5]'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                Account Settings
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSave}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {activeTab === 'personal' && 'Personal Information'}
                                        {activeTab === 'account' && 'Account Settings'}
                                    </CardTitle>
                                    <CardDescription>
                                        {activeTab === 'personal' && "Update the charterer's personal details"}
                                        {activeTab === 'account' && "Update account credentials and status"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Personal Information Tab */}
                                    {activeTab === 'personal' && (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="full_name">Full Name</Label>
                                                <Input
                                                    id="full_name"
                                                    value={data.full_name}
                                                    onChange={(e) => setData('full_name', e.target.value)}
                                                    className={errors.full_name ? 'border-red-500' : ''}
                                                />
                                                {errors.full_name && (
                                                    <p className="text-xs text-red-500">{errors.full_name}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input
                                                    id="phone"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    className={errors.phone ? 'border-red-500' : ''}
                                                />
                                                {errors.phone && (
                                                    <p className="text-xs text-red-500">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="date_of_birth">Date of Birth</Label>
                                                <Input
                                                    id="date_of_birth"
                                                    type="date"
                                                    value={data.date_of_birth}
                                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                                    className={errors.date_of_birth ? 'border-red-500' : ''}
                                                />
                                                {errors.date_of_birth && (
                                                    <p className="text-xs text-red-500">{errors.date_of_birth}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Input
                                                    id="country"
                                                    value={data.country}
                                                    onChange={(e) => setData('country', e.target.value)}
                                                    className={errors.country ? 'border-red-500' : ''}
                                                />
                                                {errors.country && (
                                                    <p className="text-xs text-red-500">{errors.country}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="address">Address</Label>
                                                <Input
                                                    id="address"
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    className={errors.address ? 'border-red-500' : ''}
                                                />
                                                {errors.address && (
                                                    <p className="text-xs text-red-500">{errors.address}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    value={data.city}
                                                    onChange={(e) => setData('city', e.target.value)}
                                                    className={errors.city ? 'border-red-500' : ''}
                                                />
                                                {errors.city && (
                                                    <p className="text-xs text-red-500">{errors.city}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    value={data.state}
                                                    onChange={(e) => setData('state', e.target.value)}
                                                    className={errors.state ? 'border-red-500' : ''}
                                                />
                                                {errors.state && (
                                                    <p className="text-xs text-red-500">{errors.state}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="zip">ZIP Code</Label>
                                                <Input
                                                    id="zip"
                                                    value={data.zip}
                                                    onChange={(e) => setData('zip', e.target.value)}
                                                    className={errors.zip ? 'border-red-500' : ''}
                                                />
                                                {errors.zip && (
                                                    <p className="text-xs text-red-500">{errors.zip}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Account Settings Tab */}
                                    {activeTab === 'account' && (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    className={errors.email ? 'border-red-500' : ''}
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-red-500">{errors.email}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    className={errors.password ? 'border-red-500' : ''}
                                                />
                                                {errors.password && (
                                                    <p className="text-xs text-red-500">{errors.password}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    value={data.password_confirmation}
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="status">Account Status</Label>
                                                <select
                                                    id="status"
                                                    value={data.status}
                                                    onChange={(e) => setData('status', e.target.value)}
                                                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35ADD5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Suspended">Suspended</option>
                                                    <option value="Pending Review">Pending Review</option>
                                                </select>
                                                {errors.status && (
                                                    <p className="text-xs text-red-500">{errors.status}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <Separator className="my-4" />

                                    <div className="flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleBack}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            {processing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="mr-2 h-4 w-4" />
                                                    Save Changes
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

ChartererProfile.layout = {
    breadcrumbs: [
        {
            title: 'Users Directory',
            href: '/admin/users',
        },
        {
            title: 'Charterer Profile',
            href: '#',
        },
    ],
    pageHeader: {
        title: 'Charterer Profile',
        description: 'Manage charterer information and account settings',
    },
};