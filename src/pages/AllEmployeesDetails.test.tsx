import { MemoryRouter } from 'react-router-dom';
import AllEmployeeDetails from './AllEmployeesDetails';
import { render, screen, waitFor } from '@testing-library/react';
import * as userApi from '@/api/employee.api';
import type { UserResponse } from '@/types/Users';
import { vi } from 'vitest';

const mockEmployees: UserResponse[] = [
  { id: '1', name: 'Priyansh Saxena', email: 'priyansh.saxena@technogise.com', role: 'ADMIN' },
  { id: '2', name: 'Raj', email: 'raj@technogise.com', role: 'EMPLOYEE' },
];
const mockNextEmployees: UserResponse[] = [
  { id: '3', name: 'jatin', email: 'jatin@technogise.com', role: 'ADMIN' },
  { id: '4', name: 'rakshit', email: 'rakshit@technogise.com', role: 'EMPLOYEE' },
];

const renderEmployeeDetails = () => {
  return render(
    <MemoryRouter>
      <AllEmployeeDetails />
    </MemoryRouter>,
  );
};

describe('AllEmployeeDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders table columns', async () => {
    renderEmployeeDetails();
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });
  });

  test('renders error message on API failure', async () => {
    vi.spyOn(userApi, 'getEmployees').mockRejectedValue(new Error('Failed to fetch employees'));
    renderEmployeeDetails();
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch employees')).toBeInTheDocument();
    });
  });

  test('renders error message on network error', async () => {
    vi.spyOn(userApi, 'getEmployees').mockRejectedValue('Failed to load employees');
    renderEmployeeDetails();
    await waitFor(() => {
      expect(screen.getByText('Failed to load employees')).toBeInTheDocument();
    });
  });

  test('renders "Load More" button and loads more employees', async () => {
    vi.spyOn(userApi, 'getEmployees')
      .mockResolvedValueOnce({
        content: mockEmployees,
        last: false,
        number: 0,
        totalPages: 2,
      })
      .mockResolvedValueOnce({
        content: mockNextEmployees,
        last: true,
        number: 1,
        totalPages: 2,
      });

    renderEmployeeDetails();

    await waitFor(() => {
      expect(screen.getByText('Load More')).toBeInTheDocument();
    });

    screen.getByText('Load More').click();

    await waitFor(() => {
      expect(screen.getByText('jatin')).toBeInTheDocument();
      expect(screen.getByText('rakshit')).toBeInTheDocument();
    });
  });
});
