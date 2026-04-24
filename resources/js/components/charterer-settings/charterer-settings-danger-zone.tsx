import { Trash2 } from 'lucide-react';
import { dangerZoneActions } from './charterer-settings-data';
import { SecondaryButton, SettingsSection } from './charterer-settings-shared';

export function ChartererSettingsDangerZone() {
    return (
        <SettingsSection
            title="Danger Zone"
            icon={<Trash2 className="h-5 w-5" />}
            danger
        >
            <div className="space-y-4 sm:space-y-0">
                <div className="flex flex-col justify-between gap-4 border-b border-[#f8fafc] pb-5 sm:flex-row sm:items-center">
                    <div>
                        <h4 className="text-[14px] font-semibold text-[#111827]">
                            {dangerZoneActions.deactivate.title}
                        </h4>
                        <p className="mt-0.5 text-[13px] text-[#6b7280]">
                            {dangerZoneActions.deactivate.description}
                        </p>
                    </div>
                    <SecondaryButton className="w-full sm:w-auto">
                        {dangerZoneActions.deactivate.actionLabel}
                    </SecondaryButton>
                </div>

                <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
                    <div>
                        <h4 className="text-[14px] font-semibold text-[#dc2626]">
                            {dangerZoneActions.delete.title}
                        </h4>
                        <p className="mt-0.5 text-[13px] text-[#6b7280]">
                            {dangerZoneActions.delete.description}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-full rounded-lg bg-[#dc2626] px-5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-[#b91c1c] sm:w-auto"
                    >
                        {dangerZoneActions.delete.actionLabel}
                    </button>
                </div>
            </div>
        </SettingsSection>
    );
}
