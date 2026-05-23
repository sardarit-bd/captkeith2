import { useForm, usePage } from '@inertiajs/react';
import { myProfile } from '@/routes';
import { DeckhandProfilePersonalInformationSection } from './deckhand-profile-personal-information-section';
import { DeckhandProfileQualificationsSection } from './deckhand-profile-qualifications-section';
import { DeckhandProfileResumeSection } from './deckhand-profile-resume-section';
import { DeckhandProfileWorkPreferencesSection } from './deckhand-profile-work-preferences-section';

export type DeckhandProfileFormData = {
    full_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    travel_radius_miles: string;
    years_experience: string;
    has_server_experience: boolean;
    has_bartending_experience: boolean;
    hourly_rate: string;
    photo: File | null;
    resume: File | null;
    // read-only URLs — not submitted, used for display
    _photo_url: string | null;
    _resume_url: string | null;
};

type PageProps = {
    profile: {
        full_name: string | null;
        phone: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        zip_code: string | null;
        travel_radius_miles: number | null;
        years_experience: number | null;
        has_server_experience: boolean;
        has_bartending_experience: boolean;
        hourly_rate: string | null;
        photo_url: string | null;
        resume_url: string | null;
    } | null;
};

export function DeckhandProfileForm() {
    const { profile } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors, reset, transform } =
        useForm<DeckhandProfileFormData>({
            full_name: profile?.full_name ?? '',
            phone: profile?.phone ?? '',
            address: profile?.address ?? '',
            city: profile?.city ?? '',
            state: profile?.state ?? '',
            zip_code: profile?.zip_code ?? '',
            travel_radius_miles:
                profile?.travel_radius_miles != null
                    ? String(profile.travel_radius_miles)
                    : '',
            years_experience:
                profile?.years_experience != null
                    ? String(profile.years_experience)
                    : '',
            has_server_experience: profile?.has_server_experience ?? false,
            has_bartending_experience:
                profile?.has_bartending_experience ?? false,
            hourly_rate: profile?.hourly_rate ?? '',
            photo: null,
            resume: null,
            _photo_url: profile?.photo_url ?? null,
            _resume_url: profile?.resume_url ?? null,
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((d) => ({
            full_name: d.full_name,
            phone: d.phone,
            address: d.address,
            city: d.city,
            state: d.state,
            zip_code: d.zip_code,
            travel_radius_miles: d.travel_radius_miles,
            years_experience: d.years_experience,
            has_server_experience: d.has_server_experience,
            has_bartending_experience: d.has_bartending_experience,
            hourly_rate: d.hourly_rate,
            photo: d.photo,
            resume: d.resume,
        }));

        post(myProfile.url(), {
            forceFormData: true,
        });
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <DeckhandProfilePersonalInformationSection
                data={data}
                errors={errors}
                setData={setData}
            />
            <DeckhandProfileQualificationsSection
                data={data}
                errors={errors}
                setData={setData}
            />
            <DeckhandProfileWorkPreferencesSection
                data={data}
                errors={errors}
                setData={setData}
            />
            <DeckhandProfileResumeSection
                data={data}
                errors={errors}
                setData={setData}
            />

            <div className="flex flex-wrap items-center gap-3 px-1 pt-2 pb-10">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-[#0a273f] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#123651] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                    type="button"
                    disabled={processing}
                    onClick={handleCancel}
                    className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
