import type { ApiResponse } from '@/types/response';
import axiosInstance from './axiosInstance';
import type { LeaveScope, LeaveStatus } from '../constants/LeaveStatus';
import type { LeaveApplicationResponse, LeaveResponse } from '../types/leaves';
import type { LeaveApplicationRequest } from '@/types/leaves';

type Props = {
  status?: LeaveStatus;
  scope: LeaveScope;
  empId?: string;
  year?: string;
};

export const fetchLeaves = async ({
  status,
  scope = 'self',
  empId,
  year,
}: Props): Promise<LeaveResponse[]> => {
  const params: Record<string, string> = { scope };
  if (status && status !== 'all') params.status = status;
  if (empId) params.empId = empId;
  if (year) params.year = year;

  const { data } = await axiosInstance.get<ApiResponse<LeaveResponse[]>>('/api/leaves', { params });
  if (!data.success) {
    console.error('Error fetching leaves:', data.message);
    throw new Error(data.message || 'Failed to fetch leaves');
  }
  return data.data;
};

export const applyLeave = async (
  leaveData: LeaveApplicationRequest,
): Promise<LeaveApplicationResponse[]> => {
  const { data } = await axiosInstance.post('/api/leaves', leaveData);
  if (!data.success) {
    console.error('Error applying for leave:', data.message);
    throw new Error(data.message || 'Failed to apply for leave');
  }
  return data.data;
};
