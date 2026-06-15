'use client'

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { type NavItem } from '@/types/navigation'
import { Link, usePage } from '@inertiajs/react'

export function NavMain({ items }: { items: NavItem[] }) {
  const { url } = usePage()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const itemHref = item.href || item?.url || '';
          const isActive = url === itemHref || (itemHref !== '/dashboard' && url.startsWith(itemHref));

           return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                className="h-11 text-base data-[active=true]:bg-gray-200"
            >
                <Link href={itemHref} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.title}</span>
                    </div>
                    
                    {/* Renders the badge if the count is > 0 */}
                    {!!item.badge && item.badge > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                            {item.badge > 9 ? '9+' : item.badge}
                        </span>
                    )}
                </Link>
            </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}