import { DeckhandProfilePersonalInformationSection } from './deckhand-profile-personal-information-section';
import { DeckhandProfileQualificationsSection } from './deckhand-profile-qualifications-section';
import { DeckhandProfileResumeSection } from './deckhand-profile-resume-section';
import { DeckhandProfileWorkPreferencesSection } from './deckhand-profile-work-preferences-section';

export function DeckhandProfileForm() {
    return (
        <form className="space-y-6">
            <DeckhandProfilePersonalInformationSection />
            <DeckhandProfileQualificationsSection />
            <DeckhandProfileWorkPreferencesSection />
            <DeckhandProfileResumeSection />

            <div className="flex flex-wrap items-center gap-3 px-1 pt-2 pb-10">
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
