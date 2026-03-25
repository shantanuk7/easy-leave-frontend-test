import { CalendarPlus, LayoutGrid } from 'lucide-react';
import type { NavItem } from '../types/navigation';
export const EMPLOYEE_NAV_ITEMS: NavItem[] = [
    {
      name: "Dashboard",
      icon: LayoutGrid,
      href: "/dashboard"
    },
    {
      name: "Apply Leave",
      icon: CalendarPlus,
      href: "/apply-leave",
    }
]