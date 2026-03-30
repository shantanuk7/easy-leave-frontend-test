import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"

const Layout = () : React.JSX.Element => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <main>
            <SidebarTrigger />
            <Outlet />
        </main>
    </SidebarProvider>
    )
}

export default Layout;