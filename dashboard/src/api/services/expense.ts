import { axiosInstance } from '@/libs';
import { GET_FILTERED_EXPENSES } from '../endpoints';
import { IExpense, IPagination } from '@/interfaces';

export const getFilteredExpenses = async ({
  page,
  search,
  startDate,
  endDate,
  cookie,
}: {
  page: number;
  search: string;
  startDate: string;
  endDate: string;
  cookie?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }
  if (search) {
    searchParams.set('q', search);
  }
  if (startDate && endDate) {
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);
  }

  return await axiosInstance
    .get<{ data: IExpense[]; pagination: IPagination }>(GET_FILTERED_EXPENSES(searchParams.toString()), {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};
