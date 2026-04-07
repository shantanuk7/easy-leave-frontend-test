import type { FormikErrors } from 'formik';
import type { LeaveFormValues } from '@/types/leaveForm';
export const validateLeaveForm = (values: LeaveFormValues): FormikErrors<LeaveFormValues> => {
  const errors: FormikErrors<LeaveFormValues> = {};

  if (!values.leaveCategoryId) {
    errors.leaveCategoryId = 'Leave category is required';
  }

  if (!values.dateRange || !values.dateRange.from) {
    errors.dateRange = 'Please enter a date';
  }

  if (!values.description.trim()) {
    errors.description = 'Description is required';
  }

  if (values.description.length > 1000) {
    errors.description = 'Description cannot be over 1000 characters';
  }

  return errors;
};
