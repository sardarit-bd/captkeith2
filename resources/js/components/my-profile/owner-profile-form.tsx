import { useForm, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { OwnerProfileFormData } from './owner-profile-data';
import { OwnerProfilePersonalInformationSection } from './owner-profile-personal-information-section';

interface PageProps {
    profile: {
        full_name: string | null;
        phone: string | null;
        company_name: string | null;
        bio: string | null;
        photo_url: string | null;
    } | null;
    auth: { user: { email: string } };
}

export function OwnerProfileForm() {
    const { profile, auth } = usePage<PageProps>().props;
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(
        profile?.photo_url ?? null,
    );

    const { data, setData, processing, errors, reset } =
        useForm<OwnerProfileFormData>({
            full_name: profile?.full_name ?? '',
            phone: profile?.phone ?? '',
            company_name: profile?.company_name ?? '',
            bio: profile?.bio ?? '',
            email: auth.user.email,
        });

    function handleChange(
        field: keyof OwnerProfileFormData,
        value: string | boolean,
    ) {
        setData(field, value as string);
    }

    function handlePhotoChange(file: File) {
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    }

    function handleSubmit() {
        const formData = new FormData();
        formData.append('full_name', data.full_name);
        formData.append('phone', data.phone);
        formData.append('company_name', data.company_name);
        formData.append('bio', data.bio);

        if (photoFile) {
            formData.append('photo', photoFile);
        }

        router.post('/my-profile', formData, {
            forceFormData: true,
        });
    }

    function handleCancel() {
        reset();
        setPhotoPreview(profile?.photo_url ?? null);
        setPhotoFile(null);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <OwnerProfilePersonalInformationSection
                data={data}
                errors={errors}
                photoUrl={photoPreview}
                onChange={handleChange}
                onPhotoChange={handlePhotoChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                processing={processing}
            />
        </form>
    );
}
