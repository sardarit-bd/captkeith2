import { currentStatus } from './account-preferences-data';
import { PreferencesCard, ToggleSwitch } from './account-preferences-shared';

export function AccountPreferencesCurrentStatus() {
    return (
        <PreferencesCard title="Current Status">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] p-5 sm:p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22c55e] ring-4 ring-[#dcfce7]">
                        <div className="h-3 w-3 rounded-full bg-white" />
                    </div>
                    <div>
                        <h4 className="text-[15px] font-bold text-[#111827]">
                            {currentStatus.title}
                        </h4>
                        <p className="mt-0.5 text-[13px] text-[#4b5563]">
                            {currentStatus.description}
                        </p>
                    </div>
                </div>

                <div className="shrink-0">
                    <ToggleSwitch
                        id="current-status"
                        defaultChecked={currentStatus.enabled}
                    />
                </div>
            </div>
        </PreferencesCard>
    );
}
