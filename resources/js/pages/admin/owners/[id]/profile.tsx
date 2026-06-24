import { Head, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Loader2, Ship, Calendar, User } from 'lucide-react';

interface OwnerProfilePageProps extends PageProps {
    user: {
        id: string;
        name: string;
        email: string;
        status: string;
        created_at: string;
    };
    ownerProfile: {
        id: string;
        full_name: string;
        phone?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        date_of_birth?: string;
        marina_name?: string;
        marina_city?: string;
        marina_state?: string;
        photo_path?: string;
        vessels_count: number;
    };
    yachts: {
        id: string;
        name: string;
        make?: string;
        model?: string;
        length_ft?: number;
        vessel_type?: string;
        status?: string;
        marina_name?: string;
    }[];
}

export default function OwnerProfile({ user, ownerProfile, yachts }: OwnerProfilePageProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        full_name: ownerProfile.full_name || '',
        phone: ownerProfile.phone || '',
        address: ownerProfile.address || '',
        city: ownerProfile.city || '',
        state: ownerProfile.state || '',
        zip: ownerProfile.zip || '',
        country: ownerProfile.country || '',
        date_of_birth: ownerProfile.date_of_birth || '',
        

        marina_name: ownerProfile.marina_name || '',
        marina_city: ownerProfile.marina_city || '',
        marina_state: ownerProfile.marina_state || '',
        email: user.email,
        password: '',
        password_confirmation: '',
        status: user.status,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        router.put(`/admin/owners/${user.id}/update`, {
            onSuccess: () => {
                toast.success('Owner profile updated successfully');
                reset('password', 'password_confirmation');
            },
            onError: (error) => {
                toast.error('Failed to update owner profile');
            },
        })
    };

    const handleBack = () => {
        router.get(route('admin.users'));
    };

    return (
        <>
            <Head title={`Owner Profile - ${ownerProfile.full_name}`} />
            
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
                                <h1 className="text-2xl font-bold text-[#35ADD5]">Owner Profile</h1>
                                <p className="text-sm text-slate-600">Manage owner information and account settings</p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="mb-6 grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Yachts Listed</CardTitle>
                                    <Ship className="h-4 w-4 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{ownerProfile.vessels_count}</div>
                                    <p className="text-xs text-slate-500">Total vessels</p>
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

                        <form onSubmit={handleSave}>
                            {/* Personal Information Section */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update the owner's personal details</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name">Full Name</Label>
                                        <Input id="full_name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className={errors.full_name ? 'border-red-500' : ''} />
                                        {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={errors.phone ? 'border-red-500' : ''} />
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date_of_birth">Date of Birth</Label>
                                        <Input id="date_of_birth" type="date" value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} className={errors.date_of_birth ? 'border-red-500' : ''} />
                                        {errors.date_of_birth && <p className="text-xs text-red-500">{errors.date_of_birth}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input id="country" value={data.country} onChange={(e) => setData('country', e.target.value)} className={errors.country ? 'border-red-500' : ''} />
                                        {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} className={errors.address ? 'border-red-500' : ''} />
                                        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} className={errors.city ? 'border-red-500' : ''} />
                                        {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" value={data.state} onChange={(e) => setData('state', e.target.value)} className={errors.state ? 'border-red-500' : ''} />
                                        {errors.state && <p className="text-xs text-red-500">{errors.state}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" value={data.zip} onChange={(e) => setData('zip', e.target.value)} className={errors.zip ? 'border-red-500' : ''} />
                                        {errors.zip && <p className="text-xs text-red-500">{errors.zip}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Marina Information Section */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Marina Information</CardTitle>
                                    <CardDescription>Update the owner's marina details</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="marina_name">Marina Name</Label>
                                        <Input id="marina_name" value={data.marina_name} onChange={(e) => setData('marina_name', e.target.value)} className={errors.marina_name ? 'border-red-500' : ''} />
                                        {errors.marina_name && <p className="text-xs text-red-500">{errors.marina_name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="marina_city">Marina City</Label>
                                        <Input id="marina_city" value={data.marina_city} onChange={(e) => setData('marina_city', e.target.value)} className={errors.marina_city ? 'border-red-500' : ''} />
                                        {errors.marina_city && <p className="text-xs text-red-500">{errors.marina_city}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="marina_state">Marina State</Label>
                                        <Input id="marina_state" value={data.marina_state} onChange={(e) => setData('marina_state', e.target.value)} className={errors.marina_state ? 'border-red-500' : ''} />
                                        {errors.marina_state && <p className="text-xs text-red-500">{errors.marina_state}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Account Settings Section */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Update account credentials and status</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={errors.email ? 'border-red-500' : ''} />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                                        <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className={errors.password ? 'border-red-500' : ''} />
                                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Confirm New Password</Label>
                                        <Input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
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
                                        {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Owner's Yachts Section */}
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Owner's Yachts</CardTitle>
                                    <CardDescription>List of yachts owned by this owner</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {yachts && yachts.length > 0 ? (
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {yachts.map((yacht) => (
                                                <Card key={yacht.id}>
                                                    <CardHeader className="pb-2">
                                                        <CardTitle className="text-base">{yacht.name}</CardTitle>
                                                        <CardDescription className="line-clamp-1">
                                                            {yacht.make} {yacht.model}
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="pb-2">
                                                        <div className="text-sm text-slate-600 space-y-1">
                                                            <p><span className="font-medium">Type:</span> {yacht.vessel_type || 'N/A'}</p>
                                                            <p><span className="font-medium">Length:</span> {yacht.length_ft ? `${yacht.length_ft} ft` : 'N/A'}</p>
                                                            <p><span className="font-medium">Status:</span> <span className="capitalize">{yacht.status || 'N/A'}</span></p>
                                                            <p><span className="font-medium">Marina:</span> {yacht.marina_name || 'N/A'}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500">No yachts found for this owner.</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Save Button */}
                            <div className="flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={handleBack}>Cancel</Button>
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
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

OwnerProfile.layout = {
    breadcrumbs: [
        {
            title: 'Users Directory',
            href: '/admin/users',
        },
        {
            title: 'Owner Profile',
            href: '#',
        },
    ],
    pageHeader: {
        title: 'Owner Profile',
        description: 'Manage owner information and account settings',
    },
};