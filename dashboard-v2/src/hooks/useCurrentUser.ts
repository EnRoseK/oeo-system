import { CurrentUserContext } from '@/providers';
import { useContext } from 'react';

export const useCurrentUser = () => {
  const ctx = useContext(CurrentUserContext);

  if (!ctx) {
    throw new Error('Context must be used inside provider!');
  }

  return ctx;
};
