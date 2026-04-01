import React from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import { toast } from 'react-hot-toast';
import { Button } from './ui/button';
import { applyLeave } from '@/api/leave.api';
import type { LeaveApplication } from '@/types/leave.type';
import type { DateRange } from 'react-day-picker';
import { isAxiosError } from 'axios';

type LeaveFormValues = {
  dateRange: DateRange | undefined;
};

const initialValues: LeaveFormValues = {
  dateRange: undefined,
};

const LeaveForm = (): React.JSX.Element => {
  const handleSubmit = async (
    _values: LeaveFormValues,
    { resetForm }: FormikHelpers<LeaveFormValues>,
  ): Promise<void> => {
    const mockDatesRange = ['2024-07-01', '2024-07-02'];

    const leaveData: LeaveApplication = {
      leaveCategoryId: import.meta.env.VITE_ANNUAL_LEAVE_CATEGORY_ID,
      dates: mockDatesRange,
      duration: 'FULL_DAY',
      startTime: '10:00',
      description: 'Leave',
    };

    try {
      await applyLeave(leaveData);
      toast.success('Leave submitted successfully!');
      resetForm();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error('Unexpected Error', error);
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 p-4 w-full">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-(--technogise-blue) cursor-pointer py-5"
          >
            Submit Leave
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LeaveForm;
