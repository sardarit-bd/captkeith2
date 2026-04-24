import { notificationTriggers } from './platform-settings-data';
import { ToggleField } from './platform-settings-shared';

export function PlatformSettingsNotificationsTab() {
    return (
        <div className="space-y-6">
            <div className="border-b border-[#e6ebf1] pb-4">
                <h3 className="text-xl font-semibold text-[#11395d]">
                    Notifications & Alerts
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Configure when and how super admins receive system alerts.
                </p>
            </div>

            <section className="space-y-4 rounded-2xl border border-[#e6ebf1] bg-white p-6 shadow-sm">
                <h4 className="mb-4 border-b border-slate-100 pb-3 text-sm font-semibold text-[#11395d]">
                    Admin Email Triggers
                </h4>

                {notificationTriggers.map((trigger) => (
                    <article
                        key={trigger.id}
                        className="flex items-center justify-between py-2"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-800">
                                {trigger.title}
                            </p>
                            <p
                                className={`text-xs ${
                                    trigger.id === 'compliance-flag'
                                        ? 'font-medium text-red-500'
                                        : 'text-slate-500'
                                }`}
                            >
                                {trigger.description}
                            </p>
                        </div>
                        <ToggleField
                            checked={trigger.enabled}
                            disabled={trigger.disabled}
                        />
                    </article>
                ))}
            </section>
        </div>
    );
}
