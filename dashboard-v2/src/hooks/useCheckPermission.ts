import { useCurrentUser } from '@/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useCheckPermission = (
  key:
    | 'category'
    | 'expense'
    | 'incomeReport'
    | 'product'
    | 'productExpense'
    | 'productIncome'
    | 'productReport'
    | 'user',
) => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUser && !currentUser.permission[key]) {
      router.replace('/');
    }
  }, [currentUser, router, key]);
};
