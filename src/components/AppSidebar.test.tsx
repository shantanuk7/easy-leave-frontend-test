import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { AppSidebar } from './AppSidebar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

// Mock useAuthUser hook
vi.mock('@/hooks/useAuthUser', () => ({
  default: vi.fn(),
}));

const setOpenMobile = vi.fn();

vi.mock('@/hooks/use-sidebar', () => ({
  useSidebar: vi.fn(() => ({
    state: 'expanded' as const,
    open: true,
    setOpen: vi.fn(),
    openMobile: false,
    setOpenMobile,
    isMobile: false,
    toggleSidebar: vi.fn(),
  })),
}));

import useAuthUser from '@/hooks/useAuthUser';
import type { Role } from '@/types/auth';
import { TooltipProvider } from './ui/tooltip';

const renderAppSidebar = (role?: string) => {
  vi.mocked(useAuthUser).mockReturnValue({
    user: role ? { id: '1', name: 'Test User', email: 'test@test.com', role: role as Role } : null,
    setUser: vi.fn(),
    loading: false,
    error: null,
    fetchCurrentUser: vi.fn().mockResolvedValue(undefined),
  });

  render(
    <AuthProvider>
      <TooltipProvider>
        <MemoryRouter>
          <AppSidebar />
        </MemoryRouter>
      </TooltipProvider>
    </AuthProvider>,
  );
};

describe('AppSidebar Component', () => {
  test('renders employee nav items for a non-manager user', () => {
    renderAppSidebar();

    expect(screen.getByText('EasyLeave')).toBeInTheDocument();
    expect(screen.getByText('Employee')).toBeInTheDocument();
    expect(screen.queryByText('Manager')).not.toBeInTheDocument();
  });

  test('renders manager nav items when user role is MANAGER', () => {
    renderAppSidebar('MANAGER');

    expect(screen.getByText('Manager')).toBeInTheDocument();
  });

  test('renders admin nav items when user role is ADMIN', () => {
    renderAppSidebar('ADMIN');

    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  test('sets setOpenMobile(false) when a sidebar nav item is clicked', () => {
    renderAppSidebar();

    fireEvent.click(screen.getAllByRole('link')[0]);

    expect(setOpenMobile).toHaveBeenCalledWith(false);
  });
});
