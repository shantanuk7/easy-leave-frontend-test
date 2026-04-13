import type { Role } from '@/types/auth';
import Dashboard from '@/pages/Dashboard';
import Leave from '@/pages/Leave';
import ManagerDashboard from '@/pages/ManagerDashboard';
import AllEmployeesDetails from '@/pages/AllEmployeesDetails';
import ViewSingleEmployeeLeaveDetail from '@/pages/ViewSingleEmployeeLeaveDetail';
export type AppRoute = {
  path: string;
  element: React.ReactNode;
  roles?: Role[];
};

export const APP_ROUTES: AppRoute[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/leave',
    element: <Leave />,
  },
  {
    path: '/manager-dashboard',
    element: <ManagerDashboard />,
    roles: ['MANAGER'],
  },
  {
    path: '/employees/:id',
    element: <ViewSingleEmployeeLeaveDetail />,
    roles: ['MANAGER'],
  },

  {
    path: '/admin/employees',
    element: <AllEmployeesDetails />,
    roles: ['ADMIN'],
  },
];
