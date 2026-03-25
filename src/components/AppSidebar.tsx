import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CalendarDays } from "lucide-react"
import { EMPLOYEE_NAV_ITEMS } from "@/constants/navigation"
import type { NavItem } from "@/types/navigation"
import { NavLink } from "react-router-dom"

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 items-center p-3 border-b border-b-gray-700">
          <div className="rounded-lg bg-(--technogise-blue) p-1">
            <CalendarDays color="white" className="p-1"/>
          </div>
          <h1 className="text-lg text-white font-bold">EasyLeave</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel className="text-gray-500 uppercase text-[10px] tracking-widest">
            Employee
          </SidebarGroupLabel>

          {EMPLOYEE_NAV_ITEMS.map((item: NavItem) => (
            <SidebarMenuItem>
              <NavLink to={item.href} end>
                {({ isActive }) => (
                  <SidebarMenuButton
                    data-active={isActive}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}

        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}