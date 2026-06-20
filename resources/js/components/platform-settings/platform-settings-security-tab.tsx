import { SettingsSectionCard, ToggleField } from './platform-settings-shared';

export function PlatformSettingsSecurityTab({ data, setData }: { data: any, setData: any }) {
    const security = data.security;
    const setSecurity = (updates: any) => setData('security', { ...security, ...updates });

    return (
        <div className="space-y-6">
            <div className="border-b border-[#e6ebf1] pb-4">
                <h3 className="text-xl font-semibold text-[#35ADD5]">Security & Access</h3>
                <p className="mt-1 text-sm text-slate-500">Configure admin authentication rules and compliance data retention.</p>
            </div>

            <SettingsSectionCard title="Authentication Policies">
                <div className="space-y-6">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 md:flex-row md:items-center">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Require Two-Factor Auth (2FA)</p>
                            <p className="mt-1 text-xs text-slate-500">Enforce authenticator-based 2FA for all super admin accounts.</p>
                        </div>
                        <ToggleField checked={security.require_2fa} onChange={() => setSecurity({ require_2fa: !security.require_2fa })} />
                    </div>
                    <label className="block space-y-1.5 space-x-2">
                        <span className="text-sm font-medium text-slate-700">Admin Session Timeout</span>
                        <select value={security.session_timeout} onChange={(e) => setSecurity({ session_timeout: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20 md:w-1/2">
                            <option>15 Minutes</option><option>30 Minutes</option><option>1 Hour</option><option>4 Hours</option>
                        </select>
                        <p className="text-xs text-slate-500">Automatically log out inactive admins to protect sensitive user data.</p>
                    </label>
                </div>
            </SettingsSectionCard>

            <SettingsSectionCard title="Data & Compliance Retention">
                <label className="block space-y-1.5 space-x-2">
                    <span className="text-sm font-medium text-slate-700">Document Retention Period</span>
                    <select value={security.retention_period} onChange={(e) => setSecurity({ retention_period: e.target.value })} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20 md:w-1/2">
                        <option>1 Year</option><option>3 Years</option><option>7 Years (USCG Audit Standard)</option><option>Indefinitely</option>
                    </select>
                    <p className="text-xs text-slate-500">Timeframe for retaining demise charter agreements and VQUIP policies after charter completion.</p>
                </label>
            </SettingsSectionCard>
        </div>
    );
}