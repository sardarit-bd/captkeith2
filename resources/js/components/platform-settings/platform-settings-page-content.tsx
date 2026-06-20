import { Save } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { PlatformSettingsTabId } from './platform-settings-data';
import { platformSettingsTabs } from './platform-settings-data';
import { PlatformSettingsTabContent } from './platform-settings-tab-content';
import { PlatformSettingsTabNav } from './platform-settings-tab-nav';

export function PlatformSettingsPageContent({ initialSettings }: { initialSettings: any }) {
    const [activeTab, setActiveTab] = useState<PlatformSettingsTabId>(
        platformSettingsTabs[0]?.id ?? 'general',
    );

    // Wrap initialSettings in a 'settings' key to match the controller's validation rules
    const { data, setData, put, reset, processing } = useForm({ settings: initialSettings });

    const handleSave = () => {
        // Use the direct URL string to avoid missing route helper imports
        put('/admin/platform-settings', {
            preserveScroll: true,
        });
    };

    const handleDiscard = () => {
        reset();
    };

    // Wrapper to correctly update the nested 'settings' object in Inertia's useForm
    const handleSetTabData = (key: string, value: any) => {
        setData('settings', { ...data.settings, [key]: value });
    };

    return (
        <div className="font-poppins flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF]">
            <div className="flex-1 overflow-y-auto px-4 pb-8 sm:px-6 lg:px-8">
                <div className="mx-auto w-full py-4">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        <PlatformSettingsTabNav
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        <main className="flex-1 space-y-6 pb-12">
                            <PlatformSettingsTabContent 
                                activeTab={activeTab} 
                                data={data.settings} // Pass the nested settings object
                                setData={handleSetTabData} // Pass the wrapper function
                            />

                            <footer className="flex justify-end gap-3 border-t border-[#e6ebf1] pt-6">
                                <button
                                    type="button"
                                    onClick={handleDiscard}
                                    className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                                >
                                    Discard Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={processing}
                                    className="inline-flex items-center rounded-lg bg-[#35ADD5] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800 disabled:opacity-50"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Saving...' : 'Save Configuration'}
                                </button>
                            </footer>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}