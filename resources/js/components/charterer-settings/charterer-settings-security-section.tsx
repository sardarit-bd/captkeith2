import { router, usePage } from '@inertiajs/react';
import { Shield } from 'lucide-react';
import { SecondaryButton, SettingsSection } from './charterer-settings-shared';

type PageProps = {
    twoFactorEnabled: boolean;
};

export function ChartererSettingsSecuritySection() {
    const { twoFactorEnabled } = usePage<PageProps>().props;

    const securityActions = [
        {
            id: 'change-password',
            title: 'Change Password',
            description: 'Update your account password',
            actionLabel: 'Change',
            onClick: () => router.visit(route('settings.security')),
        },
        {
            id: 'two-factor-auth',
            title: 'Two-Factor Authentication',
            description: twoFactorEnabled
                ? 'Two-factor authentication is currently enabled'
                : 'Add an extra layer of security to your account',
            actionLabel: twoFactorEnabled ? 'Manage' : 'Enable',
            onClick: () => router.visit(route('settings.security')),
        },
    ];

    return (
        <SettingsSection
            title="Security Settings"
            icon={<Shield className="h-5 w-5 text-[#3b82f6]" />}
        >
            <div className="space-y-4 sm:space-y-0">
                {securityActions.map((item, index) => (
                    <div
                        key={item.id}
                        className={`flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center ${
                            index < securityActions.length - 1
                                ? 'border-b border-[#f8fafc]'
                                : ''
                        }`}
                    >
                        <div>
                            <h4 className="text-[14px] font-semibold text-[#111827]">
                                {item.title}
                            </h4>
                            <p className="mt-0.5 text-[13px] text-[#6b7280]">
                                {item.description}
                            </p>
                        </div>
                        <SecondaryButton
                            onClick={item.onClick}
                            className="w-full sm:w-auto"
                        >
                            {item.actionLabel}
                        </SecondaryButton>
                    </div>
                ))}
            </div>
        </SettingsSection>
    );
}
