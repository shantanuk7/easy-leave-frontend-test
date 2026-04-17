import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Outlet } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = (): React.JSX.Element => {
  const isMobile = useIsMobile();
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full bg-gray-50">
        {isMobile && (
          <header className="flex items-center h-14 border-b bg-white">
            <SidebarTrigger size="sm" className="justify-self-start ml-2 cursor-pointer" />
          </header>
        )}
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
