import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, FileText, MapPin, Ship, User, Anchor } from 'lucide-react';

interface Vessel {
    id: string;
    name: string;
    official_number: string;
    make: string;
    model: string;
    length_ft: string;
    beam_ft: string;
    draft_ft: string;
    vessel_type: string;
    marina_name: string;
    marina_address: string;
    marina_city: string;
    marina_state: string;
    marina_zip: string;
    operating_area: string;
    requires_deckhand: boolean;
    required_license_type: string;
    required_endorsement: string;
    required_tonnage_rating: number;
    required_years_experience: number;
    is_active: boolean;
    status: string;
    passenger_capacity: number;
    owner_profile?: {
        id: string;
        full_name: string;
        user: {
            id: string;
            name: string;
            email: string;
        };
    };
    // Changed to any[] to avoid strict typing issues with the unknown property name
    photos: any[]; 
}

interface Document {
    name: string;
    url: string;
}

interface Props {
    vessel: Vessel;
    documents: Document[];
}

export default function VesselShow({ vessel, documents }: Props) {
    // Determine badge color based on status
    const statusColor = vessel.status === 'approved' || vessel.is_active 
        ? 'bg-green-100 text-green-800' 
        : vessel.status === 'pending' || vessel.status === 'pending_approval' 
        ? 'bg-yellow-100 text-yellow-800' 
        : 'bg-red-100 text-red-800';

    return (
        <>
            {/* <Head title={`Vessel Details - ${vessel.name}`} /> */}
            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto w-full max-w-7xl space-y-6">
                        
                        {/* Header Section */}
                        <div className="flex items-center gap-4">
                            <Link href="/admin/vessel-inventory" className="text-slate-500 hover:text-slate-700">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{vessel.name}</h1>
                                <p className="text-sm text-slate-500">Official Number: {vessel.official_number}</p>
                            </div>
                            <Badge className={statusColor}>
                                {vessel.status || (vessel.is_active ? 'Active' : 'Inactive')}
                            </Badge>
                        </div>

                        {/* Owner Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-5 w-5 text-[#35ADD5]" />
                                    Owner Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Full Name</p>
                                    <p className="text-base text-slate-800">{vessel.owner_profile?.full_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Email</p>
                                    <p className="text-base text-slate-800">{vessel.owner_profile?.user?.email || 'N/A'}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vessel Specifications */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Ship className="h-5 w-5 text-[#35ADD5]" />
                                    Vessel Specifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Make / Model</p>
                                    <p className="text-base text-slate-800">{vessel.make} {vessel.model}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Type</p>
                                    <p className="text-base text-slate-800 capitalize">{vessel.vessel_type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Passenger Capacity</p>
                                    <p className="text-base text-slate-800">{vessel.passenger_capacity || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Length</p>
                                    <p className="text-base text-slate-800">{vessel.length_ft} ft</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Beam</p>
                                    <p className="text-base text-slate-800">{vessel.beam_ft} ft</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Draft</p>
                                    <p className="text-base text-slate-800">{vessel.draft_ft} ft</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Requires Deckhand</p>
                                    <p className="text-base text-slate-800">{vessel.requires_deckhand ? 'Yes' : 'No'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Operating Area</p>
                                    <p className="text-base text-slate-800">{vessel.operating_area}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Marina Location */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MapPin className="h-5 w-5 text-[#35ADD5]" />
                                    Marina Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Marina Name</p>
                                    <p className="text-base text-slate-800">{vessel.marina_name}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Address</p>
                                    <p className="text-base text-slate-800">
                                        {vessel.marina_address}, {vessel.marina_city}, {vessel.marina_state} {vessel.marina_zip}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Crew Requirements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Anchor className="h-5 w-5 text-[#35ADD5]" />
                                    Crew Requirements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">License Type</p>
                                    <p className="text-base text-slate-800 uppercase">{vessel.required_license_type}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Endorsement</p>
                                    <p className="text-base text-slate-800 capitalize">{vessel.required_endorsement?.replace('_', ' ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Tonnage Rating</p>
                                    <p className="text-base text-slate-800">{vessel.required_tonnage_rating} Tons</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Years of Experience</p>
                                    <p className="text-base text-slate-800">{vessel.required_years_experience} Years</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vessel Photos */}
                        {vessel.photos && vessel.photos.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Vessel Photos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {vessel.photos.map((photo, idx) => {
                                            // FIXED: Robustly find the photo URL regardless of the exact property name (path, file_path, url, image, etc.)
                                            const photoUrl = 
                                                photo.path || 
                                                photo.file_path || 
                                                photo.url || 
                                                photo.image || 
                                                photo.filename || 
                                                Object.values(photo).find(v => typeof v === 'string' && (v.startsWith('http') || v.includes('/photos/'))) || 
                                                '';

                                            const src = photoUrl && photoUrl.startsWith('http') ? photoUrl : `/storage/${photoUrl}`;

                                            return (
                                                <div key={photo.id || idx} className="aspect-video overflow-hidden rounded-lg border border-slate-200">
                                                    <img 
                                                        src={src} 
                                                        alt="Vessel photo" 
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Vessel Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-5 w-5 text-[#35ADD5]" />
                                    Vessel Documents
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {documents?.length > 0 ? (
                                    <ul className="divide-y divide-slate-100">
                                        {documents.map((doc, index) => (
                                            <li key={index} className="flex items-center justify-between py-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                                                </div>
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500">No documents uploaded for this vessel.</p>
                                )}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    );
}

VesselShow.layout = {
    breadcrumbs: [
        {
            title: 'Users Directory',
            href: "/admin/vessel-inventory",
        },
    ],
    pageHeader: {
        title: 'Users Directory',
        description:
            'Manage fleet, oversee demise compliance, and approve listings.',
    },
};