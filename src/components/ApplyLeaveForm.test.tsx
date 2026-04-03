import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import ApplyLeaveForm from './ApplyLeaveForm';
import * as leaveCategoriesApi from '@/api/leaveCategories.api';
import userEvent from '@testing-library/user-event';

const mockCategories = [
  { id: '1', name: 'Annual Leave' },
  { id: '2', name: 'Bereavement Leave' },
];

describe('ApplyLeaveForm', () => {
  const refreshLeaves = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(leaveCategoriesApi, 'fetchLeaveCategories').mockResolvedValue(mockCategories);
  });

  test('renders all form fields', async () => {
    render(<ApplyLeaveForm refreshLeaves={refreshLeaves} />);

    expect(await screen.findByLabelText('Leave Category')).toBeInTheDocument();

    expect(screen.getByLabelText('Date Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Time')).toBeInTheDocument();
    expect(screen.getByLabelText('End Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Leave' })).toBeInTheDocument();
  });

  test('display required field validation errors', async () => {
    render(<ApplyLeaveForm refreshLeaves={refreshLeaves} />);

    await screen.findByLabelText('Leave Category');

    await userEvent.click(screen.getByRole('button', { name: 'Submit Leave' }));

    expect(await screen.findByText('Leave category is required')).toBeInTheDocument();
    expect(screen.getByText('Please enter a date')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
  });
});
