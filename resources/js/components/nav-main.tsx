'use client'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { type NavItem } from '@/types/navigation'
import { Link, usePage } from '@inertiajs/react'

export function NavMain({ items }: { items: NavItem[] }) {
  const { url } = usePage()
  

  const unreadNotificationsCount = (usePage().props.notifications?.unreadCount as number) || 0

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const itemHref = item.href || item?.url || '';
          
          const isActive = url === itemHref || (itemHref !== '/dashboard' && url.startsWith(itemHref))
          const hasBadge = item.title === 'Messages' && unreadNotificationsCount > 0

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className="h-11 text-base" 
            >
                <Link href={itemHref}>
                    <item.icon />
                    <span>{item.title}</span>
                </Link>
            </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}