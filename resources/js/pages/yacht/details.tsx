import { Head } from '@inertiajs/react';
import { YachtDetailsPageContent } from '@/components/yacht-details/yacht-details-page-content';

export type VesselDetail = {
    id: string | number;
    name: string;
    registrationNo: string;
    image: string | null;
    allImages: string[];
    type: string;
    lengthFt: string;
    beamFt: string;
    draftFt: string;
    year: string;
    make: string;
    model: string;
    capacity: string;
    mooringLocation: string;
    operatingArea: string;
    deckhandRequired: string;
    requiredLicense: string;
    requiredEndorsement: string;
    requiredTonnage: string;
    requiredExperience: string;
};

export default function YachtDetailsPage() {
    return (
        <>
            <Head title="Vessel Details" />
            <YachtDetailsPageContent />
        </>
    );
}

YachtDetailsPage.layout = {
    breadcrumbs: [{ title: 'Vessel Details', href: '#' }],
    pageHeader: {
        title: 'Vessel Details',
        description: 'Full specifications and requirements for this vessel.',
    },
};
