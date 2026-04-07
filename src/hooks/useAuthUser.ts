import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import type { AuthContextType } from '@/types/auth';

const useAuthUser = (): AuthContextType => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuthUser must be used within an AuthProvider');
  }

  return authContext;
};

export default useAuthUser;
