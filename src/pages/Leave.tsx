import React, { useState } from 'react';
import Table from '../components/Table';
import PageHeader from '../components/PageHeader';
import FilterDropdown from '../components/FilterDropdown';
import { EllipsisVertical } from 'lucide-react';
import type { LeaveResponse } from '../types/leaves';
import { STATUS_OPTIONS, type LeaveStatus } from '../constants/LeaveStatus';
import Loading from '@/components/Loading';
import useLeaves from '@/hooks/useLeaves';

function Leave(): React.JSX.Element {
  const [status, setStatus] = useState<LeaveStatus>("all");

  const { leaves, loading, error } = useLeaves(status, "self");

  const columns = [
    { header: 'Type', render: (leave: LeaveResponse) => leave.type },
    { header: 'Date', render: (leave: LeaveResponse) => new Date(leave.date).toLocaleDateString() },
    { header: 'Duration', render: (leave: LeaveResponse) => leave.duration.replace('_', ' ') },
    {
      header: 'Status',
      render: (leave: LeaveResponse) => {
        const date = new Date(leave.date);
        const today = new Date();
        if (date > today) return <span className="text-green-500">Upcoming</span>;
        if (date.toDateString() === today.toDateString())
          return <span className="text-blue-500">Ongoing</span>;
        return <span className="text-red-500">Completed</span>;
      },
    },
    { header: 'Actions', render: () => <EllipsisVertical size={20} strokeWidth={3} /> },
  ];

  return (
    <div className="w-full h-screen p-3">
      <PageHeader pageTitle="Leaves" pageSubtitle="View and manage your leaves" />

      <div className="flex flex-col w-full bg-white rounded-2xl shadow-xs border border-neutral-200">
        <div className="w-full">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-2xl font-bold mb-4">My Leaves</h1>
            <FilterDropdown
              options={STATUS_OPTIONS}
              value={status}
              onChange={(val) => setStatus(val as LeaveStatus)}
            />
          </div>
        </div>

        {loading && <Loading />}
        {error && <p className="p-3 text-red-700">{error}</p>}
        {!loading && !error && (
          <Table data={leaves} columns={columns} message="No leave records found." />
        )}
      </div>
    </div>
  );
}

export default Leave;
