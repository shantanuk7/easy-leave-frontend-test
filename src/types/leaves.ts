export type DurationType = 'FULL_DAY' | 'HALF_DAY';

export type LeaveResponse = {
  id: string;
  date: string;
  employeeName: string;
  type: string;
  duration: DurationType;
  startTime: string;
  applyOn: string;
  reason: string;
};

export type LeaveFormValues = {
  leaveCategoryId: string;
  dateRange: { from: Date | undefined; to: Date | undefined};
  duration: DurationType;
  startTime: string;
  description: string;
};

export type LeaveApplicationRequest = {
  leaveCategoryId: string;
  dates: string[];
  duration: DurationType;
  startTime: string;
  description: string | undefined;
};

export type LeaveApplicationResponse = {
  id: string;
  date: string;
  leaveCategoryName: string;
  duration: DurationType;
  startTime: string | null;
  description: string | null;
};
