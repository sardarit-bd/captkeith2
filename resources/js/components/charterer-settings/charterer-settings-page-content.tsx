import { ChartererSettingsDangerZone } from './charterer-settings-danger-zone';
import { ChartererSettingsNotificationsSection } from './charterer-settings-notifications-section';
import { ChartererSettingsPaymentSection } from './charterer-settings-payment-section';
import { ChartererSettingsSecuritySection } from './charterer-settings-security-section';

export function ChartererSettingsPageContent() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] font-poppins">
            <div className="flex-1 overflow-y-auto px-4 pb-12 sm:px-6">
                <div className="mx-auto mt-6 max-w-250 space-y-6">
                    <ChartererSettingsNotificationsSection />
                    <ChartererSettingsSecuritySection />
                    <ChartererSettingsPaymentSection />
                    <ChartererSettingsDangerZone />
                </div>
            </div>
        </div>
    );
}
