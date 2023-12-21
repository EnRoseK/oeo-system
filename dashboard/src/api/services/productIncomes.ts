import { IPagination, IProductIncome } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { CREATE_PRODUCT_INCOME, GET_FILTERED_PRODUCT_INCOMES, REMOVE_PRODUCT_INCOME } from '../endpoints';

export const getFilteredProductIncomes = async (
  page: number,
  search: string,
  product: string,
  startDate: string,
  endDate: string,
  cookie?: string,
) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }
  if (search) {
    searchParams.set('q', search);
  }
  if (product) {
    searchParams.set('product', product);
  }
  if (startDate && endDate) {
    searchParams.set('startDate', startDate);
    searchParams.set('endDate', endDate);
  }

  return await axiosInstance
    .get<{ data: IProductIncome[]; pagination: IPagination }>(GET_FILTERED_PRODUCT_INCOMES(searchParams.toString()), {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};

export const createProductIncome = async (data: unknown) => {
  return await axiosInstance.post<{ data: IProductIncome }>(CREATE_PRODUCT_INCOME, data).then((res) => res.data);
};

export const removeProductIncome = async (id: string) => {
  return await axiosInstance.delete(REMOVE_PRODUCT_INCOME(id)).then((res) => res.status);
};
