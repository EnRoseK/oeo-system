import { IPagination, IProductOutcome } from '@/interfaces';
import { axiosInstance } from '@/libs';
import { CREATE_PRODUCT_OUTCOME, GET_FILTERED_PRODUCT_OUTCOMES, REMOVE_PRODUCT_OUTCOME } from '../endpoints';

export const getFilteredProductOutcomes = async (page: number, cookie?: string) => {
  const searchParams = new URLSearchParams();
  if (page) {
    searchParams.set('page', page.toString());
  }

  return await axiosInstance
    .get<{ data: IProductOutcome[]; pagination: IPagination }>(GET_FILTERED_PRODUCT_OUTCOMES(searchParams.toString()), {
      headers: {
        Cookie: `connect.sid=${cookie}`,
      },
    })
    .then((res) => res.data);
};

export const createProductOutcome = async (data: unknown) => {
  return await axiosInstance.post<{ data: IProductOutcome }>(CREATE_PRODUCT_OUTCOME, data).then((res) => res.data);
};

export const removeProductOutcome = async (id: string) => {
  return await axiosInstance.delete(REMOVE_PRODUCT_OUTCOME(id)).then((res) => res.status);
};
