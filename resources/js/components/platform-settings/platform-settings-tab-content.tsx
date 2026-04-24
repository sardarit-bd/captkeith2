import type { PlatformSettingsTabId } from './platform-settings-data';
import { PlatformSettingsGeneralTab } from './platform-settings-general-tab';
import { PlatformSettingsNotificationsTab } from './platform-settings-notifications-tab';
import { PlatformSettingsSecurityTab } from './platform-settings-security-tab';
import { PlatformSettingsUscgTab } from './platform-settings-uscg-tab';
import { PlatformSettingsVquipTab } from './platform-settings-vquip-tab';

export function PlatformSettingsTabContent({
    activeTab,
}: {
    activeTab: PlatformSettingsTabId;
}) {
    if (activeTab === 'general') {
        return <PlatformSettingsGeneralTab />;
    }

    if (activeTab === 'uscg') {
        return <PlatformSettingsUscgTab />;
    }

    if (activeTab === 'vquip') {
        return <PlatformSettingsVquipTab />;
    }

    if (activeTab === 'notifications') {
        return <PlatformSettingsNotificationsTab />;
    }

    return <PlatformSettingsSecurityTab />;
}
