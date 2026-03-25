import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { CalendarDays } from "lucide-react"

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
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}