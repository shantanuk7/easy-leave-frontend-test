import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as employeeLeaveBalance from '@/api/employeesLeaveBalance.api';
import SingleEmployeeLeaveDetails from './SingleEmployeeLeaveDetails';

const mockLeaveRecord = [
  {
    leaveId: '1',
    leaveType: 'Annual Leave',
    totalLeavesAvailable: 24,
    leavesTaken: 6,
    leavesRemaining: 18,
  },
  {
    leaveId: '2',
    leaveType: 'Paternity Leave',
    totalLeavesAvailable: 90,
    leavesTaken: 20,
    leavesRemaining: 70,
  },
];

const renderSingleEmployeeLeaveDetails = () => {
  return render(
    <MemoryRouter initialEntries={['/employee/1']}>
      <Routes>
        <Route path="/employee/:id" element={<SingleEmployeeLeaveDetails />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('SingleEmployeeLeaveDetails', () => {
  beforeEach(() => {
    vi.spyOn(employeeLeaveBalance, 'fetchSingleEmployeeLeaveRecord').mockResolvedValue(
      mockLeaveRecord,
    );
    vi.spyOn(employeeLeaveBalance, 'fetchYears').mockResolvedValue(['2025', '2026']);
  });

  test('shows loading state initially', () => {
    renderSingleEmployeeLeaveDetails();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders leave records table with record', async () => {
    renderSingleEmployeeLeaveDetails();

    await waitFor(() => {
      expect(screen.getByRole('cell', { name: 'Annual Leave' })).toBeInTheDocument();
      expect(screen.getByText('24')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('18')).toBeInTheDocument();
    });
  });

  test('shows error message when error is Error instance', async () => {
    vi.spyOn(employeeLeaveBalance, 'fetchSingleEmployeeLeaveRecord').mockRejectedValue(
      new Error('Error fetching leave record'),
    );

    renderSingleEmployeeLeaveDetails();

    await waitFor(() => {
      expect(screen.getByText('Error fetching leave record')).toBeInTheDocument();
    });
  });

  test('shows error message when error is not type of Error instance', async () => {
    vi.spyOn(employeeLeaveBalance, 'fetchSingleEmployeeLeaveRecord').mockRejectedValue(
      'Failed to fetch leave record',
    );

    renderSingleEmployeeLeaveDetails();

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch leave record')).toBeInTheDocument();
    });
  });

  test('sets current year when fetchYears returns empty array', async () => {
    const currentYear = new Date().getFullYear().toString();

    vi.spyOn(employeeLeaveBalance, 'fetchYears').mockResolvedValue([]);

    renderSingleEmployeeLeaveDetails();

    await waitFor(() => {
      expect(employeeLeaveBalance.fetchSingleEmployeeLeaveRecord).toHaveBeenCalledWith(
        '1',
        currentYear,
      );
    });
  });
});
