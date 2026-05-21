import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-0 py-0">
            <SidebarGroupLabel className="sr-only">
                Navigation
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isCurrentUrl(item.href)}
                            tooltip={{ children: item.title }}
                            className="h-11 rounded-xl px-4 text-[16px] font-normal text-[#364153] hover:bg-[#e8edf3] hover:text-[#11395d] data-[active=true]:bg-[#11395d] data-[active=true]:font-normal data-[active=true]:text-[#FFFFFF] [&>svg]:text-[#364153] data-[active=true]:[&>svg]:text-[#FFFFFF]"
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span className="text-[16px] font-normal tracking-[0.002em]">
                                    {item.title}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
