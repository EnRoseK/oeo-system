import { AuthContext } from '@/providers';
import { useContext } from 'react';

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('Consumer must be used inside provider!');
  }

  const { currentUser, fetchCurrentUser, clearUser, updateUser } = ctx;

  return { currentUser, fetchCurrentUser, clearUser, updateUser };
};
