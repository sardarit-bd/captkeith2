import { useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { ProfileLicenseSection } from './profile-license-section';
import { ProfilePersonalInformationSection } from './profile-personal-information-section';
import { ProfileWorkPreferencesSection } from './profile-work-preferences-section';

interface CaptainProfileProps {
    full_name: string | null;
    phone: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zip_code: string | null;
    travel_radius_miles: number | null;
    license_type: string | null;
    endorsement: string | null;
    tonnage_rating: number | null;
    years_experience: number | null;
    boats_worked_on: string | null;
    bodies_of_water: string | null;
    geographic_area: string | null;
    hourly_rate: number | null;
    can_provide_deckhand: boolean;
    deckhand_hourly_rate: number | null;
    photo_url: string | null;
    resume_url: string | null;
    license_doc_url: string | null;
}

export function MyProfileForm() {
    const page = usePage<{ profile: CaptainProfileProps | null }>();
    const profile = page.props.profile;

    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [licenseDocFile, setLicenseDocFile] = useState<File | null>(null);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: profile?.full_name ?? '',
        phone: profile?.phone ?? '',
        address: profile?.address ?? '',
        city: profile?.city ?? '',
        state: profile?.state ?? '',
        zip_code: profile?.zip_code ?? '',
        travel_radius_miles: profile?.travel_radius_miles ?? '',
        license_type: profile?.license_type ?? 'oupv',
        endorsement: profile?.endorsement ?? 'inland',
        tonnage_rating: profile?.tonnage_rating ?? '100',
        years_experience: profile?.years_experience ?? '',
        boats_worked_on: profile?.boats_worked_on ?? '',
        bodies_of_water: profile?.bodies_of_water ?? '',
        geographic_area: profile?.geographic_area ?? '',
        hourly_rate: profile?.hourly_rate ?? '',
        can_provide_deckhand: profile?.can_provide_deckhand ?? false,
        deckhand_hourly_rate: profile?.deckhand_hourly_rate ?? '',
        photo: null as File | null,
        resume: null as File | null,
        license_doc: null as File | null,
    });

    const handleChange = (field: string, value: string | boolean) =>
        setData(field as any, value);

    const handlePhotoSelect = (file: File | null) => {
        setPhotoFile(file);
        setData('photo', file);
    };
    const handleLicenseDocSelect = (file: File | null) => {
        setLicenseDocFile(file);
        setData('license_doc', file);
    };
    const handleResumeSelect = (file: File | null) => {
        setResumeFile(file);
        setData('resume', file);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/my-profile', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        reset();
        setPhotoFile(null);
        setLicenseDocFile(null);
        setResumeFile(null);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <ProfilePersonalInformationSection
                data={{
                    full_name: String(data.full_name),
                    phone: String(data.phone),
                    address: String(data.address),
                    city: String(data.city),
                    state: String(data.state),
                    zip_code: String(data.zip_code),
                    geographic_area: String(data.geographic_area),
                    bodies_of_water: String(data.bodies_of_water),
                    boats_worked_on: String(data.boats_worked_on),
                }}
                errors={errors}
                photoUrl={profile?.photo_url ?? null}
                photoFile={photoFile}
                onPhotoSelect={handlePhotoSelect}
                onChange={handleChange}
            />

            <ProfileLicenseSection
                data={{
                    license_type: String(data.license_type),
                    endorsement: String(data.endorsement),
                    tonnage_rating: data.tonnage_rating,
                    years_experience: data.years_experience,
                }}
                errors={errors}
                licenseDocUrl={profile?.license_doc_url ?? null}
                licenseDocFile={licenseDocFile}
                resumeUrl={profile?.resume_url ?? null}
                resumeFile={resumeFile}
                onLicenseDocSelect={handleLicenseDocSelect}
                onResumeSelect={handleResumeSelect}
                onChange={handleChange}
            />

            <ProfileWorkPreferencesSection
                data={{
                    hourly_rate: data.hourly_rate,
                    travel_radius_miles: data.travel_radius_miles,
                    can_provide_deckhand: Boolean(data.can_provide_deckhand),
                    deckhand_hourly_rate: data.deckhand_hourly_rate,
                }}
                errors={errors}
                onChange={handleChange}
            />

            <div className="flex items-center gap-4 px-1 pt-2 pb-10">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-[#0a273f] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={processing}
                    className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:opacity-60"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
