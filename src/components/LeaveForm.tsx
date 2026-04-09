import React from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import { Button } from './ui/button';
import type { LeaveFormValues } from '@/types/leaves';
import type { LeaveCategoryResponse } from '@/types/leaveCategory';
import SelectField from './form/SelectField';
import DatePickerField from './form/DatePickerField';
import TimeField from './form/TimeField';
import TextareaField from './form/TextareaField';
import { addHours } from '@/utils/time';
import { validateLeave } from '@/utils/leaveValidation';
import { FULL_DAY_DURATION_HOURS, HALF_DAY_DURATION_HOURS } from '@/constants/leaveDuration';

type LeaveFormProps = {
  initialValues: LeaveFormValues;
  handleSubmit: (
    values: LeaveFormValues,
    formikHelpers: FormikHelpers<LeaveFormValues>,
  ) => void | Promise<void>;
  submitLabel?: string;
  categories?: LeaveCategoryResponse[];
  categoriesLoading?: boolean;
  datePickerMode?: 'range' | 'single';
};

const LeaveForm = ({
  initialValues,
  handleSubmit,
  submitLabel = 'Submit Leave',
  categories = [],
  categoriesLoading,
}: LeaveFormProps): React.JSX.Element => {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateLeave}>
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col gap-4 p-4 w-full">
          <SelectField
            name="leaveCategoryId"
            id="leaveCategoryId"
            label="Leave Category"
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
            loading={categoriesLoading}
            placeholder="Select a category"
          />

          <DatePickerField
            name="dateRange"
            label="Date Range"
            mode="range"
            value={values.dateRange}
          />

          <SelectField
            name="duration"
            id="duration"
            label="Duration"
            options={[
              { value: 'FULL_DAY', label: 'Full Day' },
              { value: 'HALF_DAY', label: 'Half Day' },
            ]}
          />

          <div className="flex justify-between gap-3">
            <TimeField name="startTime" id="startTime" label="Start Time" />

            <TimeField
              name="endTime"
              id="endTime"
              label="End Time"
              disabled
              value={
                values.duration === 'FULL_DAY'
                  ? addHours(values.startTime, FULL_DAY_DURATION_HOURS)
                  : addHours(values.startTime, HALF_DAY_DURATION_HOURS)
              }
            />
          </div>

          <TextareaField
            name="description"
            id="description"
            label="Reason"
            placeholder="Reason for taking leave..."
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-(--technogise-blue) cursor-pointer "
          >
            {submitLabel}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LeaveForm;
