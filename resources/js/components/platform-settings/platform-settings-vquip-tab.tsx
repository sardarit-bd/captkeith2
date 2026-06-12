import { Eye, ShieldAlert } from 'lucide-react';
import { SettingsSectionCard, ToggleField } from './platform-settings-shared';

export function PlatformSettingsVquipTab() {
    return (
        <div className="space-y-6">
            <div className="border-b border-[#e6ebf1] pb-4">
                <h3 className="text-xl font-semibold text-[#35ADD5]">
                    VQUIP Integration
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Manage API connections for automated charter insurance
                    policies.
                </p>
            </div>

            <SettingsSectionCard title="API Connection">
                <div className="mb-5 flex justify-end">
                    <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Connected to Production
                    </span>
                </div>

                <div className="space-y-5">
                    <label className="block space-y-1.5 space-x-2">
                        <span className="text-sm font-medium text-slate-700">
                            Environment
                        </span>
                        <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20 md:w-1/2">
                            <option>Production (Live)</option>
                            <option>Sandbox (Testing)</option>
                        </select>
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-medium text-slate-700">
                            VQUIP API Key
                        </span>
                        <div className="flex gap-2">
                            <input
                                type="password"
                                defaultValue="sk_live_1234567890abcdef"
                                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                            />
                            <button
                                type="button"
                                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                        </div>
                    </label>

                    <label className="block space-y-1.5">
                        <span className="text-sm font-medium text-slate-700">
                            Webhook Secret
                        </span>
                        <input
                            type="password"
                            defaultValue="whsec_abcdef123456"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20"
                        />
                        <p className="text-xs text-slate-500">
                            Used to verify events sent from VQUIP (for example,
                            policy created).
                        </p>
                    </label>
                </div>
            </SettingsSectionCard>

            <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div>
                    <h4 className="flex items-center text-sm font-semibold text-[#35ADD5]">
                        <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" />
                        Strict Insurance Enforcement
                    </h4>
                    <p className="mt-1 max-w-xl text-xs text-slate-500">
                        When enabled, charter documentation remains locked until
                        VQUIP returns an active policy.
                    </p>
                </div>
                <ToggleField checked />
            </section>
        </div>
    );
}
