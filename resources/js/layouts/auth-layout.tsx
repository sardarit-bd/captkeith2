import { usePage } from '@inertiajs/react';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    const { component } = usePage();

    if (
        component === 'auth/register' ||
        component === 'auth/login' ||
        component === 'auth/forgot-password' ||
        component === 'auth/confirm-password'
    ) {
        return <>{children}</>;
    }

    return (
        <AuthLayoutTemplate title={title} description={description}>
            {children}
        </AuthLayoutTemplate>
    );
}
