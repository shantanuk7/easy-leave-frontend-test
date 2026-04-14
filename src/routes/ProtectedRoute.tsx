import Loading from '@/components/Loading';
import useAuthUser from '@/hooks/useAuthUser';
import type { Role } from '@/types/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Role[];
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps): React.JSX.Element {
  const { user, loading } = useAuthUser();

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
