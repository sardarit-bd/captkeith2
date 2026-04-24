import { Head } from '@inertiajs/react';
import { AccountPreferencesPageContent } from '@/components/account-preferences/account-preferences-page-content';
import { accountPreferences } from '@/routes';

export default function AccountPreferencesPage() {
    return (
        <>
            <Head title="Account Preferences" />
            <AccountPreferencesPageContent />
        </>
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
