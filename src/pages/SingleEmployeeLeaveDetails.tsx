import { fetchSingleEmployeeLeaveRecord } from '@/api/employeesLeaveBalance.api';
import Loading from '@/components/Loading';
import Table from '@/components/Table';
import useFetchYears from '@/hooks/useFetchYears';
import type { SingleEmployeeLeaveRecord } from '@/types/employeeLeaveBalance';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleEmployeeLeaveDetails(): React.JSX.Element {
  const { id } = useParams();
  const [leavesRecord, setLeavesRecord] = useState<SingleEmployeeLeaveRecord[] | null>(null);
  const [leavesRecordloading, setLeavesRecordLoading] = useState(false);
  const [leavesRecordError, setLeavesRecordError] = useState<string | null>(null);

  const { selectedYear } = useFetchYears();

  useEffect(() => {
    const fetchLeavesRecord = async () => {
      setLeavesRecordLoading(true);
      setLeavesRecordError(null);
      try {
        const data = await fetchSingleEmployeeLeaveRecord(id, selectedYear);
        setLeavesRecord(data);
      } catch (error) {
        setLeavesRecordError(
          error instanceof Error ? error.message : 'Failed to fetch leave record',
        );
      } finally {
        setLeavesRecordLoading(false);
      }
    };

    fetchLeavesRecord();
  }, [id, selectedYear]);

  const columns = [
    {
      header: 'Leave Type',
      render: (leavesRecord: SingleEmployeeLeaveRecord) => leavesRecord.leaveType,
    },
    {
      header: 'Leave Available',
      render: (leavesRecord: SingleEmployeeLeaveRecord) => leavesRecord.totalLeavesAvailable,
    },
    {
      header: 'Leaves Taken',
      render: (leavesRecord: SingleEmployeeLeaveRecord) => leavesRecord.leavesTaken,
    },
    {
      header: 'Leave Remaining',
      render: (leavesRecord: SingleEmployeeLeaveRecord) => leavesRecord.leavesRemaining,
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <div className="flex flex-col min-h-0 w-full mb-5 md:mt-2 rounded-2xl shadow-xs border border-neutral-200">
        <div className="bg-sidebar/98 py-2 px-1 rounded-t-2xl ">
          <h1 className="text-xl md:text-2xl text-sidebar-foreground font-bold mb-4 px-4 py-2">
            Leaves Record
          </h1>
        </div>
        {leavesRecordloading && <Loading />}
        {leavesRecordError && <p className="p-3 text-red-700">{leavesRecordError}</p>}
        {!leavesRecordloading && !leavesRecordError && leavesRecord && (
          <Table
            data={leavesRecord}
            columns={columns}
            message="No upcoming leave records found."
            getRowKey={(leavesRecord: SingleEmployeeLeaveRecord) => leavesRecord.leaveId}
          />
        )}
      </div>
    </div>
  );
}

export default SingleEmployeeLeaveDetails;
