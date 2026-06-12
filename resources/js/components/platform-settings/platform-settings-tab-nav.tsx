import type { PlatformSettingsTabId } from './platform-settings-data';
import { platformSettingsTabs } from './platform-settings-data';

export function PlatformSettingsTabNav({
    activeTab,
    onTabChange,
}: {
    activeTab: PlatformSettingsTabId;
    onTabChange: (tab: PlatformSettingsTabId) => void;
}) {
    return (
        <aside className="flex w-full flex-row gap-2 overflow-x-auto pb-2 lg:w-64 lg:flex-col lg:overflow-visible lg:pb-0">
            {platformSettingsTabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        className={`relative flex min-w-[220px] items-center rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors lg:min-w-0 ${
                            isActive
                                ? 'border-[#e6ebf1] bg-white text-[#35ADD5] shadow-sm'
                                : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-[#35ADD5]'
                        }`}
                    >
                        <span
                            className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-lg ${
                                isActive ? 'bg-[#35ADD5]' : 'bg-transparent'
                            }`}
                        />
                        <tab.icon
                            className={`mr-3 h-4 w-4 ${
                                isActive ? 'text-[#35ADD5]' : 'text-slate-400'
                            }`}
                        />
                        {tab.label}
                    </button>
                );
            })}
        </aside>
    );
}
