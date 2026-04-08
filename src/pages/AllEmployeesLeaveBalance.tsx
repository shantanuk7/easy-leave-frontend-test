import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import PageHeader from '../components/PageHeader';
import Loading from '@/components/Loading';
import useEmployees from '@/hooks/useEmployees';
import type { EmployeeLeaveRecord } from '../types/employees';
import FilterDropdown from '@/components/FilterDropdown';
import { fetchYears } from '@/api/employeesLeaveBalance.api';

function Employees(): React.JSX.Element {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const { employees, loading, error, hasMore, loadMore } = useEmployees(selectedYear);

  useEffect(() => {
    async function loadYears() {
      const data = await fetchYears();
      setYears(data);
      setSelectedYear(data[0] || new Date().getFullYear().toString());
    }
    loadYears();
  }, []);

  const columns = [
    {
      header: 'Employee',
      render: (emp: EmployeeLeaveRecord) => emp.employeeName,
    },
    {
      header: 'Total Leaves Available',
      render: (emp: EmployeeLeaveRecord) => emp.totalLeavesAvailable,
    },
    {
      header: 'Leaves Taken',
      render: (emp: EmployeeLeaveRecord) => emp.leavesTaken,
    },
    {
      header: 'Leaves Remaining',
      render: (emp: EmployeeLeaveRecord) => emp.leavesRemaining,
    },
  ];

  return (
    <div className="w-full flex flex-col h-screen p-3">
      <PageHeader pageTitle="All Employees" pageSubtitle="View employees leave records" />

      <div className="flex flex-1 overflow-y-scroll flex-col w-full rounded-2xl shadow-xs border border-neutral-200">
        <div className="flex bg-sidebar items-center rounded-t-2xl justify-between p-3">
          <div className="flex justify-end w-full">
            <FilterDropdown
              options={years}
              value={selectedYear}
              onChange={(val) => setSelectedYear(val)}
            />
          </div>
        </div>

        {error && <p className="p-3 text-red-700">{error}</p>}

        <Table
          data={employees}
          columns={columns}
          message="No employee found"
          getRowKey={(employee: EmployeeLeaveRecord) => employee.employeeId}
        />

        {loading && <Loading />}

        {!loading && hasMore && (
          <div className="flex justify-center p-4">
            <button
              onClick={loadMore}
              className="px-4 py-2 text-sm bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Employees;
