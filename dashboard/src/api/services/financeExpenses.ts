import { axiosInstance } from '@/libs';
import { CREATE_FINANCE_EXPENSE, GET_FILTERED_FINANCE_EXPENSES, REMOVE_FINANCE_EXPENSE } from '../endpoints';
import { IFinanceExpense, IPagination } from '@/interfaces';

export const getFilteredFinanceExpenses = async (
  page?: number,
  type?: string,
  startDate?: string,
  endDate?: string,
  cookie?: string,
) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }
  if (type) {
    searchParams.set('type', type);
  }
  if (startDate && endDate) {
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);
  }

  return await axiosInstance
    .get<{ data: IFinanceExpense[]; pagination: IPagination }>(GET_FILTERED_FINANCE_EXPENSES(searchParams.toString()), {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};

export const createFinanceExpense = async (data: unknown) => {
  return await axiosInstance.post<{ data: IFinanceExpense }>(CREATE_FINANCE_EXPENSE, data).then((res) => res.data);
};

export const removeFinanceExpense = async (id: string) => {
  return await axiosInstance.delete(REMOVE_FINANCE_EXPENSE(id)).then((res) => res.status);
};
