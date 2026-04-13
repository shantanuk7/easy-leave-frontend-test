import type { ApiResponse } from '@/types/response';
import axiosInstance from './axiosInstance';

export const fetchYears = async (): Promise<string[]> => {
  const { data } = await axiosInstance.get<ApiResponse<string[]>>('/api/annual-leaves/years');
  if (!data.success) {
    console.error('Error fetching years:', data.message);
    throw new Error(data.message || 'Failed to fetch years');
  }
  return data.data;
};
