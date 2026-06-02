import { Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    CalendarDays,
    ClipboardList,
    LayoutGrid,
    LogOut,
    MessageCircle,
    Settings,
    ShieldCheck,
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
import {
    adminUsers,
    captains,
    charterers,
    complianceLog,
    dashboard,
    logout,
    messages,
    myBooking,
    myProfile,
    myYachts,
    notifications,
    platformSettings,
    requests,
    vesselInventory,
    yachtsMatch,
} from '@/routes';
import { request as chartererRequest } from '@/routes/charterer';
import type { NavItem } from '@/types';

function resolveNavItems(role: string | null | undefined): NavItem[] {
    console.log(chartererRequest().url);
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
    ];

    if (role === 'admin') {
        return [
            sharedItems[0],
            {
                title: 'Users',
                href: adminUsers(),
                icon: Users,
            },
            {
                title: 'Vessel Inventory',
                href: vesselInventory(),
                icon: Ship,
            },
            {
                title: 'Compliance Log',
                href: complianceLog(),
                icon: ShieldCheck,
            },
            {
                title: 'Platform Settings',
                href: platformSettings(),
                icon: Settings,
            },
        ];
    }

    if (role === 'owner') {
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
                title: 'Captain Requests',
                href: '/captain-requests',
                icon: ClipboardList,
            },
            {
                title: 'Charterers',
                href: charterers(),
                icon: Users,
            },
            sharedItems[1],
        ];
    }

    if (role === 'captain') {
        return [
            sharedItems[0],
            {
                title: 'Yachts Match',
                href: yachtsMatch(),
                icon: Ship,
            },
            {
                title: 'Charterer Requests',
                href: requests(),
                icon: ClipboardList,
            },
            {
                title: 'Owner Invitations',
                href: '/invitations',
                icon: Bell,
            },
            sharedItems[1],
        ];
    }

    if (role === 'deckhand') {
        return [
            sharedItems[0],
            {
                title: 'Yachts Match',
                href: yachtsMatch(),
                icon: Ship,
            },
            {
                title: 'My Profile',
                href: myProfile(),
                icon: User,
            },
            {
                title: 'Requests',
                href: requests(),
                icon: ClipboardList,
            },
            sharedItems[1],
        ];
    }

    if (role === 'charterer') {
        return [
            sharedItems[0],
            {
                title: 'My Booking',
                href: myBooking(),
                icon: CalendarDays,
            },
            {
                title: 'Request',
                href: chartererRequest().url,
                icon: ClipboardList,
            },
            {
                title: 'Notifications',
                href: notifications(),
                icon: Bell,
            },
            sharedItems[1],
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
                        className="h-auto w-55 object-contain"
                    />
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-4 pt-4">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="px-4 pb-4">
                <SidebarSeparator className="mt-auto mb-3" />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="h-11 cursor-pointer! rounded-xl px-4 text-[15px] text-[#334155] hover:bg-[#e8edf3] hover:text-[#35ADD5]"
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
