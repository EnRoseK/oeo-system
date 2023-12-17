import { axiosInstance } from '@/libs';
import { GET_FILTERED_FINANCE_INCOMES } from '../endpoints';
import { IFinanceIncome, IPagination } from '@/interfaces';

export const getFilteredFinanceIncomes = async (page: number) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }

  return await axiosInstance
    .get<{ data: IFinanceIncome[]; pagination: IPagination }>(GET_FILTERED_FINANCE_INCOMES(searchParams.toString()))
    .then((res) => res.data);
};
