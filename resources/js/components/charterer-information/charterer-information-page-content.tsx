import { ChartererInformationFormCard } from './charterer-information-form-card';

interface Profile {
    full_name: string;
    phone: string;
    date_of_birth: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    photo_path: string | null;
}

interface Props {
    profile: Profile;
}

export function ChartererInformationPageContent({ profile }: Props) {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto mt-2 w-full max-w-212.5">
                    <ChartererInformationFormCard profile={profile} />
                </div>
            </div>
        </div>
    );
}