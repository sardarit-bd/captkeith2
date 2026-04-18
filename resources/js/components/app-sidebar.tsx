import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    CalendarDays,
    ClipboardList,
    LayoutGrid,
    LogOut,
    MessageCircle,
    Settings,
    Ship,
    User,
    Users,
} from 'lucide-react';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { dashboard } from '@/routes';
import { messages } from '@/routes';
import { myYachts } from '@/routes';
import { logout } from '@/routes';
import { captains } from '@/routes';
import { edit as editProfile } from '@/routes/profile';
import type { NavItem } from '@/types';

function resolveNavItems(role: string | null | undefined): NavItem[] {
    const sharedItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Messages',
            href: messages(),
            icon: MessageCircle,
        },
        {
            title: 'Settings',
            href: editProfile(),
            icon: Settings,
        },
    ];

    if (role === 'owner' || role === 'admin') {
        return [
            sharedItems[0],
            {
                title: 'My Yachts',
                href: myYachts(),
                icon: Ship,
            },
            {
                title: 'Captains',
                href: captains(),
                icon: User,
            },
            {
                title: 'Charterers',
                href: '#',
                icon: Users,
            },
            sharedItems[1],
            sharedItems[2],
        ];
    }

    if (role === 'captain' || role === 'deckhand') {
        return [
            sharedItems[0],
            {
                title: 'Yachts Match',
                href: '#',
                icon: Ship,
            },
            {
                title: 'Requests',
                href: '#',
                icon: ClipboardList,
            },
            sharedItems[1],
            {
                title: 'My Profile',
                href: editProfile(),
                icon: User,
            },
            sharedItems[2],
        ];
    }

    if (role === 'charterer') {
        return [
            sharedItems[0],
            {
                title: 'My Booking',
                href: '#',
                icon: CalendarDays,
            },
            {
                title: 'Notifications',
                href: '#',
                icon: Bell,
            },
            sharedItems[1],
            {
                title: 'My Profile',
                href: editProfile(),
                icon: User,
            },
            sharedItems[2],
        ];
    }

    return sharedItems;
}

export function AppSidebar() {
    const page = usePage<{ auth?: { role?: string | null } }>();
    const cleanup = useMobileNavigation();
    const mainNavItems = resolveNavItems(page.props.auth?.role);

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r border-[#e5e7eb] bg-[#f6f7f9]"
        >
            <SidebarHeader className="px-6 pt-6 pb-2">
                <Link href={dashboard()} prefetch className="mx-auto">
                    <img
                        src="/images/logo1.svg"
                        alt="CAPTMATCH"
                        className="h-auto w-[220px] object-contain"
                    />
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-4 pt-4">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="px-4 pb-4">
                <SidebarSeparator className="mb-3 mt-auto" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="h-11 rounded-xl px-4 text-[15px] text-[#334155] hover:bg-[#e8edf3] hover:text-[#11395d]"
                        >
                            <Link
                                href={logout()}
                                as="button"
                                onClick={handleLogout}
                                data-test="logout-button"
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="text-[15px] font-medium tracking-[0.002em]">
                                    Logout
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
