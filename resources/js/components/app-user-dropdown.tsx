import { Link, usePage } from '@inertiajs/react';
import type { InertiaLinkProps } from '@inertiajs/react';
import {
    Bell,
    ChevronDown,
    CircleUserRound,
    Settings,
    User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { PageProps } from '@/types';
import { accountPreferences } from '@/routes';
import { adminMyProfile } from '@/routes';
import { chartererSettings } from '@/routes';
import { myProfile } from '@/routes';
import { notifications } from '@/routes';
import { platformSettings } from '@/routes';
import { edit as editProfile } from '@/routes/profile';

type Role =
    | 'owner'
    | 'captain'
    | 'deckhand'
    | 'charterer'
    | 'admin'
    | 'unknown';

type UserDropdownItem = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon: LucideIcon;
    dividerBefore?: boolean;
};

const menuByRole: Record<Role, UserDropdownItem[]> = {
    captain: [
        { title: 'My Profile', href: myProfile(), icon: User },
        {
            title: 'Account Preferences',
            href: accountPreferences(),
            icon: CircleUserRound,
        },
        {
            title: 'Settings',
            href: editProfile(),
            icon: Settings,
            dividerBefore: true,
        },
    ],
    deckhand: [
        { title: 'My Profile', href: myProfile(), icon: User },
        {
            title: 'Account Preferences',
            href: accountPreferences(),
            icon: CircleUserRound,
        },
        {
            title: 'Settings',
            href: editProfile(),
            icon: Settings,
            dividerBefore: true,
        },
    ],
    owner: [
        { title: 'My Profile', href: myProfile(), icon: User },
        {
            title: 'Settings',
            href: '/owner/settings',
            icon: Settings,
            dividerBefore: true,
        },
    ],
    admin: [
        { title: 'My Profile', href: adminMyProfile(), icon: User },
        {
            title: 'Settings',
            href: platformSettings(),
            icon: Settings,
            dividerBefore: true,
        },
    ],
    charterer: [
        { title: 'My Profile', href: editProfile(), icon: User },
        {
            title: 'Settings',
            href: chartererSettings(),
            icon: Settings,
            dividerBefore: true,
        },
    ],
    unknown: [{ title: 'Settings', href: editProfile(), icon: Settings }],
};

export function AppUserDropdown({
    displayName,
    initials,
    portalLabel,
    role,
    compact = false,
}: {
    displayName: string;
    initials: string;
    portalLabel: string;
    role?: string | null;
    compact?: boolean;
}) {
    const normalizedRole: Role =
        role === 'owner' ||
        role === 'captain' ||
        role === 'deckhand' ||
        role === 'charterer' ||
        role === 'admin'
            ? role
            : 'unknown';

    const menuItems = menuByRole[normalizedRole];
    
    // Get unread notification count from shared props
    const unreadCount =
        (usePage<PageProps & { unreadNotificationsCount?: number }>().props
            .unreadNotificationsCount) || 0;

    return (
        <div
            className={`ml-auto flex items-center justify-end ${compact ? 'gap-2 sm:gap-3' : 'w-full gap-2 sm:gap-3 md:ml-6 md:w-auto md:gap-4'}`}
        >
            <Link
                href={notifications()}
                prefetch
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1f2937] transition-colors hover:bg-[#e9edf2]"
                aria-label="Notifications"
            >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-medium rounded-full min-w-[1.25rem]"
                    >
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                )}
            </Link>

            <div className="hidden h-10 w-px bg-[#e5e7eb] sm:block" />

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-xl px-2 py-1 transition-colors hover:bg-[#e9edf2] sm:gap-3"
                        aria-label="User menu"
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#35ADD5] text-sm font-semibold text-white">
                            {initials || 'U'}
                        </span>
                        <span className="hidden text-left sm:block">
                            <span className="block text-sm leading-tight font-medium text-[#1f2937]">
                                {displayName}
                            </span>
                            <span className="block text-xs leading-tight text-[#6b7280]">
                                {portalLabel}
                            </span>
                        </span>
                        <ChevronDown className="h-4 w-4 text-[#6b7280]" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="bottom"
                    sideOffset={14}
                    collisionPadding={8}
                    className="w-[min(220px,calc(100vw-1rem))] rounded-xl border-[#e5e7eb] bg-white p-1.5 shadow-lg sm:w-55"
                >
                    {menuItems.map((item) => (
                        <div key={item.title}>
                            {item.dividerBefore ? (
                                <DropdownMenuSeparator className="bg-[#eef2f7]" />
                            ) : null}
                            <DropdownMenuItem asChild>
                                <Link
                                    href={item.href}
                                    prefetch
                                    className="cursor-pointer rounded-lg"
                                >
                                    <item.icon className="mr-2 h-4 w-4 text-[#64748b]" />
                                    {item.title}
                                </Link>
                            </DropdownMenuItem>
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}