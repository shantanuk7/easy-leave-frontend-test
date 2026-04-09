import { fetchLeaveById } from '@/api/leave.api';
import Loading from '@/components/Loading';
import PageHeader from '@/components/PageHeader';
import type { LeaveResponse } from '@/types/leaves';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LeaveDetails = (): React.JSX.Element => {
  const [leave, setLeave] = useState<LeaveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  const fetchLeaveDetails = async (id: string | undefined) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchLeaveById(id);
      setLeave(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveDetails(id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !leave) {
    return (
      <div className="text-center py-6 text-xl font-bold tracking-tight text-foreground">
        Leave not found
      </div>
    );
  }

  return (
    <div className="w-full p-3">
      <PageHeader pageTitle="Leave Details" pageSubtitle="View and manage your leave details" />
    </div>
  );
};

export default LeaveDetails;
