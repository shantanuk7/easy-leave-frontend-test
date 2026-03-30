import React from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import { Button } from './ui/button';
import axios from 'axios';

type ApplyLeaveFormValues = {
  dates: string[];
};

const initialValues: ApplyLeaveFormValues = {
  dates: [],
};

const ApplyLeaveForm = (): React.JSX.Element => {
  /*

    API REQUEST FORMAT:

    {
      "leaveCategoryId": "4a53c482-2998-436b-b663-2d6671667c0a",
      "dates": ["2026-04-03","2026-04-09"],
      "duration": "FULL_DAY",
      "startTime": "22:59",
      "description": "Sick leave"
    }

  */

  const mockUserId = 'cc4685d3-2605-4473-82c0-964373c18f7c';

  const mockData = {
    leaveCategoryId: '5c1b1de0-6363-4dd3-8507-ca974c220c32',
    dates: ['2026-04-03', '2026-04-09'],
    duration: 'FULL_DAY',
    startTime: '22:59',
    description: 'Sick leave',
  };

  const headers = {
    user_id: mockUserId,
  };

  const onSubmit = async (
    _values: ApplyLeaveFormValues,
    { resetForm }: FormikHelpers<ApplyLeaveFormValues>,
  ) => {
    try {
      const response = await axios.post('http://localhost:8080/api/leaves', mockData, { headers });
      alert(response.data);
      resetForm();
    } catch (error) {
      console.error('Error submitting leave application:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Button
            type="submit"
            className="w-full bg-(--technogise-blue) cursor-pointer py-5"
            disabled={isSubmitting}
          >
            Submit Leave
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplyLeaveForm;
