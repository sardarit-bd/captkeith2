import type { PlatformSettingsTabId } from './platform-settings-data';
import { PlatformSettingsGeneralTab } from './platform-settings-general-tab';
import { PlatformSettingsNotificationsTab } from './platform-settings-notifications-tab';
import { PlatformSettingsSecurityTab } from './platform-settings-security-tab';
import { PlatformSettingsUscgTab } from './platform-settings-uscg-tab';
import { PlatformSettingsVquipTab } from './platform-settings-vquip-tab';

export function PlatformSettingsTabContent({
    activeTab,
    data,
    setData,
}: {
    activeTab: PlatformSettingsTabId;
    data: any;
    setData: any;
}) {
    if (activeTab === 'general') {
        return <PlatformSettingsGeneralTab data={data} setData={setData} />;
    }

    if (activeTab === 'uscg') {
        return <PlatformSettingsUscgTab data={data} setData={setData} />;
    }

    if (activeTab === 'vquip') {
        return <PlatformSettingsVquipTab data={data} setData={setData} />;
    }

    if (activeTab === 'notifications') {
        return <PlatformSettingsNotificationsTab data={data} setData={setData} />;
    }

    return <PlatformSettingsSecurityTab data={data} setData={setData} />;
}