export type YachtRecord = {
    id: string;
    name: string;
    registrationNo: string;
    image: string | null;
    defaultTab: YachtTab;
    specs: {
        type: string;
        length: string;
        draft: string;
        mooringLocation: string;
        operatingArea: string;
        deckhandRequired: string;
    };
    captainRequirements: {
        licenseTypes: string[];
        rating: string;
        endorsements: string[];
        minimumExperience: string;
    };
    captainRequirementsRaw: {
        license_type: string | null;
        endorsement: string | null;
        min_experience: number | null;
    };
    charters: {
        hasScheduledCharters: boolean;
    };
};
