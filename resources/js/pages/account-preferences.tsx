import { Head } from '@inertiajs/react';
import { AccountPreferencesPageContent } from '@/components/account-preferences/account-preferences-page-content';
import { accountPreferences } from '@/routes';

export default function AccountPreferencesPage() {
    return (
        <div className="pt-8">
            <Head title="Account Preferences" />
            <AccountPreferencesPageContent />
        </div>
    );
}

AccountPreferencesPage.layout = {
    breadcrumbs: [
        {
            title: 'Account Preferences',
            href: accountPreferences(),
        },
    ],
    pageHeader: {
        title: 'Settings',
        description: 'Manage your account preferences.',
    },
};
