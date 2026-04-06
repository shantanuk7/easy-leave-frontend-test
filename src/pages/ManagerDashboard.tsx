import LeaveCardItem from '@/components/LeaveCardItem';
import PageHeader from '@/components/PageHeader';
import useLeaves from '@/hooks/useLeaves';
import React from 'react';

function ManagerDashboard(): React.JSX.Element {
  const { leaves: upcomingLeaves } = useLeaves("upcoming", "organization");
  const { leaves: ongoingLeaves } = useLeaves("ongoing", "organization");

  return (
    <div className="w-full min-h-full p-6 bg-gray-50">
      <PageHeader
        pageTitle="Manager Dashboard"
        pageSubtitle="Team leave overview at a glance"
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full overflow-y-scroll md:w-1/2 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h2 className="font-bold text-lg mb-4 text-gray-800">
            Currently on Leave
          </h2>
          <div className="flex flex-col gap-3">
            {
              ongoingLeaves.length === 0 ? (
                <p className="text-sm text-gray-500">No one is currently on leave</p>
              ) : (
                ongoingLeaves.map((leave) => (
                  <LeaveCardItem
                    key={leave.id}
                    title={leave.employeeName}
                    description={leave.duration
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' ')
                    }
                    badgeName={leave.type}
                    style="bg-warning/5 border border-warning/10"
                  />
                ))
              )
            }
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
          <h2 className="font-bold text-lg mb-4 text-gray-800">
            Upcoming Leaves
          </h2>
          <div className="flex flex-col gap-3">
            {
              upcomingLeaves.length === 0 ? (
                <p className="text-sm text-gray-500">No upcoming leaves</p>
              ) : (
                upcomingLeaves.map((leave) => (
                  <LeaveCardItem
                    key={leave.id}
                    title={leave.employeeName}
                    description={leave.date}
                    badgeName={leave.type}
                    style="bg-muted"
                  />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManagerDashboard;