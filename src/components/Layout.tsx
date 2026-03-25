import { Outlet } from 'react-router'
import AppSidebar  from './AppSidebar'
import { SidebarTrigger } from './ui/sidebar'

const Layout = () => {
  return (
    <>
        <AppSidebar />
        <div>
          <SidebarTrigger />
          <Outlet />
        </div>
    </>
  )
}

export default Layout
