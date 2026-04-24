import { SettingsSectionCard, ToggleField } from './platform-settings-shared';

export function PlatformSettingsGeneralTab() {
    return (
        <div className="space-y-6">
            <div className="border-b border-[#e6ebf1] pb-4">
                <h3 className="text-xl font-semibold text-[#11395d]">
                    General Preferences
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Manage core platform details, contact information, and
                    operating modes.
                </p>
            </div>

            <section className="space-y-6 rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label className="space-y-1.5">
                        <span className="block text-sm font-medium text-slate-700">
                            Platform Name
                        </span>
                        <input
                            type="text"
                            defaultValue="CaptMatch"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="block text-sm font-medium text-slate-700">
                            Support Email Address
                        </span>
                        <input
                            type="email"
                            defaultValue="support@captmatch.com"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="block text-sm font-medium text-slate-700">
                            Support Phone Number
                        </span>
                        <input
                            type="tel"
                            defaultValue="+1 (800) 555-0192"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                        />
                    </label>

                    <label className="space-y-1.5">
                        <span className="block text-sm font-medium text-slate-700">
                            System Timezone
                        </span>
                        <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20">
                            <option>Eastern Time (ET)</option>
                            <option>Central Time (CT)</option>
                            <option>Mountain Time (MT)</option>
                            <option>Pacific Time (PT)</option>
                        </select>
                    </label>
                </div>
            </section>

            <SettingsSectionCard title="Matching Algorithms">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">
                        Default Captain Search Radius (Miles)
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min={10}
                            max={200}
                            defaultValue={50}
                            className="w-full accent-[#35ADD5] md:w-64"
                        />
                        <span className="w-12 text-sm font-semibold text-[#11395d]">
                            50 mi
                        </span>
                    </div>
                    <p className="text-xs text-slate-500">
                        Maximum distance a captain is notified about a charter
                        request by default.
                    </p>
                </div>
            </SettingsSectionCard>

            <section className="flex items-center justify-between rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm">
                <div>
                    <h4 className="text-sm font-semibold text-[#11395d]">
                        Maintenance Mode
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                        Disables login for non-admins and shows an under
                        maintenance screen.
                    </p>
                </div>
                <ToggleField checked={false} />
            </section>
        </div>
    );
}
