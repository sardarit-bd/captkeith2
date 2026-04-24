import { ProfileLicenseSection } from './profile-license-section';
import { ProfilePersonalInformationSection } from './profile-personal-information-section';
import { ProfileWorkPreferencesSection } from './profile-work-preferences-section';

export function MyProfileForm() {
    return (
        <form className="space-y-6">
            <ProfilePersonalInformationSection />
            <ProfileLicenseSection />
            <ProfileWorkPreferencesSection />

            <div className="flex items-center gap-4 px-1 pb-10 pt-2">
                <button
                    type="submit"
                    className="rounded-lg bg-[#0a273f] px-6 py-2.5 text-[14px] font-medium text-white shadow-sm transition-colors hover:bg-[#123651]"
                >
                    Save Changes
                </button>
                <button
                    type="button"
                    className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-2.5 text-[14px] font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#f9fafb]"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
